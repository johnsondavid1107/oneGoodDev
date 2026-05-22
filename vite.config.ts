import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import type { Plugin, Connect } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'

const projectsJsonPath = path.resolve(__dirname, 'src/data/projects.json')
const uploadsDir = path.resolve(__dirname, 'public/img/projects')

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk: Buffer) => { body += chunk.toString() })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api',
    configureServer(server) {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }

      const json = (res: ServerResponse, data: unknown, status = 200) => {
        res.statusCode = status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      }

      const handler: Connect.NextHandleFunction = async (req, res, next) => {
        const url = req.url ?? ''

        // GET /api/projects
        if (url === '/api/projects' && req.method === 'GET') {
          const data = fs.readFileSync(projectsJsonPath, 'utf-8')
          res.setHeader('Content-Type', 'application/json')
          res.end(data)
          return
        }

        // PUT /api/projects — save full array
        if (url === '/api/projects' && req.method === 'PUT') {
          const body = await readBody(req)
          try {
            JSON.parse(body) // validate JSON before writing
            fs.writeFileSync(projectsJsonPath, JSON.stringify(JSON.parse(body), null, 2))
            json(res, { ok: true })
          } catch {
            json(res, { error: 'Invalid JSON' }, 400)
          }
          return
        }

        // POST /api/upload — base64 image → public/img/projects/
        if (url === '/api/upload' && req.method === 'POST') {
          const body = await readBody(req)
          try {
            const { filename, data } = JSON.parse(body) as { filename: string; data: string }
            const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_')
            const base64Data = data.replace(/^data:image\/\w+;base64,/, '')
            const buffer = Buffer.from(base64Data, 'base64')
            fs.writeFileSync(path.join(uploadsDir, safeFilename), buffer)
            json(res, { path: `/img/projects/${safeFilename}` })
          } catch {
            json(res, { error: 'Upload failed' }, 500)
          }
          return
        }

        // DELETE /api/upload/:filename
        if (url.startsWith('/api/upload/') && req.method === 'DELETE') {
          const filename = path.basename(url.replace('/api/upload/', ''))
          const filepath = path.join(uploadsDir, filename)
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
          }
          json(res, { ok: true })
          return
        }

        next()
      }

      server.middlewares.use(handler)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    adminApiPlugin(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html'),
      },
    },
  },
})
