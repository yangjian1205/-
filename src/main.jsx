import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// 注意：不套 StrictMode —— 开发模式下 StrictMode 会对 useEffect 双挂载，
// 导致 GSAP opening timeline / ScrollTrigger 被创建→撤销→再创建，出现动画不生效。
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
