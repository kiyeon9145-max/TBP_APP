# PDS Frontend Guide v0.1

> 문서 목적: TBP Player Development System(PDS) 프론트엔드의 기술 스택,
> 아키텍처, 폴더 구조, 상태 관리, API 연동, UI 구현 원칙을 고정한다.\
> 상태: **STEP 1 --- Frontend 기술 스택 / 개발 구조 확정안**\
> 적용 범위: `frontend/` 전체\
> 후속 문서: `README.md` → `AI_RULES.md` → 화면별 기능정의서 /
> 작업명세서

------------------------------------------------------------------------

## 0. 이 문서가 결정하는 것

이 문서는 화면별 기능을 정의하는 문서가 아니다.

이 문서에서는 다음을 고정한다.

1.  프론트엔드 기술 스택
2.  Frontend / Backend / Database 책임 분리
3.  Next.js 애플리케이션 구조
4.  상태 관리 기준
5.  API 통신 구조
6.  컴포넌트와 화면의 책임
7.  디자인 시스템 적용 방식
8.  반응형 / 모바일 UX 기준
9.  폼과 Validation 기준
10. Mock API 개발 방식
11. 에러 / 로딩 / Empty 상태 기준
12. 테스트 및 품질 검사 기준
13. 환경변수 관리 기준
14. 파일 및 코드 네이밍 기준
15. 향후 AI Agent가 코드를 생성할 때 따라야 할 기술적 기준

화면별 세부 기능, API endpoint, Request/Response DTO는 각 화면
기능정의서와 Backend API 명세에서 확정한다.

------------------------------------------------------------------------

# 1. PDS 제품 개발 원칙

PDS는 일반 회원 관리 도구가 아니라 **선수 성장 기록 시스템**이다.

핵심 데이터 흐름은 다음과 같다.

``` text
Current Goal
    ↓
Class
    ↓
Class Session
    ↓
Observation
    ↓
Skill / Media
    ↓
Monthly Report
    ↓
Next Goal
    ↺
```

Frontend는 이 흐름을 코치가 빠르고 실수 없이 사용할 수 있도록 표현하는
역할을 한다.

### 핵심 제품 원칙

-   Mobile First
-   Evidence Based
-   History First
-   Coach Approved
-   Backend Transaction
-   Soft Delete / History Preservation
-   빠른 현장 입력
-   부모가 이해할 수 있는 결과물

------------------------------------------------------------------------

# 2. 전체 시스템 아키텍처

PDS는 Frontend / Backend / Database를 분리한다.

``` text
┌──────────────────────────────────┐
│        PDS Frontend              │
│                                  │
│ Next.js + React + TypeScript     │
│ UI / Form / Client State         │
│ API Request / Mobile UX          │
└────────────────┬─────────────────┘
                 │
                 │ HTTPS / JSON API
                 ▼
┌──────────────────────────────────┐
│        PDS Backend               │
│                                  │
│ Authentication / Authorization   │
│ Validation                       │
│ Business Logic                   │
│ Transaction                      │
│ AI Integration                   │
│ Media Processing                 │
│ Report Export                    │
└────────────────┬─────────────────┘
                 │
                 │ ORM / SQL
                 ▼
┌──────────────────────────────────┐
│        PostgreSQL                │
│                                  │
│ Player / Goal                    │
│ Class / Session                  │
│ Attendance / Observation         │
│ Skill Current / History          │
│ Media / Monthly Report           │
└──────────────────────────────────┘
```

## 절대 경계

Frontend에서 다음 작업을 직접 수행하지 않는다.

``` text
PostgreSQL Query
Skill History INSERT
Current Goal 교체 Transaction
Monthly Report 승인 Transaction
AI Secret Key 호출
Storage Secret 접근
권한 판정의 최종 책임
```

Frontend는 Backend API를 통해서만 서버 데이터를 조회하거나 변경한다.

------------------------------------------------------------------------

# 3. Frontend 기술 스택

