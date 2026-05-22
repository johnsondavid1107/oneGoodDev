import { useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'

interface Props {
  tags: string[]
  onChange: (tags: string[]) => void
}

export default function TagInput({ tags, onChange }: Props) {
  const [input, setInput] = useState('')

  const add = () => {
    const val = input.trim()
    if (val && !tags.includes(val)) {
      onChange([...tags, val])
    }
    setInput('')
  }

  const remove = (tag: string) => onChange(tags.filter(t => t !== tag))

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); add() }
    if (e.key === 'Backspace' && input === '' && tags.length) {
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-surface border border-foreground/[0.06] rounded-xl focus-within:border-primary/30 transition-colors duration-200 min-h-[46px]">
      {tags.map(tag => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            className="hover:text-primary/60 transition-colors cursor-pointer"
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={add}
        placeholder={tags.length === 0 ? 'Type a tag, press Enter' : ''}
        className="flex-1 min-w-[120px] bg-transparent text-foreground placeholder:text-muted/40 text-sm font-light focus:outline-none"
      />
    </div>
  )
}
