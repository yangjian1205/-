import { projects } from '../data/content.js'
import '../styles/projects.css'

// 作品图：有真实图片用图片，否则用抽象 SVG 占位
function ProjectArt({ p }) {
  if (p.image) {
    return (
      <div className="project-art" style={{ '--c1': p.accent[0], '--c2': p.accent[1] }}>
        <img src={p.image} alt={p.title} width="640" height="420" loading="lazy" decoding="async" />
        <span className="project-art-badge">{p.id}</span>
      </div>
    )
  }
  const [c1, c2] = p.accent
  const uid = `g-${p.id}`
  return (
    <div className="project-art" style={{ '--c1': c1, '--c2': c2 }}>
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} stopOpacity="0.55" />
            <stop offset="1" stopColor={c2} stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill={`url(#${uid}-bg)`} />
        {/* 网格 */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="420" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 80} x2="640" y2={i * 80} />
          ))}
        </g>
        {/* 节点连线（抽象流程图） */}
        <g stroke={`url(#${uid}-line)`} strokeWidth="2" fill="none">
          <path d="M120 210 L220 210 L320 140 L440 140 L520 200" />
          <path d="M320 140 L320 300 L440 300 L520 240" />
        </g>
        <g>
          {[
            [120, 210], [220, 210], [320, 140], [440, 140], [520, 200],
            [320, 300], [440, 300], [520, 240],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="8" fill="#0b0d16" stroke={`url(#${uid}-line)`} strokeWidth="2" />
          ))}
        </g>
        {/* 中心 glyph */}
        <text
          x="320" y="392"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="18"
          letterSpacing="6"
          fill="rgba(255,255,255,0.85)"
        >
          {p.glyph}
        </text>
        <text
          x="320" y="60"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="12"
          letterSpacing="3"
          fill="rgba(255,255,255,0.4)"
        >
          {p.en.toUpperCase()}
        </text>
      </svg>
      <span className="project-art-badge">{p.id}</span>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      {/* 第三屏背景图 */}
      <img className="projects-bg" src="projects-bg.webp" alt="" loading="lazy" decoding="async" />
      <div className="projects-bg-dim" />
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Selected Work</p>
          <h2>
            精选项目
            <span className="en">Three Agent Projects</span>
          </h2>
        </div>

        <div className="project-list">
          {projects.map((p, i) => (
            <article className={`project-card reveal ${i % 2 === 1 ? 'reverse' : ''}`} key={p.id}>
              <ProjectArt p={p} />
              <div className="project-info">
                <div className="project-id">{p.id}</div>
                <h3 className="project-title">{p.title}</h3>
                <div className="project-sub">{p.subtitle}</div>
                <p className="project-desc">{p.desc}</p>
                <ul className="project-highlights">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="project-metrics">
                  {p.metrics.map((m) => (
                    <div className="metric" key={m.label}>
                      <span className="metric-value">{m.value}</span>
                      <span className="metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="project-stack">
                  {p.stack.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <a className="project-link" href={p.github} target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
                  </svg>
                  查看源码
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