## 3.1 Core

  영역                선택                   기준
  ------------------- ---------------------- -------------------------------
  Framework           Next.js                App Router 사용
  UI                  React                  Next.js 지원 버전 기준
  Language            TypeScript             strict mode
  Package Manager     npm                    프로젝트 기본 패키지 관리자
  Styling             CSS Modules            화면/컴포넌트 스타일 격리
  Conditional Class   classnames             조건부 class 조합
  Server State        TanStack React Query   API 데이터 조회/캐시/Mutation
  HTTP Client         Axios                  Backend API 통신
  Validation          Zod                    Runtime validation
  Form                React Hook Form        복잡한 입력 Form 관리
  Mock API            MSW                    Backend 미완성 단계 API Mock

정확한 패키지 버전은 프로젝트 초기 생성 시 `package.json`과 lock file로
고정한다. 문서에 임의의 최신 버전을 하드코딩하지 않는다.

------------------------------------------------------------------------

# 4. 이번 MVP에서 도입하지 않는 것

## Redux Toolkit --- 초기에는 사용하지 않음

PDS의 핵심 데이터 대부분은 서버 상태다.

``` text
Players
Classes
Sessions
Attendance
Observations
Skills
Media
Reports
```

따라서 서버 데이터는 React Query가 담당한다.

화면 내부의 임시 상태는 React `useState` 또는 Form 상태로 처리한다.

Redux는 다음과 같이 실제로 여러 화면에서 공유되는 복잡한 Client Global
State가 발생했을 때만 도입을 재검토한다.

``` text
복잡한 전역 Draft
다단계 Workflow의 장기 유지 상태
여러 Route에서 공유해야 하는 비서버 상태
```

단순히 "전역 상태가 필요할 수도 있다"는 이유로 선제 도입하지 않는다.

## Tailwind CSS --- 초기에는 사용하지 않음

기존 PDS Design System과 Hi-Fi Prototype의 스타일 구조를 명확하게
코드화하기 위해 CSS Modules + Design Token 방식을 기본으로 한다.

## UI Framework

MUI, Ant Design 등의 대형 UI Framework를 기본 의존성으로 사용하지
않는다.

PDS의 브랜드와 모바일 현장 UX를 우선하며 공통 UI Component를 직접
구성한다.

------------------------------------------------------------------------

# 5. Next.js 기본 전략

## 5.1 App Router

라우팅은 Next.js App Router를 사용한다.

``` text
src/app/
```

기반으로 Route를 구성한다.

## 5.2 Server Component / Client Component

기본 원칙:

> **Server Component를 기본값으로 두고, 브라우저 상호작용이 필요한
> 경계에서만 Client Component를 사용한다.**

Client Component가 필요한 대표 사례:

-   `useState`, `useEffect`
-   React Query hook
-   Form 입력
-   Modal / Bottom Sheet
-   Tab Interaction
-   Class Log 실시간 입력
-   Media 선택
-   Toast
-   브라우저 API 사용

단순 레이아웃이나 정적 표시 컴포넌트를 습관적으로 `"use client"`로
만들지 않는다.

단, 별도 Backend API와 인증 방식이 확정되기 전까지 Server Component에서
임의로 인증/데이터 fetching 방식을 고정하지 않는다.

------------------------------------------------------------------------

# 6. 권장 Frontend 폴더 구조

