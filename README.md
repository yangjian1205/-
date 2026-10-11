# 个人作品集网站

React 18 + Vite 5 单页作品集，含 GSAP 滚动动效与 WebGPU 粒子背景。

## 本地运行

```bash
npm install
npm run dev      # 开发模式，默认 http://localhost:5173
npm run build    # 打包到 dist/
npm run preview  # 本地预览打包结果
```

Windows 下也可以直接双击 `启动网站.bat`。

## 技术栈

| 层 | 用了什么 | 解决什么问题 |
|---|---|---|
| 框架 | React 18 + Vite 5 | 组件化 + 秒级热更新 |
| 动效 | GSAP + ScrollTrigger | 首屏入场、滚动进场、标题遮罩揭开、背景视差 |
| 粒子（首屏） | WebGPU（vgpu） | 硬件加速粒子动效 |
| 粒子（末屏） | Canvas 2D | 轻量星光粒子，兼容性兜底 |
| 可见性控制 | 原生 IntersectionObserver | 滚出视口的动画自动暂停，长页面不烧 CPU |

## 目录结构

```
src/
├── components/          # 四个板块 + 三个动效组件
├── styles/              # 按板块拆分的 CSS
├── data/content.js      # 全站文案数据（改内容只动这一个文件）
├── animations.js        # GSAP 动效总控
└── main.jsx / App.jsx   # 入口与根组件
public/                  # 图片与视频素材（WebP / MP4）
```

## 性能取舍

- 首屏需要下载的媒体约 **1.70 MB**（含 861 KB 背景视频 + 19 KB 视频占位帧 + 14 KB 跑马灯缩略图）
- 首屏 JS **103 KB（gzip 后）**；WebGPU 动效层单独拆包，空闲时才加载
- 图片全部 WebP：一张 4000×2250 的原图收到 1760 宽后从 845 KB 降到 54 KB
- 跑马灯小图实际只显示 110×44 像素，因此使用 220×88 缩略图，从 2.19 MB 降到 14 KB
- 折叠下方的图片和视频全部懒加载；末屏视频改为静态图后不再有解码开销
- 背景视频压到 1080p / 30fps（画质档位用 ffmpeg SSIM 实测选定，SSIM 0.9965）

## 几个实现上的注意点

- `index.html` 里有一段**内联同步脚本**，负责清掉 URL 残留锚点并关闭浏览器滚动恢复。它必须写在 React 之前执行，否则会出现"打开页面直接落到最后一屏"。
- `App.jsx` 中**先归零滚动位置、再初始化动画**，顺序不能调换 —— ScrollTrigger 创建时会读取当前滚动位置。
- 不使用 `StrictMode`：React 18 开发模式下会双挂载 effect，导致 GSAP 时间线被创建→撤销→重建，动效静默失效。
