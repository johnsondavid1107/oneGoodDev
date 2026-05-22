import { useEffect, useState, useCallback } from 'react'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'
import type { Project } from '@/data/projects'
import ProjectList from './components/ProjectList'
import ProjectForm from './components/ProjectForm'

type Toast = { type: 'success' | 'error'; message: string }
type Panel = 'edit' | 'new' | null

export default function AdminApp() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [toast, setToast] = useState<Toast | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  // Load projects from API
  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then((data: Project[]) => { setProjects(data); setLoading(false) })
      .catch(() => { showToast('error', 'Could not load projects. Is the dev server running?'); setLoading(false) })
  }, [])

  const showToast = (type: Toast['type'], message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  const save = useCallback(async (updated: Project[]) => {
    setSaving(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (res.ok) {
        setProjects(updated)
        showToast('success', 'Saved — push to GitHub to deploy.')
      } else {
        showToast('error', 'Save failed. Try again.')
      }
    } catch {
      showToast('error', 'Save failed. Is the dev server running?')
    } finally {
      setSaving(false)
    }
  }, [])

  const handleSave = (project: Project) => {
    const exists = projects.some(p => p.id === project.id)
    const updated = exists
      ? projects.map(p => p.id === project.id ? project : p)
      : [...projects, project]
    save(updated)
    setPanel(null)
    setSelectedId(null)
  }

  const handleDelete = (id: string) => setDeleteTarget(id)

  const confirmDelete = () => {
    if (!deleteTarget) return
    save(projects.filter(p => p.id !== deleteTarget))
    if (selectedId === deleteTarget) { setSelectedId(null); setPanel(null) }
    setDeleteTarget(null)
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setPanel('edit')
  }

  const handleAdd = () => {
    setSelectedId(null)
    setPanel('new')
  }

  const handleCancel = () => {
    setPanel(null)
    setSelectedId(null)
  }

  const selectedProject = projects.find(p => p.id === selectedId) ?? null

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-foreground/[0.06] bg-background/90 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg font-600 text-foreground">One Good Dev</span>
          <span className="text-foreground/20 text-sm">·</span>
          <span className="text-xs text-muted uppercase tracking-[0.15em] font-medium">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          {saving && (
            <div className="flex items-center gap-2 text-xs text-muted">
              <Loader size={12} className="animate-spin" />
              Saving…
            </div>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-primary transition-colors duration-200 tracking-wide"
          >
            View site ↗
          </a>
        </div>
      </header>

      {/* Main layout */}
      <div className="pt-14 flex h-screen">

        {/* Left — project list */}
        <div className={`flex flex-col border-r border-foreground/[0.06] bg-surface p-6 overflow-hidden transition-all duration-300 ${panel ? 'w-[45%]' : 'w-full max-w-3xl mx-auto'}`}>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader size={20} className="animate-spin text-muted" />
            </div>
          ) : (
            <ProjectList
              projects={projects}
              selected={selectedId}
              onSelect={handleSelect}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onReorder={updated => save(updated)}
            />
          )}
        </div>

        {/* Right — edit panel */}
        {panel && (
          <div className="flex-1 p-6 overflow-hidden flex flex-col bg-background">
            <ProjectForm
              project={panel === 'edit' ? selectedProject : null}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-surface border border-foreground/[0.08] rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[6px_6px_0px_0px_rgba(200,149,108,0.1)]">
            <h3 className="font-serif text-xl font-500 mb-3 text-foreground">Delete this project?</h3>
            <p className="text-muted text-sm font-light mb-6 leading-relaxed">
              This will remove it from the site when you push to GitHub. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-500/90 text-white rounded-lg text-sm font-medium hover:bg-red-500 transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 border border-foreground/[0.08] text-muted rounded-lg text-sm font-medium hover:border-foreground/20 hover:text-foreground transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium shadow-lg transition-all duration-300
          ${toast.type === 'success'
            ? 'bg-surface border-primary/20 text-foreground'
            : 'bg-surface border-red-500/20 text-foreground'
          }`}
        >
          {toast.type === 'success'
            ? <CheckCircle size={16} className="text-primary shrink-0" />
            : <AlertCircle size={16} className="text-red-400 shrink-0" />
          }
          {toast.message}
        </div>
      )}
    </div>
  )
}
