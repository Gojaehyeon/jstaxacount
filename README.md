# 주성회계법인 웹사이트 — jsacc.co.kr

정적 사이트(Astro 7 + Tailwind CSS 4). `main` 브랜치에 push 하면 GitHub Actions가 빌드·검증 후 GitHub Pages에 자동 배포합니다.

## 구조

```
src/
├── data/
│   ├── site.ts          # 연락처·주소·통계·메뉴·주차장·카카오 약도 키
│   ├── team.json        # 구성원 (한 명 = 배열 항목 하나)
│   └── services.json    # 주요 업무 5개 분야
├── content/notices/     # 공지사항 (파일 하나 = 공지 하나, Markdown)
├── assets/              # 원본 이미지 (빌드 시 자동 WebP 변환·리사이즈)
│   ├── team/  services/  parking/  hero.jpg  logo.png
├── components/          # Header, Footer, Hero 요소, 카드, Contact(지도·주차), CTA
├── layouts/Base.astro   # 공통 <head>, SEO 메타, JSON-LD, 폰트
└── pages/               # index, about, services, notice, notice/[id], 404
public/                  # CNAME, robots.txt, 파비콘, OG 이미지, 매니페스트
scripts/verify.mjs       # 빌드 결과 검증(필수 파일·깨진 링크·메타)
scripts/shots.mjs        # 전 페이지 데스크톱/모바일 스크린샷
.github/workflows/       # deploy(main 배포), ci(PR 검증+Lighthouse), uptime(매일 점검)
```

## 로컬 작업

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ 생성
npm run verify     # 빌드 결과 검증
npm run check      # 타입·콘텐츠 스키마 검사
npm run preview    # 빌드 결과 미리보기
```

## 자주 하는 수정

| 작업 | 파일 |
|---|---|
| 구성원 추가·수정 | `src/data/team.json` + 사진을 `src/assets/team/`에 추가 |
| 공지 추가 | `src/content/notices/YYYY-MM-DD-slug.md` 생성 (frontmatter: title, date, summary, category, pinned) |
| 서비스 항목 수정 | `src/data/services.json` |
| 주소·전화·이메일·업무시간 | `src/data/site.ts` |
| 주차장 안내 | `src/data/site.ts`의 `parking` + `src/assets/parking/` |
| 색상·폰트 | `src/styles/global.css`의 `@theme` |
| 미국 세무 자문 파트너 자료 | `src/data/ustax-partner.ts` (services.html US TAX 하단 펼침 패널) |
| 문의 폼 수신 설정 | `src/data/site.ts`의 `inquiry.accessKey` (아래 참고) |

## 온라인 문의 폼

홈 `#inquiry` 섹션의 폼은 [Web3Forms](https://web3forms.com)(무료, 월 250건)로 이메일 전송됩니다.

1. web3forms.com 에서 수신 이메일 `admin@jsacc.co.kr` 입력 → 메일로 받은 Access Key 복사
2. `src/data/site.ts` → `inquiry.accessKey`에 붙여넣고 main push
3. 키가 비어 있는 동안에는 방문자의 메일 앱이 열리는 방식(mailto)으로 동작합니다.

수정 후 `git push origin main` 하면 약 1–2분 뒤 https://jsacc.co.kr 에 반영됩니다.

## 자동화

- **deploy.yml** — main push 시 `astro check` → 빌드 → `verify` → Pages 배포 → 라이브 스모크 테스트
- **ci.yml** — PR/브랜치 push 시 동일 검증 + Lighthouse 점수(접근성·SEO 0.9 미만이면 실패) + 미리보기 아티팩트
- **uptime.yml** — 매일 09:00 KST HTTP 200·SSL 만료(14일 미만) 점검, 실패 시 이슈 자동 생성
- **dependabot.yml** — 월 1회 의존성·액션 업데이트 PR

## URL 호환

기존 `about.html`, `services.html`, `notice.html` 주소는 그대로 유지됩니다. `home.html`, `contact.html`, `team.html`, `index_old.html`은 새 위치로 리다이렉트됩니다.