``` text
frontend/
│
├── public/
│   ├── images/
│   │   ├── brand/
│   │   ├── icons/
│   │   └── placeholders/
│   └── fonts/
│
├── src/
│   │
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   │
│   │   ├── players/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [playerId]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── classes/
│   │   │   ├── page.tsx
│   │   │   └── [classId]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── sessions/
│   │   │   └── [sessionId]/
│   │   │       └── log/
│   │   │           └── page.tsx
│   │   │
│   │   └── reports/
│   │       ├── page.tsx
│   │       └── [reportId]/
│   │           └── page.tsx
│   │
│   ├── api/
│   │   ├── client.ts
│   │   ├── players-api.ts
│   │   ├── classes-api.ts
│   │   ├── sessions-api.ts
│   │   ├── skills-api.ts
│   │   └── reports-api.ts
│   │
│   ├── hooks/
│   │   ├── players/
│   │   ├── classes/
│   │   ├── sessions/
│   │   ├── skills/
│   │   └── reports/
│   │
│   ├── ui/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── status-chip/
│   │   │   ├── modal/
│   │   │   ├── bottom-sheet/
│   │   │   ├── empty-state/
│   │   │   ├── loading/
│   │   │   └── form/
│   │   │
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   ├── players/
│   │   │   ├── classes/
│   │   │   ├── class-log/
│   │   │   ├── skill/
│   │   │   └── report/
│   │   │
│   │   └── layout/
│   │       ├── app-shell/
│   │       ├── desktop-sidebar/
│   │       ├── mobile-header/
│   │       └── bottom-navigation/
│   │
│   ├── shared/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── types/
│   │   ├── schemas/
│   │   └── utils/
│   │
│   ├── providers/
│   │   └── query-provider.tsx
│   │
│   ├── mocks/
│   │   ├── browser.ts
│   │   ├── handlers/
│   │   └── data/
│   │
│   └── styles/
│       ├── globals.css
│       ├── tokens.css
│       └── reset.css
│
├── .env.local
├── .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

------------------------------------------------------------------------

# 7. 폴더별 책임

## `src/app`

Route와 Page 진입점만 담당한다.

Page 파일에 대량의 UI, API 호출, 비즈니스 로직을 몰아넣지 않는다.

## `src/ui/components`

도메인에 종속되지 않는 재사용 UI.

예:

``` text
Button
Card
StatusChip
Modal
BottomSheet
Textarea
EmptyState
Skeleton
```

## `src/ui/features`

PDS 도메인과 연결된 화면 단위 UI.

예:

``` text
PlayerCard
CurrentGoalCard
TodayClassCard
ObservationForm
SkillSummary
SkillLadder
ReportEditor
```

## `src/api`

HTTP 요청 함수.

UI를 포함하지 않는다.

React hook을 포함하지 않는다.

## `src/hooks`

React Query와 화면에서 사용할 비즈니스 동작을 연결한다.

API 호출 세부 구현을 Screen/Feature가 직접 알지 않도록 한다.

## `src/shared`

도메인 공통 Type, Schema, Constant, Utility.

## `src/mocks`

Backend API가 준비되기 전 실제 API와 동일한 계약을 흉내 낸다.

Prototype의 임의 Mock Data와 실제 Frontend Mock API를 구분한다.

------------------------------------------------------------------------

# 8. 의존 방향

가능한 의존 방향은 아래와 같다.

``` text
app
 ↓
ui/features
 ↓
hooks
 ↓
api

ui/features
 ↓
ui/components

hooks
 ↓
shared

api
 ↓
shared
```

금지:

``` text
api → ui
api → hooks

shared → ui
shared → app

ui/components → 특정 screen
```

하위 계층이 상위 화면을 import하지 않는다.

------------------------------------------------------------------------

# 9. Route 기본안

MVP Route는 아래를 기준으로 시작한다.

``` text
/dashboard

/players
/players/new
/players/[playerId]

/classes
/classes/[classId]

/sessions/[sessionId]/log

/reports
/reports/[reportId]
```

Skill Ladder는 MVP에서 독립 최상위 메뉴가 아니다.

기본 진입점:

``` text
/players/[playerId]
```

내 Skill 영역 또는 필요 시 하위 Route로 확장한다.

화면 기능정의서 작성 단계에서 최종 URL은 조정할 수 있다.

------------------------------------------------------------------------

# 10. 상태 관리 기준

PDS는 상태를 세 종류로 구분한다.

  -----------------------------------------------------------------------
  상태                    도구                    예
  ----------------------- ----------------------- -----------------------
  Server State            React Query             Players, Sessions,
                                                  Observations, Reports

  Local UI State          useState / useReducer   Modal, Tab, 선택 상태

  Form State              React Hook Form         선수 등록, Observation
                                                  입력, Report 편집
  -----------------------------------------------------------------------

## Server State를 `useState`로 복제하지 않는다

잘못된 예:

``` text
React Query로 Players 조회
→ 다시 useState(players)에 복사
→ 별도 상태로 관리
```

특별한 이유가 없다면 React Query Cache를 Source of Truth로 사용한다.

------------------------------------------------------------------------

# 11. React Query 기준

Query Key는 도메인별 factory 패턴을 사용한다.

예시:

``` text
playerKeys.all
playerKeys.list(filters)
playerKeys.detail(playerId)

