import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 移动端地址栏收起/展开会触发 resize -> ScrollTrigger 全量 refresh -> 滚动卡顿。
// 这里忽略那类「只有高度变化」的 resize。
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })

/**
 * 全站高级动效：首屏 opening + 滚动进场（标题遮罩揭开 / 卡片 stagger / 图片 reveal / 背景 parallax）
 * 缓动统一用 power 系（丝滑、慢节奏），不用 bounce/elastic 等廉价弹跳。
 */
export function initAnimations() {
  const cleanups = []

  const ctx = gsap.context(() => {
    // 尊重系统「减少动态」设置
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* ===== 首屏 Opening：标题从遮罩里揭开，其余依次位移进场 ===== */
    // hero-mega 是首屏最大的元素，它的入场时长直接决定 LCP，所以压到 1.05s
    const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
    opening
      .fromTo(
        '.hero-mega',
        { yPercent: 112, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05 },
        0.12
      )
      .fromTo('.hero-role-line', { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.45)
      .fromTo('.hero-slogan', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.66)
      .fromTo('.hero-tagline', { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0.82)
      .fromTo('.hero-cta-row', { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0.98)
      .fromTo('.hero-menu', { y: 72, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 1.15)

    /* ===== 滚动进场：英文大标题先大幅进场，中文标题遮罩揭开 ===== */
    gsap.utils.toArray('.section-head').forEach((head) => {
      const en = head.querySelector('.en')
      const h2 = head.querySelector('h2')
      if (en) {
        gsap.fromTo(
          en,
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: head, start: 'top 82%' }
          }
        )
      }
      if (h2) {
        gsap.fromTo(
          h2,
          { y: 70, clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
          {
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.25,
            ease: 'power4.out',
            scrollTrigger: { trigger: head, start: 'top 82%' }
          },
          0.08
        )
      }
    })

    /* ===== 项目卡片 stagger 进场 ===== */
    gsap.utils.toArray('.project-card').forEach((card) => {
      gsap.fromTo(
        card,
        { y: 96, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 86%' }
        }
      )
    })

    /* ===== 能力卡 / 联系卡 stagger 进场 ===== */
    gsap.utils.toArray('.strength-card, .contact-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 72, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: (i % 3) * 0.12,
          scrollTrigger: { trigger: card, start: 'top 86%' }
        }
      )
    })

    /* ===== About 卡片 stagger 进场 ===== */
    gsap.utils.toArray('.about-id-card, .edu-card, .exp-item').forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 86%' }
        }
      )
    })

    /* ===== 图片 reveal：遮罩揭开 + 内部缩放归位 ===== */
    gsap.utils.toArray('.project-art').forEach((art) => {
      const img = art.querySelector('img')
      gsap.fromTo(
        art,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: art, start: 'top 85%' }
        }
      )
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: art, start: 'top 85%' }
          }
        )
      }
    })

    /* ===== 背景图轻微 parallax ===== */
    gsap.utils.toArray('.about-bg, .projects-bg').forEach((bg) => {
      gsap.fromTo(
        bg,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: bg.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )
    })

    ScrollTrigger.refresh()
  })

  /* ===== 补一次延时 refresh =====
     上面那次 refresh 跑在首帧，图片还没解码、字体还没落地、WebGPU 层也还没挂，
     量出来的触发点全是偏的。下面这几个时机各补一次，保证 start 位置算准。 */
  const refresh = () => ScrollTrigger.refresh()

  let rafId = 0
  const scheduleRefresh = () => {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      rafId = 0
      refresh()
    })
  }

  // 1) 页面上还没加载完的图片，加载完就重新量
  const imgs = Array.from(document.images)
  const pending = imgs.filter((img) => !img.complete)
  pending.forEach((img) => img.addEventListener('load', scheduleRefresh, { once: true }))

  // 2) 字体替换会改变文字高度
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleRefresh).catch(() => {})
  }

  // 3) 整页 load（视频 poster、大图全部就绪）
  if (document.readyState === 'complete') {
    scheduleRefresh()
  } else {
    window.addEventListener('load', scheduleRefresh, { once: true })
  }

  cleanups.push(() => {
    pending.forEach((img) => img.removeEventListener('load', scheduleRefresh))
    window.removeEventListener('load', scheduleRefresh)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return {
    revert() {
      cleanups.forEach((fn) => fn())
      cleanups.length = 0
      ctx.revert()
    }
  }
}
