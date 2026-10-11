import { useEffect, useRef } from 'react'

/**
 * 末屏动态层：柔和星光粒子 + 淡连线 + 鼠标轻推。
 * 底色是 Ocean Avenue 云彩图，所以粒子取夕阳暖色（金 / 粉 / 暖白），不用冷色科技紫。
 * 三条省电措施：DPR 封顶 2、粒子数按面积限流、滚出视口就停 rAF。
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let raf = 0
    let w = 0
    let h = 0
    let particles = []
    let running = false
    const mouse = { x: null, y: null, r: 150 }

    const COLORS = ['255,206,150', '255,178,196', '255,238,224']
    const LINK = '255,214,180'
    const LINK_DIST = 150

    const init = () => {
      const count = Math.min(Math.floor((w * h) / 17000), 120)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22 - 0.06, // 整体略微上浮，像光尘
        r: Math.random() * 1.5 + 0.5,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2, // 闪烁相位
        speed: 0.6 + Math.random() * 1.1 // 闪烁频率
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    let last = 0
    const step = (now) => {
      // 按真实帧间隔缩放位移，掉帧时不会突然加速
      const dt = last ? Math.min((now - last) / 16.67, 3) : 1
      last = now
      ctx.clearRect(0, 0, w, h)

      // 连线
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK_DIST * LINK_DIST) continue
          const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.09
          ctx.strokeStyle = `rgba(${LINK},${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // 粒子
      const t = now / 1000
      for (const p of particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        // 从一边穿出去就从另一边回来，不做反弹（少一次判断，也不会有粒子挤在边缘）
        if (p.x < -20) p.x = w + 20
        else if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        else if (p.y > h + 20) p.y = -20

        if (mouse.x !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < mouse.r && d > 0.01) {
            const f = ((mouse.r - d) / mouse.r) * 0.5
            p.x += (dx / d) * f
            p.y += (dy / d) * f
          }
        }

        const twinkle = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase)
        ctx.fillStyle = `rgba(${p.c},${0.28 + twinkle * 0.55})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    const start = () => {
      if (running) return
      running = true
      last = 0
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // 滚出视口就不烧 CPU；系统开了「减少动态」则完全不启动
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const io = new IntersectionObserver(
      (entries) => {
        if (reduce.matches) return
        entries.forEach((e) => (e.isIntersecting ? start() : stop()))
      },
      { threshold: 0.02 }
    )

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    io.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="contact-particles" />
}
