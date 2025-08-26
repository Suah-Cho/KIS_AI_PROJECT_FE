# AI 챗봇 프론트엔드
### 폴더 구조
```
├─ public/                     # 정적 파일 (favicon, index.html 등)
│
├─ src/
│  ├─ assets/                  # 이미지, 아이콘, 폰트 등
│  │
│  ├─ components/              # 재사용 가능한 UI 컴포넌트
│  │
│  ├─ lib/                     # 유틸리티·공통 로직
│  │   ├─ api.ts               # API 호출 함수
│  │   └─ utils.ts             # 날짜 포맷, 문자열 처리 등
│  │
│  ├─ styles/                  # Tailwind 설정·전역 스타일
│  │   └─ index.css            # Tailwind 기본 import
│  │
│  ├─ App.tsx                  # 라우터와 레이아웃 정의
│  └─ index.tsx                # 진입점
│
├─ tailwind.config.js          # Tailwind 설정 파일
├─ tsconfig.json               # Typescript 설정
└─ package.json
```