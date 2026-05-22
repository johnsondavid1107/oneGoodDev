import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { Upload, X, Image } from 'lucide-react'

interface Props {
  value: string
  onChange: (path: string) => void
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File must be an image.')
      return
    }
    setUploading(true)
    setError('')
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = reader.result as string
        const ext = file.name.split('.').pop() ?? 'jpg'
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: `${Date.now()}.${ext}`, data: base64 }),
        })
        const json = await res.json() as { path?: string; error?: string }
        if (json.path) {
          onChange(json.path)
        } else {
          setError(json.error ?? 'Upload failed.')
        }
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch {
      setError('Upload failed.')
      setUploading(false)
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  const clear = () => onChange('')

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative rounded-xl overflow-hidden aspect-video bg-surface-alt border border-foreground/[0.06]">
          <img src={value} alt="Thumbnail" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-lg border border-foreground/10 text-muted hover:text-foreground hover:border-primary/30 transition-all duration-200 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          disabled={uploading}
          className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer
            ${dragging
              ? 'border-primary/60 bg-primary/5'
              : 'border-foreground/[0.08] bg-surface hover:border-primary/30 hover:bg-surface-alt'
            }
            ${uploading ? 'opacity-50 cursor-wait' : ''}
          `}
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] flex items-center justify-center">
                {dragging ? <Image size={18} className="text-primary" /> : <Upload size={18} className="text-muted" />}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground/80">Drop image here or click to browse</p>
                <p className="text-xs text-muted/60 mt-1">PNG, JPG, WebP</p>
              </div>
            </>
          )}
        </button>
      )}
      {error && <p className="text-red-400 text-xs font-light">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
    </div>
  )
}
