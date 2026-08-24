# 주성회계법인 웹사이트 (jsacc.co.kr)

Astro 7 + Tailwind 4 정적 사이트. GitHub Pages 배포(main push → Actions 자동 배포).

## 규칙
- 콘텐츠는 코드가 아니라 데이터에 있다: 구성원 `src/data/team.json`, 서비스 `src/data/services.json`, 연락처·주차 `src/data/site.ts`, 공지 `src/content/notices/*.md`. 페이지(.astro)를 고치기 전에 데이터 파일 수정으로 해결되는지 먼저 확인.
- 이미지는 `src/assets/`에 원본을 넣고 `astro:assets`의 `<Image>`로 사용(자동 최적화). `public/`에는 파비콘·OG·CNAME 같은 고정 파일만.
- 기존 URL(`about.html`, `services.html`, `notice.html`)은 유지해야 한다. `build.format: 'file'` 설정을 바꾸지 말 것. 리다이렉트 키에는 `.html`을 붙이지 않는다.
- UI 문구는 격식체(~합니다/~하시기 바랍니다). 이모지 사용 금지.
- 디자인 토큰은 `src/styles/global.css`의 `@theme` (wine `#4f1111` = 로고 색, gold, paper, ink).
- 문의 폼(`Inquiry.astro`)은 Web3Forms 전송, `site.ts`의 `inquiry.accessKey`가 비어 있으면 mailto 폴백. 키는 커밋해도 되는 공개 식별자(스팸 방지는 honeypot + Web3Forms 측).
- 윤영한 자문역(외부 파트너, role `자문역`)은 team.json에 있고, US TAX 상세 자료는 `ustax-partner.ts`.
- 카카오 약도 위젯 키는 `site.ts`의 `daumRoughmap`. 지도 컨테이너는 인라인 `height:100%` + `.map-frame` 높이로 잡혀 있어야 렌더된다.

## 검증
변경 후 반드시: `npm run check && npm run build && npm run verify`. 시각 확인은 `npm run preview` 후 `node scripts/shots.mjs http://127.0.0.1:4321 shots`.

## 배포
`main`에 push. 브랜치 push/PR은 ci.yml(빌드·검증·Lighthouse)만 돌고 배포되지 않는다.
