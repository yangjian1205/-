import { profile } from '../data/content.js'
import '../styles/about.css'

export default function About() {
  return (
    <section className="about" id="about">
      {/* 第二屏背景图（相对路径，部署到子目录也能正确解析） */}
      <img className="about-bg" src="about-bg.webp" alt="" loading="lazy" decoding="async" />
      <div className="about-bg-dim" />
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">About Me</p>
          <h2>
            关于我
            <span className="en">Profile & Experience</span>
          </h2>
        </div>

        {/* 顶部：介绍 + 数据 */}
        <div className="about-top reveal">
          <div className="about-bio">
            <p className="about-bio-title">
              「真实 · 可演示 · 可追问 —— 简历每一项都能在 GitHub 上找到对应代码与 README。」
            </p>
            <p className="about-bio-text">{profile.intro}</p>

            <div className="about-id-card">
              <div className="about-id-head">
                <h3 className="about-name">{profile.name}</h3>
                <span className="about-name-en">{profile.nameEn}</span>
              </div>
              <div className="about-role">{profile.role}</div>
              <div className="about-contact-row">
                <a href={`tel:${profile.contact.phone}`}>
                  <span className="ct-label">TEL</span>
                  <span className="ct-val">{profile.contact.phone}</span>
                </a>
                <a href={`mailto:${profile.contact.email}`}>
                  <span className="ct-label">EMAIL</span>
                  <span className="ct-val">{profile.contact.email}</span>
                </a>
                <a href={profile.contact.githubUrl} target="_blank" rel="noreferrer">
                  <span className="ct-label">GITHUB</span>
                  <span className="ct-val">github.com/{profile.contact.github}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 下半：教育 + 工作经历 */}
        <div className="about-bottom">
          <div className="about-edu reveal">
            <h4 className="col-title">
              <span className="col-num">01</span> 教育背景
            </h4>
            <div className="edu-card">
              <div className="edu-school">{profile.education.school}</div>
              <div className="edu-major">{profile.education.major}</div>
              <div className="edu-time">{profile.education.time}</div>
              <div className="edu-tags">
                {profile.education.courses.map((c) => (
                  <span className="tag" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="about-exp reveal">
            <h4 className="col-title">
              <span className="col-num">02</span> 工作经历
            </h4>
            <div className="exp-list">
              {profile.experience.map((e) => (
                <div className="exp-item" key={e.company}>
                  <div className="exp-time">{e.time}</div>
                  <div className="exp-body">
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-company">{e.company}</div>
                    <ul className="exp-points">
                      {e.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}