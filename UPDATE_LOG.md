# 주성회계법인 웹사이트 수정 로그

## 프로젝트 정보
- **도메인**: jsacc.co.kr
- **타입**: 정적 웹사이트 (HTML/CSS/JavaScript)
- **호스팅**: GitHub Pages
- **디자인**: STUDIO WITHY

---

## 프로젝트 구조

```
jstaxacount/
├── HTML 페이지
│   ├── index.html          # 리다이렉트 (→ home.html)
│   ├── home.html           # 메인 홈페이지
│   ├── about.html          # 회사소개 및 팀 소개
│   ├── services.html       # 서비스 상세
│   └── notice.html         # 공지사항
│
├── css/
│   ├── modern.css          # 메인 스타일 (수정 시 주로 사용)
│   ├── style.css           # 보조 스타일
│   └── bootstrap.css       # Bootstrap 프레임워크
│
├── js/
│   ├── modern.js           # 메인 JavaScript
│   └── main.js             # 구 스크립트
│
├── images/
│   ├── 팀 멤버: ceo.png, go.png, lee.png, shin.png, oh.png, lkm.png, kth.png
│   ├── 서비스: tax1.jpg ~ tax5.jpg
│   ├── 주차장: parking_1.png ~ parking_4.png
│   └── 기타: logo.png, city.jpg (히어로 배경)
│
├── fonts/                  # 폰트 파일
├── sass/                   # SASS 소스 (CSS 컴파일 원본)
├── includes/               # 헤더/푸터 컴포넌트
│
└── 설정 파일
    ├── CNAME               # GitHub Pages 도메인
    ├── sitemap.xml         # SEO 사이트맵
    ├── robots.txt          # 크롤러 설정
    └── .htaccess           # Apache 서버 설정
```

---

## 기술 스택
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS 프레임워크**: Bootstrap 3
- **라이브러리**: jQuery, Magnific Popup, Stellar.js, Waypoints
- **폰트**: Noto Sans KR (Google Fonts)
- **지도**: Daum Map API

---

## CSS 주요 변수 (modern.css)
```css
--primary-color: #12083F     /* 진한 보라색 - 메인 브랜드 색상 */
--primary-light: #1d0296
--secondary-color: #8bde2f   /* 라임 그린 - 강조 색상 */
--accent-color: #3498db      /* 파란색 - 링크 색상 */
```

---

## 팀 멤버 정보 (about.html)
| 이름 | 직책 | 이미지 파일 |
|------|------|-------------|
| 고득성 | 대표파트너, CEO | ceo.png, go.png |
| 이주영 | 파트너 회계사 | lee.png |
| 신현주 | 회계사 | shin.png |
| 오규태 | 파트너 회계사 | oh.png |
| 이경민 | 파트너 | lkm.png |
| 김태환 | 파트너 | kth.png |
| 차주현 | 이사 | cjh.png |

---

## 수정 이력

### 2025-01-22
- **차주현 회계사 프로필 추가**: about.html에 팀 멤버 추가 (cjh.png)

### 2024-XX-XX (이전)
- **주차장 정보 추가**: 강남차병원 주차장 정보 추가
- **김태환 공인회계사 프로필 추가**
- **로고 변경**

---

## 자주 수정하는 항목

### 1. 팀 멤버 추가/수정
- **파일**: `about.html`
- **위치**: 팀 멤버 섹션 (약 150줄 이후)
- **이미지**: `images/` 폴더에 추가

### 2. 서비스 내용 수정
- **파일**: `services.html`
- **위치**: 각 서비스 섹션

### 3. 공지사항 추가
- **파일**: `notice.html`

### 4. 연락처/주소 수정
- **파일**: `home.html` (contact 섹션)
- **위치**: 약 180줄 이후

### 5. 주차장 정보 수정
- **파일**: `home.html`
- **위치**: parking-info 섹션
- **이미지**: `images/parking_*.png`

### 6. 스타일 수정
- **파일**: `css/modern.css`

---

## 배포 방법
```bash
git add .
git commit -m "feat: 수정 내용"
git push origin main
```
GitHub Pages가 자동으로 배포합니다.

---

## 수정 체크리스트
- [ ] 로컬에서 변경사항 확인
- [ ] 모바일 반응형 테스트
- [ ] 이미지 최적화 (용량 확인)
- [ ] Git 커밋 및 푸시
- [ ] 라이브 사이트 확인

---

## 메모
<!-- 추가 메모나 TODO 항목을 여기에 작성 -->

