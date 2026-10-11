import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 用相对路径作为资源基础路径：
  // 部署到子目录（GitHub Pages 的 /portfolio/）和部署到根域名（Vercel/Netlify）都能正确解析，
  // 以后换部署平台或换仓库名都不用再动这个配置。
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: false,
  },
})
