import { profile, strengths } from '../data/content.js'
import ParticleBackground from './ParticleBackground.jsx'
import '../styles/contact.css'
import '../styles/strengths.css'

export default function Contact() {
  const { phone, email, github, githubUrl } = profile.contact

  return (
    <section className="contact" id="contact">
      {/* 末屏背景：Ocean Avenue 云彩图（WebP，155KB，懒加载） */}
      <img className="contact-bg" src="contact-bg.webp" alt="" loading="lazy" decoding="async" />
      <div className="contact-dim" />
      {/* 动态层：暖色光晕缓慢漂移 + 星光粒子上浮（滚出视口自动暂停） */}
      <div className="contact-glow" />
      <ParticleBackground />
      <div className="contact-grid" />

      <div className="contact-inner container">
        {/* 能力卡片（原「个人优势」模块合并进来） */}
        <div className="contact-strengths" id="strengths">
          <div className="section-head reveal">
            <p className="kicker">Capabilities</p>
            <h2>
              个人优势
              <span className="en">What I Bring</span>
            </h2>
          </div>

          <div className="strength-grid">
            {strengths.map((s) => (
              <div className="strength-card reveal" key={s.id}>
                <div className="strength-head">
                  <span className="strength-num">{s.id}</span>
                  <span className="strength-en">{s.en}</span>
                </div>
                <h3 className="strength-title">{s.title}</h3>
                <p className="strength-desc">{s.desc}</p>
                <div className="strength-tags">
                  {s.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 联系卡片 */}
        <div className="contact-cards reveal">
          <a className="contact-card" href={`mailto:${email}`}>
            <span className="contact-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="contact-card-label">邮箱</span>
            <span className="contact-card-value">{email}</span>
          </a>

          <a className="contact-card" href={`tel:${phone}`}>
            <span className="contact-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="contact-card-label">电话</span>
            <span className="contact-card-value">{phone}</span>
          </a>

          <a className="contact-card" href={githubUrl} target="_blank" rel="noreferrer">
            <span className="contact-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" fill="currentColor" />
              </svg>
            </span>
            <span className="contact-card-label">GitHub</span>
            <span className="contact-card-value">{github}</span>
          </a>
        </div>

        <div className="contact-footer reveal">
          <p className="contact-note">真实 · 可演示 · 可追问</p>
          <p className="contact-copyright">
            © {new Date().getFullYear()} {profile.name} · {profile.role} · Built with React + Vite
          </p>
        </div>
      </div>
    </section>
  )
}
