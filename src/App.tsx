import { useEffect, useRef, useState } from 'react'
import { groups } from './bookmarks'

// Lowercased name with its key letter in a reverse-video block while that key works,
// or an outline of the same size while it doesn't, so the label never changes width.
function Label({ name, hotkey, active }: { name: string; hotkey: string; active: boolean }) {
  const text = name.toLowerCase()
  const i = text.indexOf(hotkey.toLowerCase())
  const className = ['key', i === 0 && 'start', !active && 'idle'].filter(Boolean).join(' ')
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{text[i]}</span>
      {text.slice(i + 1)}
    </>
  )
}

export function App() {
  const [open, setOpen] = useState<number | null>(null)
  const tree = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.altKey || e.repeat) return
      if (e.key === 'Escape') return setOpen(null)
      const key = e.key.toLowerCase()

      // Collapsed: plain keys pick a group; leave ⌘ shortcuts to the browser.
      if (open === null) {
        if (e.metaKey) return
        const i = groups.findIndex((g) => g.key.toLowerCase() === key)
        if (i !== -1) setOpen(i)
        return
      }

      // Open: every key belongs to this group's links; ⌘ opens a new tab.
      const link = groups[open].links.find((l) => l.key.toLowerCase() === key)
      if (!link) return
      e.preventDefault()
      if (e.metaKey) window.open(link.url, '_blank', 'noopener')
      else window.location.href = link.url
    }

    function onClick(e: MouseEvent) {
      if (!tree.current?.contains(e.target as Node)) setOpen(null)
    }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onClick)
    }
  }, [open])

  return (
    <main>
      <ul className="tree" ref={tree}>
        {groups.map((group, i) => (
          <li key={group.name} className={open === null ? undefined : open === i ? 'open' : 'dimmed'}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              <Label name={group.name} hotkey={group.key} active={open === null} />/
            </button>
            {/* Always rendered so closed groups still reserve their width (see styles.css). */}
            <ul>
              {group.links.map((link) => (
                <li key={link.name}>
                  <a href={link.url}>
                    <Label name={link.name} hotkey={link.key} active />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {open !== null && (
        <p className="hint">
          <span className="key start">esc</span>  back
        </p>
      )}
    </main>
  )
}
