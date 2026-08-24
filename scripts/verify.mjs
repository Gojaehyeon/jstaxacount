// 빌드 결과물 검증: 필수 파일, 깨진 내부 링크, 필수 메타 태그를 확인합니다.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const dist = resolve('dist');
const required = ['index.html', 'about.html', 'services.html', 'notice.html', 'home.html', '404.html', 'CNAME', 'robots.txt', 'sitemap-index.xml', 'og-image.png', 'favicon.ico'];
const errors = [];

for (const f of required) if (!existsSync(join(dist, f))) errors.push(`필수 파일 누락: ${f}`);
if (existsSync(join(dist, 'CNAME')) && readFileSync(join(dist, 'CNAME'), 'utf8').trim() !== 'jsacc.co.kr') errors.push('CNAME 내용이 jsacc.co.kr 이 아닙니다');

const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const htmlFiles = walk(dist).filter((p) => p.endsWith('.html'));

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(dist.length);
  if (/http-equiv="refresh"/.test(html)) continue; // 리다이렉트 스텁은 메타 검사 제외
  if (!/<meta name="description"/.test(html)) errors.push(`${rel}: description 메타 누락`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel}: title 누락`);
  if (!/lang="ko"/.test(html)) errors.push(`${rel}: lang="ko" 누락`);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = m[1];
    if (target === '/' || target.startsWith('//')) continue;
    const local = join(dist, target);
    if (!existsSync(local) && !existsSync(local + '.html') && !existsSync(join(local, 'index.html'))) errors.push(`${rel}: 깨진 내부 링크 ${target}`);
  }
}

if (errors.length) {
  console.error(`✗ 검증 실패 (${errors.length}건)`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ 검증 통과: HTML ${htmlFiles.length}개, 필수 파일 ${required.length}개`);
