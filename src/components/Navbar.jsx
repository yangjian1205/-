import { useEffect, useState } from 'react'
import { profile } from '../data/content.js'
import '../styles/navbar.css'

const links = [
  { href: '#about', label: '关于', en: 'About' },
  { href: '#projects', label: '项目', en: 'Projects' },
  { href: '#contact', label: '联系', en: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 只在跨过 40px 阈值时才更新 state，避免滚动时每个事件都触发一次 setState 调度
    const onScroll = () => {
      const next = window.scrollY > 40
      setScrolled((prev) => (prev === next ? prev : next))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-mark">{profile.logo}</span>
          <span className="nav-logo-text">
            {profile.nameEn}
            <em>{profile.role.split('/')[0].trim()}</em>
          </span>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span className="nav-zh">{l.label}</span>
              <span className="nav-en">{l.en}</span>
            </a>
          ))}
          <a
            className="nav-cta"
            href="#strengths"
            onClick={() => setOpen(false)}
          >
            个人优势
          </a>
        </nav>

        <button
          className={`nav-burger ${open ? 'active' : ''}`}
          aria-label="菜单"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
