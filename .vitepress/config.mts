import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Want组件文档',
  description: 'A VitePress Site',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'src/static/logo.png' }]
  ],
  rewrites: {
    'packages/:pkg/README.md': ':pkg/index.md'
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPDocAsideOutline\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/MyDocAsideOutline.vue', import.meta.url)
          )
        }
      ]
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'src/static/icon.png',
    nav: [],
    sidebar: [
      {
        text: '开发指南',
        items: [
          { text: '介绍', link: '/README' },
          { text: '快速上手', link: '/quickstart.md' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright:
        '<a href="https://beian.miit.gov.cn/">湘ICP备2023034204号-1 </a>'
    }
  }
});
