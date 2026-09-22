# PDS Frontend - STEP 4 Foundation

Player Development System (PDS) 의 Next.js Frontend Foundation

## 기술 스택

- Next.js 16
- React 19
- TypeScript strict mode
- CSS Modules + Design Tokens
- TanStack React Query
- Axios
- React Hook Form + Zod
- MSW (Mock Service Worker)
- ESLint

## 설치 및 실행

### 1. Dependencies 설치

```bash
npm install
```

### 2. 개발 서버 시작

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 3. 검증 명령

```bash
# TypeScript 검사
npm run typecheck

# ESLint 검사
npm run lint

# Production Build
npm run build
```

## 폴더 구조

```
src/
├── app/              # Next.js App Router
├── api/              # Axios Client (client.ts만)
├── providers/        # React Query Provider
├── mocks/            # MSW 기본 구조
├── styles/           # Global CSS & Tokens
├── ui/               # (STEP 5)
│   ├── components/
│   ├── features/
│   └── layout/
├── hooks/            # (추후)
└── shared/           # (추후)
```

## 주의사항

- Backend API 계약이 확정되지 않았으므로, Domain API 파일과 실제 Component는 아직 작성하지 않습니다.
- STEP 5 (Design System / Common Components)에서 UI Component를 구현합니다.
- 각 화면의 기능정의서 확정 후 Route와 Feature Component를 생성합니다.

## 다음 단계

- STEP 5: Design System & Common Components
- STEP 6+: 화면별 기능정의서 → 구현

---

Created: 2026-09-22
