export const site = {
  name: '주성회계법인',
  nameEn: 'Juseong Accounting Corporation',
  tagline: '사업의 시작부터 기업의 정점까지',
  description:
    '주성회계법인은 고객 한 분만을 위한 프라이빗 회계·세무 서비스를 제공합니다. 회계감사, 세무자문, 상속·증여세 플래닝, M&A·재무자문, 미국 세무자문 전문.',
  url: 'https://jsacc.co.kr',
  address: '서울시 강남구 논현로 616, 4층 (논현동)',
  addressShort: '강남구 논현로 616, 4층',
  phone: '02-2038-4832',
  phoneHref: 'tel:0220384832',
  fax: '02-2038-2018',
  email: 'admin@jsacc.co.kr',
  hours: '평일 09:00 – 18:00',
  // 카카오 약도 위젯. cdn 은 https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js 안의 `var a="..."` 값이며
  // uptime 워크플로가 매일 변경 여부를 점검합니다(변경 시 이슈 생성).
  daumRoughmap: { timestamp: '1759999229053', key: 'aicbpn998ao', cdn: '207038f2_1774248312945' },
  stats: [
    { value: '1,200', suffix: '+', label: '누적 상담 건수' },
    { value: '20', suffix: '년+', label: '구성원 평균 경력' },
    { value: '8', suffix: '인', label: '전문가 (자문역 포함)' },
    { value: '5', suffix: '개', label: '전문 서비스 분야' },
  ],
  nav: [
    { href: '/', label: '홈' },
    { href: '/about.html', label: '법인소개' },
    { href: '/services.html', label: '주요업무' },
    { href: '/notice.html', label: '공지사항' },
    { href: '/#inquiry', label: '상담 문의' },
    { href: '/#contact', label: '오시는 길' },
  ],
  /**
   * 온라인 문의 폼 전송 설정 (Web3Forms, https://web3forms.com — 무료, 월 250건).
   * accessKey 발급: web3forms.com 에서 수신 이메일(admin@jsacc.co.kr)을 입력하면 키가 메일로 옵니다.
   * 키가 비어 있으면 폼은 메일 앱(mailto)으로 대체 전송됩니다.
   */
  inquiry: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '',
    to: 'admin@jsacc.co.kr',
    topics: ['회계감사', '세무자문', '프라이빗 웰쓰(상속·증여)', '미국 세무자문', '재무자문(M&A·가치평가)', '기타'],
  },
} as const;

export const parking = [
  {
    image: 'parking_1',
    name: '이디야커피 주차장',
    address: '강남구 논현로 636',
    note: '이디야커피 이용 시 주차 가능',
  },
  { image: 'parking_2', name: 'M주차타워', address: '강남구 논현로 612', note: '유료' },
  { image: 'parking_3', name: '대승유료주차장', address: '논현동 192-9', note: '유료' },
  {
    image: 'parking_4',
    name: '강남차병원 주차장',
    address: '논현로 566',
    note: 'CHA의과학대학교 강남차병원',
  },
] as const;