classKeys.all
classKeys.detail(classId)

sessionKeys.detail(sessionId)
sessionKeys.observations(sessionId)

reportKeys.month(yearMonth)
reportKeys.detail(reportId)
```

Mutation 성공 후 무조건 전체 Cache를 날리지 않는다.

변경된 데이터 범위를 기준으로 정확한 query invalidation 또는 cache
update를 수행한다.

Optimistic Update는 UX 이점이 분명하고 rollback이 안전한 기능에만
적용한다.

Skill 변경, Report 승인처럼 서버 Transaction 결과가 중요한 기능은 서버
응답 성공 후 상태를 갱신하는 것을 기본으로 한다.

------------------------------------------------------------------------

# 12. API Layer

모든 Backend 통신은 공통 Axios Client를 통과한다.

``` text
src/api/client.ts
```

역할:

-   base URL
-   공통 Header
-   인증 정보 전달
-   공통 timeout
-   응답 Error 정규화

화면에서 직접 다음 코드를 작성하지 않는다.

``` ts
axios.get(...)
fetch("https://...")
```

대신:

``` text
Screen / Feature
→ Hook
→ Domain API
→ Axios Client
→ Backend
```

형태를 따른다.

------------------------------------------------------------------------

# 13. API 계약 원칙

Frontend는 Backend의 내부 DB 구조를 그대로 UI 타입으로 사용하지 않는다.

필요하면 다음을 구분한다.

``` text
API DTO
UI View Model
Form Data
Domain Type
```

Backend 응답을 신뢰해서 임의의 필드를 가정하지 않는다.

중요 API 응답 또는 외부 입력은 Zod 검증을 적용한다.

API endpoint와 DTO는 화면 기능정의서 또는 별도 API 명세가 확정되기 전
임의로 최종 확정하지 않는다.

------------------------------------------------------------------------

# 14. Form / Validation

Form이 단순하지 않은 경우 React Hook Form + Zod를 기본 조합으로
사용한다.

Validation은 두 단계로 생각한다.

``` text
Frontend
→ 빠른 사용자 피드백

