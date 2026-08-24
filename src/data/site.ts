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
  daumRoughmap: { timestamp: '1759999229053', key: 'aicbpn998ao' },
  stats: [
    { value: '1,200', suffix: '+', label: '누적 상담 건수' },
    { value: '20', suffix: '년+', label: '구성원 평균 경력' },
    { value: '7', suffix: '인', label: '공인회계사·세무사' },
  ],
  nav: [
    { href: '/', label: '홈' },
    { href: '/about.html', label: '법인소개' },
    { href: '/services.html', label: '주요업무' },
    { href: '/notice.html', label: '공지사항' },
    { href: '/#contact', label: '오시는 길' },
  ],
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
