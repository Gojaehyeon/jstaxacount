// 전 페이지를 데스크톱/모바일로 전체 캡처합니다. 사용: npm run shots [baseUrl] [outDir]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
let puppeteer;
try { puppeteer = require('puppeteer'); } catch { puppeteer = require('/Users/go/develop/king-project-portal/node_modules/puppeteer'); }

const base = process.argv[2] || 'http://127.0.0.1:4321';
const out = process.argv[3] || 'shots';
mkdirSync(out, { recursive: true });
const pages = ['/', '/about.html', '/services.html', '/notice.html', '/notice/2024-01-15-tax-law-2024.html', '/nope.html'];
const browser = await puppeteer.launch({ headless: true });
for (const [label, w, h] of [['desk', 1280, 900], ['mob', 390, 844]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.evaluate(async () => {
      document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible'));
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
      for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
      document.querySelectorAll('.count').forEach((e) => (e.textContent = e.dataset.target));
      await new Promise((r) => setTimeout(r, 1500));
      document.querySelectorAll('.count').forEach((e) => (e.textContent = e.dataset.target));
    });
    const name = (p === '/' ? 'home' : p.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '')) + '-' + label + '.png';
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    console.log(name, await page.evaluate(() => document.body.scrollHeight));
  }
  await page.close();
}
await browser.close();
