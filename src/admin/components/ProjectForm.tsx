import { useState } from 'react'
import { X, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'
import TagInput from './TagInput'
import ImageUpload from './ImageUpload'

interface Props {
  project: Project | null  // null = new project
  onSave: (project: Project) => void
  onCancel: () => void
}

const empty: Omit<Project, 'id'> = {
  name: '',
  desc: '',
  tags: [],
  liveUrl: '',
  thumbnail: '',
}

export default function ProjectForm({ project, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Project, 'id'>>(
    project ? { name: project.name, desc: project.desc, tags: project.tags, liveUrl: project.liveUrl, thumbnail: project.thumbnail }
             : { ...empty }
  )

  const set = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onSave({
      id: project?.id ?? String(Date.now()),
      ...form,
      name: form.name.trim(),
      desc: form.desc.trim(),
      liveUrl: form.liveUrl.trim(),
    })
  }

  const isNew = !project

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-foreground/[0.06]">
        <div>
          <p className="text-xs text-primary font-medium tracking-[0.15em] uppercase mb-1">
            {isNew ? 'New Project' : 'Edit Project'}
          </p>
          <h2 className="font-serif text-2xl font-500 tracking-tight text-foreground">
            {isNew ? 'Add a project' : form.name || 'Untitled'}
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-lg border border-foreground/[0.08] text-muted hover:text-foreground hover:border-foreground/20 transition-all duration-200 cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">

        {/* Thumbnail */}
        <div>
          <label className="block text-xs text-muted uppercase tracking-[0.15em] font-medium mb-3">Thumbnail</label>
          <ImageUpload value={form.thumbnail} onChange={v => set('thumbnail', v)} />
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs text-muted uppercase tracking-[0.15em] font-medium mb-2">Project Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="e.g. Clinic Scheduling App"
            className="w-full bg-surface border border-foreground/[0.06] rounded-xl px-4 py-3 text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary/30 transition-colors duration-200 text-sm font-light"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs text-muted uppercase tracking-[0.15em] font-medium mb-2">Description</label>
          <textarea
            value={form.desc}
            onChange={e => set('desc', e.target.value)}
            rows={4}
            placeholder="What problem did this solve? What was the result?"
            className="w-full bg-surface border border-foreground/[0.06] rounded-xl px-4 py-3 text-foreground placeholder:text-muted/40 resize-none focus:outline-none focus:border-primary/30 transition-colors duration-200 text-sm font-light"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs text-muted uppercase tracking-[0.15em] font-medium mb-2">Tags</label>
          <TagInput tags={form.tags} onChange={v => set('tags', v)} />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-xs text-muted uppercase tracking-[0.15em] font-medium mb-2">Live URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={form.liveUrl}
              onChange={e => set('liveUrl', e.target.value)}
              placeholder="https://"
              className="flex-1 bg-surface border border-foreground/[0.06] rounded-xl px-4 py-3 text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary/30 transition-colors duration-200 text-sm font-light"
            />
            {form.liveUrl && (
              <a
                href={form.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 bg-surface border border-foreground/[0.06] rounded-xl text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="pt-6 mt-6 border-t border-foreground/[0.06] flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!form.name.trim()}
          className="flex-1 py-3 bg-primary text-background rounded-lg font-medium text-sm tracking-wide transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(200,149,108,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(200,149,108,0.25)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 cursor-pointer"
        >
          {isNew ? 'Add Project' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-foreground/[0.08] text-muted rounded-lg font-medium text-sm hover:border-foreground/20 hover:text-foreground transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
