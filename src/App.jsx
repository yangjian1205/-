import { useLayoutEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import { initAnimations } from './animations.js'

export default function App() {
  useLayoutEffect(() => {
    // 滚动恢复的开关同时在 index.html 里用内联脚本设了一次（那次更早，才是真正生效的那次）
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 顺序很重要：必须先把页面归零，再初始化动画。
    // ScrollTrigger 创建时会读当前滚动位置，反过来的话它会认为用户已经停在下方，
    // 入场动画的进度直接被算成「已播完」，首屏什么都不动。
    // 临时把 scroll-behavior 换成 auto 是为了绕开 html{scroll-behavior:smooth}——
    // 否则这次归零会变成一段肉眼可见的滚动，看起来就像「打开后自己滚回顶部」。
    const html = document.documentElement
    const previousBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = previousBehavior

    const ctx = initAnimations()
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
