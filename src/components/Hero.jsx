import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '../data/content.js'
import FlowingMenu from './FlowingMenu.jsx'
import '../styles/hero.css'

// WebGPU 粒子层是整个项目体积最大的一块，拆成独立 chunk 懒加载，不占首屏 JS
const AeroShards = lazy(() => import('./AeroShards.jsx'))

// marquee 小方块实际只显示 110x44，用 220x88 的缩略图即可（原图 2.2MB -> 14KB）
// 路径统一用相对形式：部署到子目录（GitHub Pages）时绝对路径会 404
const menuItems = [
  { link: '#projects', text: '03+ · 开源 Agent 项目', image: 'thumbs/thumb-project-peter.webp' },
  { link: '#about', text: '02 · 段实战经历', image: 'thumbs/thumb-about-bg.webp' },
  { link: '#about', text: '100% · 代码与 README 可查', image: 'thumbs/thumb-projects-bg.webp' },
  { link: '#contact', text: '↗ · 聊聊 / 合作', image: 'thumbs/thumb-project-agent.webp' }
]

// 能不能跑 WebGPU：不支持就直接不加载粒子层（省一个 GPU 上下文 + 一大段 JS）
function canUseWebGPU() {
  if (typeof navigator === 'undefined' || !('gpu' in navigator)) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

export default function Hero() {
  const [shardsReady, setShardsReady] = useState(false)

  // 首屏先让文字和视频渲染，粒子层等浏览器空闲了再挂载，避免三者在同一帧抢 GPU
  useEffect(() => {
    if (!canUseWebGPU()) return
    let cancelled = false
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 900))
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout
    const id = idle(() => {
      if (!cancelled) setShardsReady(true)
    }, { timeout: 2000 })
    return () => {
      cancelled = true
      cancelIdle(id)
    }
  }, [])

  return (
    <section className="hero" id="top">
      {/* 视频背景：poster 让首帧解码前就有画面，避免首屏白屏拉高 LCP */}
      <video
        className="hero-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="poster-hero.webp"
      >
        <source src="bg.mp4?v=4" type="video/mp4" />
      </video>
      <div className="hero-dim" />

      {/* 粒子层：关掉 bloom / grain / 色散三档后处理
          → 渲染从 5 个全屏 pass 降到 1 个，它和 1080p 视频叠着跑，GPU 压力直接减半 */}
      {shardsReady && (
        <Suspense fallback={null}>
          <AeroShards
            className="aero-overlay"
            backgroundColor="#0a0a12"
            shardColor="#6366f1"
            accentColor="#8b5cf6"
            speed={0.7}
            bloom={0}
            grain={0}
            chromaticAberration={0}
          />
        </Suspense>
      )}

      {/* 主体：左上拼音大字 + 信息 */}
      <div className="hero-main container">
        <div className="hero-left">
          <h1 className="hero-mega">YANGJIAN</h1>
          <p className="hero-role-line">
            AI 应用工程师 <span className="slash">/</span> LLM 应用开发
          </p>
          <p className="hero-slogan">用评测数据说话</p>
          <p className="hero-tagline">
            简历每一项都能在 GitHub 查到对应代码 —— 真实 · 可演示 · 可追问
          </p>
          <div className="hero-cta-row">
            <a href="#projects" className="btn btn-red">
              查看精选项目
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost">联系我</a>
          </div>
        </div>
      </div>

      {/* 底部横版滚动菜单（原统计条改造） */}
      <div className="hero-menu container">
        <FlowingMenu
          items={menuItems}
          speed={14}
          textColor="#fff"
          bgColor="transparent"
          marqueeBgColor="#e01616"
          marqueeTextColor="#fff"
          borderColor="rgba(255, 255, 255, 0.18)"
        />
      </div>

      <a href="#about" className="hero-scroll" aria-label="向下滚动">
        <span className="hero-scroll-text">SCROLL</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  )
}
