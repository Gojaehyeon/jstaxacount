// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jsacc.co.kr',
  // 기존 URL(about.html, services.html, notice.html)을 그대로 유지하기 위해 파일 형식으로 출력합니다.
  build: { format: 'file' },
  trailingSlash: 'never',
  redirects: {
    // build.format 'file' 이므로 키에 .html 을 붙이지 않습니다 (→ home.html 로 출력됨)
    '/home': '/',
    '/index_old': '/',
    '/contact': '/#contact',
    '/team': '/about.html#team',
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      filter: (page) => !page.includes('/home.html'),
    }),
  ],
});
