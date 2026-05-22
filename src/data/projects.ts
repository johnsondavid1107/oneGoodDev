import projectsData from './projects.json'

export interface Project {
  id: string
  name: string
  desc: string
  tags: string[]
  liveUrl: string
  thumbnail: string
}

export const projects: Project[] = projectsData as Project[]
