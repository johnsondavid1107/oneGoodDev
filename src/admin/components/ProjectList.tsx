import { useRef, useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical, ExternalLink, Image } from 'lucide-react'
import type { Project } from '@/data/projects'

interface Props {
  projects: Project[]
  selected: string | null
  onSelect: (id: string) => void
  onAdd: () => void
  onDelete: (id: string) => void
  onReorder: (projects: Project[]) => void
}

export default function ProjectList({ projects, selected, onSelect, onAdd, onDelete, onReorder }: Props) {
  const dragId = useRef<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)

  const onDragStart = (id: string) => { dragId.current = id }

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setDragOver(id)
  }

  const onDrop = (targetId: string) => {
    setDragOver(null)
    const from = dragId.current
    if (!from || from === targetId) return
    const arr = [...projects]
    const fromIdx = arr.findIndex(p => p.id === from)
    const toIdx = arr.findIndex(p => p.id === targetId)
    const [item] = arr.splice(fromIdx, 1)
    arr.splice(toIdx, 0, item)
    onReorder(arr)
    dragId.current = null
  }

  const onDragEnd = () => { setDragOver(null); dragId.current = null }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-foreground/[0.06]">
        <div>
          <p className="text-xs text-primary font-medium tracking-[0.15em] uppercase mb-1">Dashboard</p>
          <h2 className="font-serif text-2xl font-500 tracking-tight text-foreground">Projects</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-background rounded-lg text-sm font-medium tracking-wide shadow-[3px_3px_0px_0px_rgba(200,149,108,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(200,149,108,0.25)] transition-all duration-200 cursor-pointer"
        >
          <Plus size={15} />
          Add Project
        </button>
      </div>

      {/* Hint */}
      <p className="text-xs text-muted/50 mb-4 font-light">
        {projects.length} project{projects.length !== 1 ? 's' : ''} · Drag rows to reorder · Click to edit
      </p>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {projects.length === 0 && (
          <div className="text-center py-16 text-muted/40 text-sm font-light">
            No projects yet. Add one to get started.
          </div>
        )}
        {projects.map((p, i) => (
          <div
            key={p.id}
            draggable
            onDragStart={() => onDragStart(p.id)}
            onDragOver={e => onDragOver(e, p.id)}
            onDrop={() => onDrop(p.id)}
            onDragEnd={onDragEnd}
            onClick={() => onSelect(p.id)}
            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer
              ${selected === p.id
                ? 'border-primary/30 bg-primary/5'
                : 'border-foreground/[0.06] bg-surface hover:border-foreground/[0.12] hover:bg-surface-alt'
              }
              ${dragOver === p.id ? 'border-primary/50 bg-primary/8 scale-[1.01]' : ''}
            `}
          >
            {/* Drag handle */}
            <div className="text-muted/30 group-hover:text-muted/60 transition-colors cursor-grab active:cursor-grabbing shrink-0">
              <GripVertical size={16} />
            </div>

            {/* Position */}
            <span className="text-xs font-mono text-muted/30 w-5 shrink-0 text-center">{i + 1}</span>

            {/* Thumbnail */}
            <div className="w-14 h-10 rounded-lg overflow-hidden bg-foreground/[0.04] shrink-0 flex items-center justify-center">
              {p.thumbnail
                ? <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                : <Image size={14} className="text-muted/20" />
              }
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] text-muted/60 bg-foreground/[0.04] px-1.5 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Live URL indicator */}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-muted/40 hover:text-primary transition-colors shrink-0"
                title="Open live URL"
              >
                <ExternalLink size={13} />
              </a>
            )}

            {/* Actions */}
            <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={e => { e.stopPropagation(); onSelect(p.id) }}
                className="p-1.5 rounded-lg hover:bg-foreground/[0.06] text-muted hover:text-primary transition-all duration-150 cursor-pointer"
                title="Edit"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); onDelete(p.id) }}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-all duration-150 cursor-pointer"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
