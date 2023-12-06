import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Want文档',
  description: 'A VitePress Site',
  rewrites: {
    'README.md': 'index.md',
    'packages/:pkg/README.md': ':pkg/index.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],
    sidebar: [
      {
        text: '开发指南',
        items: [{ text: '介绍', link: '/' }]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
});