Backend
→ 최종 데이터 무결성 보장
```

Frontend Validation만으로 데이터 무결성을 보장한다고 가정하지 않는다.

대표 규칙:

``` text
successes <= attempts
필수 Observation 누락
Report 승인 필수 항목
Player 등록 필수 정보
```

최종 검증 책임은 Backend에 있다.

------------------------------------------------------------------------

# 15. PDS 핵심 데이터 무결성 규칙

Frontend 구현에서도 아래 규칙을 훼손하지 않는다.

1.  Player당 대표 Active Goal은 최대 1개다.
2.  과거 Goal은 삭제하거나 덮어쓰지 않는다.
3.  Class와 Class Session을 동일 개념으로 취급하지 않는다.
4.  현재 Class 구성 변경이 과거 Session 기록을 바꾸면 안 된다.
5.  Session Attendance는 실제 Session 기준이다.
6.  Observation은 Session + Player에 여러 개 존재할 수 있다.
7.  `successes > attempts` 상태를 허용하지 않는다.
8.  Class Log가 Skill Level을 자동 변경하면 안 된다.
9.  Skill 변경은 코치의 명시적 승인 동작이다.
10. Skill 변경 이력은 덮어쓰지 않는다.
11. `미평가`와 Level 1은 다른 상태다.
12. Approved Monthly Report는 승인 시점 Snapshot을 보존한다.
13. Draft Report를 완료 Report로 계산하지 않는다.
14. Media가 없어도 Report 작성/승인이 가능하다.
15. AI는 존재하지 않는 Observation, 횟수, 날짜, 성장 사실을 만들어서는
    안 된다.
16. Next Goal 적용 시 이전 Goal History를 보존한다.
17. 복수 DB 변경이 필요한 작업은 Backend Transaction으로 처리한다.

------------------------------------------------------------------------

# 16. Class Log 특별 원칙

Class Log는 PDS에서 가장 빈번하게 사용되는 현장 입력 화면이다.

목표:

> **선수 1명 기록을 약 30초 안에 완료할 수 있어야 한다.**

Frontend 구현 시 우선순위:

1.  현재 선수 Context
2.  Current Goal
3.  Skill 선택
4.  Observation
5.  Quick Phrase
6.  Optional Attempts / Successes
7.  Optional Media
8.  Save & Next

기록 중 페이지 이탈이나 새로고침으로 입력 내용이 쉽게 사라지지 않도록
Draft 보호 전략을 화면 기능정의서에서 별도로 정의한다.

Media 업로드 실패가 Observation 텍스트 저장까지 무효화하는 구조를 만들지
않는다.

------------------------------------------------------------------------

# 17. Monthly Report 특별 원칙

Monthly Report는 코치용 Editor와 부모용 Output의 성격이 다르다.

AI의 역할:

``` text
Evidence
→ Draft 생성
→ Coach Edit
→ Coach Approval
```

AI는 승인 권한을 갖지 않는다.

Before / After는 실제 비교 가능한 Media가 존재할 때만 표시한다.

승인 이후 Report는 Snapshot으로 취급한다.

수정이 필요하면:

``` text
Approved
→ Revision
→ Re-approve
```

흐름을 고려한다.

------------------------------------------------------------------------

# 18. Design System 적용

PDS UI는 기존 Design System을 Source of Truth로 사용한다.

CSS 값의 반복 하드코딩을 피하기 위해 `tokens.css`에 Design Token을
정의한다.

예:

``` css
:root {
  --color-brand-navy-900: #071e3a;
  --color-brand-navy-800: #0b2a4a;
  --color-brand-navy-700: #123b63;

  --color-brand-blue-600: #1546f5;
  --color-brand-blue-500: #2d5bff;
  --color-brand-blue-100: #e8eeff;

  --color-brand-orange-500: #ff7a1a;

  --color-gray-950: #111827;
  --color-gray-600: #4b5563;
  --color-gray-200: #e5e7eb;
  --color-gray-50: #f8fafc;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

실제 전체 Token 목록은 `DESIGN_SYSTEM.md`를 기준으로 구현한다.

------------------------------------------------------------------------

# 19. CSS 규칙

기본:

``` text
Global reset / token
        +
CSS Modules
        +
classnames
```

## 금지

-   대규모 inline style 남용
-   페이지마다 동일 색상 HEX 반복
-   임의의 radius 추가
-   임의의 shadow 추가
-   Design System에 없는 색상을 이유 없이 추가
-   `!important` 남용
-   전역 class 충돌

## 파일 예

``` text
player-card.tsx
player-card.module.css
```

------------------------------------------------------------------------

# 20. Responsive 기준

PDS는 Mobile First다.

기준:

``` text
Mobile: 360–390px 우선
Tablet: 768px+
Desktop: 1024px+
```

Desktop은 단순히 Mobile UI를 넓게 늘리는 방식으로 만들지 않는다.

### Mobile

-   Bottom Navigation
-   한 손 조작
-   Sticky Action
-   44px 이상 Touch Target
-   주요 Button/Input 약 48px
-   가로 스크롤 최소화

### Desktop

-   Sidebar
-   넓어진 정보 밀도 활용
-   적절한 multi-column
-   Mobile 핵심 행동 순서는 유지

------------------------------------------------------------------------

# 21. Accessibility

최소 기준:

-   실제 `button`, `input`, `label`, `nav` 등 semantic element 사용
-   클릭 가능한 `div` 남용 금지
-   Keyboard focus 확인
-   Focus visible 제공
-   색상만으로 상태 전달 금지
-   Icon-only Button에 accessible label 제공
-   Form error와 field 연결
-   이미지 `alt` 제공
-   충분한 Touch Target 확보

------------------------------------------------------------------------

# 22. UI 상태는 기능의 일부다

각 주요 화면은 정상 데이터 화면만 구현하고 끝내지 않는다.

화면 기능정의서에서 필요한 상태를 정의한다.

``` text
Loading
Empty
Error
Success
Disabled
Submitting
Offline/Network Error (필요 시)
Permission Denied (필요 시)
```

예:

``` text
Players 없음
오늘 수업 없음
미작성 기록 없음
Monthly Report 대상 없음
Observation 없음
Media 없음
Skill 미평가
```

Empty State는 오류와 구분한다.

------------------------------------------------------------------------

# 23. Mock 개발 전략

Backend가 완성되기 전 MSW를 사용한다.

목표는 "예쁜 더미 화면"이 아니라 **실제 API 계약을 미리 검증하는
것**이다.

``` text
Feature
→ React Query Hook
→ API Function
→ Axios
→ MSW
```

Backend가 연결된 뒤에는 MSW만 제거/비활성화하고 화면 구조를 다시
작성하지 않는 것을 목표로 한다.

Mock 응답에는 가능하면 다음 케이스를 준비한다.

``` text
Normal
Empty
Loading delay
400
401
403
404
409
500
```

------------------------------------------------------------------------

# 24. Prototype 사용 규칙

현재 HTML Hi-Fi Prototype은 **UI Reference**다.

``` text
prototype/
```

의 HTML/CSS/JS는 Production Source가 아니다.

AI 또는 개발자는 Prototype을 참고해 Next.js Component로 다시 구현한다.

### Prototype에서 가져와도 되는 것

-   Layout
-   정보 우선순위
-   색상/간격의 시각적 참고
-   Interaction 의도
-   모바일/데스크톱 배치

### 그대로 복사하지 않을 것

-   Inline JavaScript
-   Hash Router
-   Mock Data 구조
-   DOM 직접 조작
-   임시 Modal 코드
-   임시 Toast 코드
-   Prototype 전용 CSS 구조

------------------------------------------------------------------------

# 25. 이미지 / Asset

Brand Asset은 `public/images/brand/`에 저장한다.

예:

``` text
public/images/brand/tbp-mark.png
public/images/brand/tbp-wordmark.svg
```

Base64 Image를 Source Code 안에 직접 삽입하지 않는다.

가능하면 Next.js `Image` Component를 사용한다.

사용자가 제공한 원본 PNG/SVG Asset을 임의로 재생성하거나 변형하지
않는다.

------------------------------------------------------------------------

# 26. 환경변수

환경변수는 `.env.local`에 저장한다.

Repository에는 `.env.example`만 포함한다.

예:

``` text
NEXT_PUBLIC_API_BASE_URL=
```

Secret은 `NEXT_PUBLIC_` 환경변수에 넣지 않는다.

AI API Key, DB Password, Storage Secret 등은 Frontend Repository에
저장하지 않는다.

------------------------------------------------------------------------

# 27. TypeScript 규칙

`strict`를 유지한다.

금지:

``` text
any 남용
@ts-ignore로 오류 숨기기
타입 오류를 해결하지 않고 build 통과시키기
API 응답을 무조건 type assertion으로 강제
```

타입은 가능하면 API/Domain 기준으로 재사용하되 거대한 전역 타입 파일
하나에 모든 타입을 몰아넣지 않는다.

Type-only import가 필요한 경우 `import type`을 사용한다.

------------------------------------------------------------------------

# 28. Naming

파일명은 `kebab-case`를 기본으로 한다.

``` text
player-card.tsx
player-card.module.css
use-player-detail.ts
players-api.ts
monthly-report-schema.ts
```

React Component:

``` text
PascalCase
PlayerCard
CurrentGoalCard
```

Hook:

``` text
use + PascalCase 의미
usePlayerDetail
useCreateObservation
```

Event Handler:

``` text
handle + Action
handleSave
handleSelectSkill
handleApproveReport
```

Boolean:

``` text
isLoading
isSubmitting
isActive
hasObservation
canApprove
```

------------------------------------------------------------------------

# 29. Component 설계 원칙

컴포넌트를 무조건 잘게 쪼개지 않는다.

다음 중 하나 이상에 해당하면 분리를 고려한다.

1.  두 곳 이상 재사용
2.  독립적인 UI 책임
3.  독립적인 Interaction
4.  테스트할 가치가 있는 로직
5.  Screen이 지나치게 커짐

잘못된 극단:

``` text
모든 div를 Component화
```

또는

``` text
1,000줄짜리 Screen 하나
```

둘 다 피한다.

------------------------------------------------------------------------

# 30. 공통 Component 우선순위

화면 개발 전에 최소 공통 UI를 먼저 구현한다.

P0:

``` text
Button
IconButton
Card
StatusChip
Input
Textarea
Select / Filter
Modal
BottomSheet
Tabs
EmptyState
Skeleton
Toast
```

Layout:

``` text
AppShell
DesktopSidebar
MobileHeader
BottomNavigation
PageHeader
StickyActionBar
```

기존 Component가 있으면 새 Component를 만들기 전에 재사용 가능성을 먼저
검토한다.

------------------------------------------------------------------------

# 31. Error Handling

API Error를 사용자에게 그대로 노출하지 않는다.

``` text
Network / HTTP Error
→ Frontend Error normalization
→ UI message
```

사용자가 다음 행동을 이해할 수 있는 메시지를 제공한다.

예:

``` text
저장에 실패했습니다. 다시 시도해 주세요.
이미 종료된 수업입니다.
존재하지 않는 선수입니다.
승인된 리포트가 변경되었습니다. 새로고침 후 다시 확인해 주세요.
```

에러를 `console.error`만 하고 사용자 피드백 없이 끝내지 않는다.

------------------------------------------------------------------------

# 32. 테스트 전략

MVP부터 모든 것을 E2E로 만들 필요는 없지만 핵심 Growth Loop는 테스트
대상이다.

## Unit

-   Utility
-   Zod Schema
-   계산/변환 로직

## Component

-   Form validation
-   Button state
-   Empty/Error state
-   주요 interaction

## E2E 우선 시나리오

``` text
Player 등록
→ Class 배정
→ Session 시작
→ Attendance
→ Observation 저장
→ Skill 변경 승인
→ Monthly Report Draft
→ Report 승인
→ Next Goal
```

특히 History/Transaction과 연결되는 사용자 흐름을 우선한다.

------------------------------------------------------------------------

# 33. 개발 품질 Gate

작업 완료 기준은 "브라우저에서 보인다"가 아니다.

최소 다음을 통과해야 한다.

``` text
lint
typecheck
build
```

테스트가 존재하는 기능은 관련 test도 통과해야 한다.

package script 이름은 초기 프로젝트 세팅 시 아래 형태로 맞춘다.

``` json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

실제 Next.js 초기 설정에 따라 세부 명령은 조정할 수 있지만 `lint`,
`typecheck`, `build` 검증 단계 자체는 유지한다.

------------------------------------------------------------------------

# 34. Git 기본 전략

Git 세부 Workflow는 README에서 최종 정의한다.

기본 원칙:

``` text
main
 └── feature/*
```

AI Agent는 `main`에서 직접 대규모 기능 작업을 하지 않는다.

예:

``` text
feature/dashboard
feature/players
feature/class-log
feature/monthly-report
```

Commit은 한 작업 단위가 이해 가능하도록 유지한다.

------------------------------------------------------------------------

# 35. 화면 개발 순서

Frontend 구현 권장 순서:

``` text
0. Project Foundation
   - Next.js
   - TypeScript
   - CSS Modules
   - tokens
   - Query Provider
   - Axios Client
   - MSW
   - App Shell

1. Dashboard

2. Players

3. Player Detail

4. Classes

5. Class Detail

6. Class Log

7. Skill Ladder

8. Monthly Report
```

Class Log와 Monthly Report는 PDS 핵심 기능이므로 단순 UI
마이그레이션으로 끝내지 않고 기능정의서를 기준으로 구현한다.

------------------------------------------------------------------------

# 36. 화면 개발 Workflow

각 화면은 다음 절차를 따른다.

``` text
[1]
화면 기능정의서 확정

        ↓

[2]
AI가 지정된 문서만 읽기

        ↓

[3]
AI가 작업 명세서 작성

        ↓

[4]
사람이 작업 명세 검토

        ↓

[5]
AI Plan 작성

        ↓

[6]
Plan 승인

        ↓

[7]
구현

        ↓

[8]
lint / typecheck / build

        ↓

[9]
UI / Functional QA

        ↓

[10]
Commit / PR
```

AI가 기능정의서를 읽자마자 즉시 코드를 수정하는 방식은 기본 Workflow로
사용하지 않는다.

------------------------------------------------------------------------

# 37. AI Agent가 화면 작업 전에 확인할 문서

최종 경로는 Repository 세팅 후 확정하되 다음 구조를 권장한다.

``` text
/docs/core/REQUIREMENTS.md
/docs/core/USER_FLOW.md
/docs/core/ERD.md
/docs/core/DESIGN_SYSTEM.md

/docs/frontend/FRONTEND_GUIDE.md
/docs/frontend/AI_RULES.md

/docs/screens/{현재 작업 화면}.md

/prototype/
```

중요:

AI Agent가 매 작업마다 `docs/` 전체를 무작정 읽지 않도록 한다.

`AI_RULES.md`에서 작업별로 허용된 문서만 읽도록 제한한다.

------------------------------------------------------------------------

# 38. PDS Frontend Definition of Done

Frontend 기능은 아래 조건을 만족해야 완료로 본다.

``` text
[ ] 기능정의서 요구사항을 충족한다.
[ ] Prototype의 정보 구조와 Design System을 준수한다.
[ ] Mobile 360–390px에서 주요 기능이 정상 동작한다.
[ ] Desktop 1024px+ Layout이 정상이다.
[ ] Touch target이 충분하다.
[ ] Loading 상태가 있다.
[ ] Empty 상태가 필요한 경우 구현되어 있다.
[ ] Error 상태가 있다.
[ ] Form validation이 동작한다.
[ ] API 호출이 api/hook 계층을 통한다.
[ ] Frontend가 DB에 직접 접근하지 않는다.
[ ] History를 덮어쓰는 Client Logic이 없다.
[ ] Skill 자동 승급 로직이 없다.
[ ] 승인/복합 변경은 Backend API 결과를 기준으로 한다.
[ ] TypeScript 오류가 없다.
[ ] ESLint 오류가 없다.
[ ] Production build가 성공한다.
[ ] 핵심 Interaction을 직접 확인했다.
```

------------------------------------------------------------------------

# 39. STEP 1 확정안 요약

PDS Frontend는 아래 구조를 기준으로 개발한다.

``` text
Next.js App Router
+ React
+ TypeScript
+ CSS Modules
+ classnames
+ TanStack React Query
+ Axios
+ Zod
+ React Hook Form
+ MSW
```

상태 관리:

``` text
Server State → React Query
Form State   → React Hook Form
Local UI     → React useState/useReducer
Global Client State → 필요성이 확인될 때만 별도 도구 검토
```

Architecture:

``` text
Frontend
→ Backend API
→ PostgreSQL
```

Frontend는 Database, Transaction, AI Secret에 직접 접근하지 않는다.

UI:

``` text
Mobile First
Design System 기반
Prototype은 Reference
Production UI는 Next.js Component로 재구현
```

개발:

``` text
기능정의서
→ AI 작업 명세
→ Plan
→ 구현
→ lint/typecheck/build
→ QA
```

------------------------------------------------------------------------

# 40. 다음 문서

STEP 1 이후 다음 순서로 진행한다.

``` text
STEP 2
README.md

STEP 3
AI_RULES.md

STEP 4
Frontend Project Initial Setup

STEP 5
Design System / Common Components

STEP 6+
각 화면 기능정의서 → 작업명세 → 구현
```

------------------------------------------------------------------------

**Document Version:** v0.1\
**Product:** TBP Player Development System\
**Document:** Frontend Development Guide\
**Status:** Initial Architecture Baseline
