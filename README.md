# Travel-guide - 여행지 추천 서비스

Travel Guide는 사용자의 선호테마와 여행하기 좋은 시기를 기반으로 최적의 여행지를 추천해주는 웹 서비스입니다.

## 프로젝트 개요
이 프로젝트는 사용자의 선호도와 계절에 맞는 여행지를 추천해주는 웹사이트입니다.

## 주요 기능

- 계절과 테마 기반 여행지 추천
- 다양한 여행지 정보 제공
- 반응형 디자인
- 이미지 슬라이더
- 문의하기 기능

## 기술 스택

- Frontend: Next.js 14 + TypeScript + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL + Redis
- External APIs: Amadeus, Booking.com, OpenWeatherMap, ExchangeRate-API

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd travelfit
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 확인
```
http://localhost:3000
```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
AMADEUS_API_KEY=your_api_key
AMADEUS_API_SECRET=your_api_secret
BOOKING_API_KEY=your_api_key
OPENWEATHER_API_KEY=your_api_key
EXCHANGE_RATE_API_KEY=your_api_key
```

## 프로젝트 구조

```
travelfit/
├── src/
│   ├── app/              # Next.js 14 App Router
│   ├── components/       # React 컴포넌트
│   ├── lib/             # 유틸리티 함수
│   └── types/           # TypeScript 타입 정의
├── public/              # 정적 파일
└── prisma/             # 데이터베이스 스키마
```

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 라이선스

MIT License 

## 개발자 정보
- 이름: 김진현
- 이메일: kimjin373@Kentech.ac.kr
- 전화: 010-2831-7965 
