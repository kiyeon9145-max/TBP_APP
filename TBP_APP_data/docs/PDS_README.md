# TBP PDS Frontend

TBP **Player Development System(PDS)** 프론트엔드 프로젝트입니다.

PDS는 단순 회원 관리 도구가 아니라, 코치가 선수의 목표와 수업 중 관찰
기록을 연결하고 성장 이력을 관리하여 월간 리포트와 다음 목표까지 이어갈
수 있도록 설계된 **선수 성장 기록 시스템**입니다.

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

> 이 README는 프로젝트를 처음 실행하는 개발자와 AI Agent가 프로젝트
> 구조, 설치 방법, 개발 흐름, 문서 위치를 빠르게 파악하기 위한 시작
> 문서입니다.

------------------------------------------------------------------------

## 1. 프로젝트 개요

-   Product: TBP Player Development System
-   Project: PDS Frontend
-   Primary User: Coach
-   Secondary Output User: Parent
-   Development Direction: Mobile First
-   Architecture: Frontend / Backend / PostgreSQL 분리
-   Core Principles:
    -   Evidence Based
    -   History First
    -   Coach Approved
    -   Backend Transaction
    -   Soft Delete / History Preservation

PDS의 주요 화면은 다음과 같습니다.

``` text
Dashboard
Players
Player Detail
Classes
Class Detail
Class Log
Skill Ladder
Monthly Report
```

------------------------------------------------------------------------

## 2. 시스템 아키텍처

``` text
┌─────────────────────────────┐
│        PDS Frontend         │
│                             │
│ Next.js / React             │
│ TypeScript                  │
│ UI / Form / Mobile UX       │
└──────────────┬──────────────┘
               │
               │ HTTP / API
               ▼
┌─────────────────────────────┐
│         PDS Backend         │
│                             │
│ Authentication              │
│ Authorization               │
│ Validation                  │
│ Business Logic              │
│ Transactions                │
│ AI Integration              │
│ Media / Report Export       │
└──────────────┬──────────────┘
               │
               │ ORM / SQL
               ▼
┌─────────────────────────────┐
│         PostgreSQL          │
│                             │
│ Player / Goal               │
│ Class / Session             │
│ Attendance / Observation    │
│ Skill History / Media       │
│ Monthly Report              │
└─────────────────────────────┘
```

### Frontend 책임

-   화면 렌더링
-   사용자 입력
-   모바일 / 데스크톱 UX
-   Backend API 요청
-   Client UI State
-   Form State
-   Server State Cache
-   Report Preview

### Frontend에서 하지 않는 것

-   PostgreSQL 직접 접근
-   Skill History 직접 INSERT
-   Goal 교체 Transaction
-   Monthly Report 승인 Transaction
-   AI Secret Key 직접 호출
-   Backend 권한 검증 대체
-   Storage Secret 사용

서버 데이터 변경은 Backend API를 통해 수행합니다.

------------------------------------------------------------------------

## 3. Frontend 기술 스택

  영역                기술
  ------------------- ----------------------
  Framework           Next.js App Router
  UI                  React
  Language            TypeScript
  Package Manager     npm
  Styling             CSS Modules
  Conditional Class   classnames
  Server State        TanStack React Query
  HTTP Client         Axios
  Form                React Hook Form
  Validation          Zod
  Mock API            MSW

### 상태 관리 원칙

``` text
Server State
→ TanStack React Query

Form State
→ React Hook Form

Local UI State
→ useState / useReducer

Global Client State
→ 실제 필요성이 확인될 때 별도 도구 도입 검토
```

Redux Toolkit은 MVP 초기 기본 의존성으로 사용하지 않습니다.

------------------------------------------------------------------------

## 4. 권장 전체 Repository 구조

PDS 프로젝트 루트는 다음 구조를 권장합니다.

``` text
tbp-pds/
│
├── frontend/
│   └── 실제 Next.js 프론트엔드 프로젝트
│
├── backend/
│   └── Backend 프로젝트
│       # Backend 개발 시작 시 구성
│
├── docs/
│   │
│   ├── core/
│   │   ├── REQUIREMENTS.md
│   │   ├── USER_FLOW.md
│   │   ├── ERD.md
│   │   └── DESIGN_SYSTEM.md
│   │
│   ├── frontend/
│   │   ├── FRONTEND_GUIDE.md
│   │   └── AI_RULES.md
│   │
│   ├── screens/
│   │   ├── 01-dashboard.md
│   │   ├── 02-players.md
│   │   ├── 03-player-detail.md
│   │   ├── 04-classes.md
│   │   ├── 05-class-detail.md
│   │   ├── 06-class-log.md
│   │   ├── 07-skill-ladder.md
│   │   └── 08-monthly-report.md
│   │
│   └── wireframes/
│       └── 설계 단계 HTML Wireframe
│
├── prototype/
│   └── 통합 Hi-Fi Prototype
│
├── README.md
└── .gitignore
```

> 실제 Repository를 Frontend / Backend / Docs로 분리 운영하게 될
> 경우에도 문서의 역할과 책임은 동일하게 유지합니다. Repository 구조
> 변경 시 README와 AI_RULES를 함께 갱신합니다.

------------------------------------------------------------------------

## 5. Frontend 내부 구조

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
│   ├── app/
│   ├── api/
│   ├── hooks/
│   ├── ui/
│   │   ├── components/
│   │   ├── features/
│   │   └── layout/
│   ├── shared/
│   ├── providers/
│   ├── mocks/
│   └── styles/
│
├── .env.local
├── .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

세부 책임과 의존 방향은 `docs/frontend/FRONTEND_GUIDE.md`를 기준으로
합니다.

------------------------------------------------------------------------

## 6. 개발 환경 요구사항

프로젝트 초기 세팅 완료 후 정확한 버전은 아래 파일을 기준으로
확인합니다.

``` text
package.json
package-lock.json
```

필수 도구:

``` text
Node.js
npm
Git
```

Node.js 버전을 고정할 경우 `.nvmrc` 또는 `package.json`의 `engines`를
Source of Truth로 사용합니다.

README에 적힌 버전보다 실제 Repository 설정 파일을 우선합니다.

------------------------------------------------------------------------

## 7. Repository Clone

GitHub Repository URL이 확정된 후 아래 명령의 `<REPOSITORY_URL>`을 실제
주소로 변경합니다.

``` bash
git clone <REPOSITORY_URL>
cd tbp-pds
```

Frontend가 별도 Repository인 경우:

``` bash
git clone <FRONTEND_REPOSITORY_URL>
cd <FRONTEND_REPOSITORY_NAME>
```

> 실제 GitHub URL은 추측하여 문서에 작성하지 않습니다.

------------------------------------------------------------------------

## 8. Frontend 설치

Frontend 프로젝트 폴더로 이동합니다.

``` bash
cd frontend
```

패키지를 설치합니다.

``` bash
npm install
```

개발 서버를 실행합니다.

``` bash
npm run dev
```

브라우저에서 Next.js 개발 서버 주소를 확인합니다.

기본 설정이라면 일반적으로:

``` text
http://localhost:3000
```

을 사용하지만, 실제 터미널에 출력되는 주소를 우선합니다.

------------------------------------------------------------------------

## 9. 환경변수 설정

Repository에는 실제 Secret을 저장하지 않습니다.

개발자는 `.env.example`을 기준으로 `.env.local`을 생성합니다.

예:

``` bash
cp .env.example .env.local
```

초기 Frontend 환경변수 예시:

``` env
NEXT_PUBLIC_API_BASE_URL=
```

### 환경변수 규칙

Frontend에 저장하면 안 되는 값:

``` text
Database Password
AI API Secret Key
Storage Secret
Backend Private Key
Service Account Secret
```

`NEXT_PUBLIC_`이 붙은 환경변수는 Browser에 노출될 수 있다는 전제로
사용합니다.

------------------------------------------------------------------------

## 10. 주요 개발 명령어

프로젝트 초기 세팅 후 다음 명령을 기본 품질 Gate로 사용합니다.

``` bash
npm run dev
```

개발 서버 실행.

``` bash
npm run lint
```

ESLint 검사.

``` bash
npm run typecheck
```

TypeScript 검사.

``` bash
npm run build
```

Production Build 검사.

테스트 Script가 추가된 이후에는 해당 테스트도 작업 완료 기준에
포함합니다.

------------------------------------------------------------------------

## 11. 문서 구조

PDS 개발은 코드보다 문서의 책임을 먼저 명확히 합니다.

### Core Documents

``` text
docs/core/REQUIREMENTS.md
docs/core/USER_FLOW.md
docs/core/ERD.md
docs/core/DESIGN_SYSTEM.md
```

프로덕트 요구사항, 사용자 흐름, 데이터 구조, 디자인 기준을 정의합니다.

### Frontend Documents

``` text
docs/frontend/FRONTEND_GUIDE.md
docs/frontend/AI_RULES.md
```

`FRONTEND_GUIDE.md`

-   기술 스택
-   Frontend Architecture
-   폴더 구조
-   상태 관리
-   API Layer
-   Form / Validation
-   CSS
-   Responsive
-   Testing
-   Definition of Done

`AI_RULES.md`

-   AI Agent가 반드시 읽어야 하는 문서
-   AI가 읽어도 되는 문서 범위
-   작업 전 Plan 규칙
-   수정 금지 영역
-   Git 작업 규칙
-   검증 절차
-   PDS 절대 규칙

### Screen Documents

``` text
docs/screens/
```

각 화면의 기능정의서와 Acceptance Criteria를 관리합니다.

### Wireframes

``` text
docs/wireframes/
```

Low-Fidelity 설계 참고 자료입니다.

### Prototype

``` text
prototype/
```

통합 Hi-Fi UI Reference입니다.

Prototype은 Production Source Code가 아닙니다.

------------------------------------------------------------------------

## 12. 문서 우선순위

문서 간 내용이 충돌할 경우 임의로 판단하지 않습니다.

기본적으로 다음 역할을 기준으로 확인합니다.

``` text
제품 요구사항
→ REQUIREMENTS

사용자 흐름
→ USER_FLOW

DB / 데이터 무결성
→ ERD

UI 디자인
→ DESIGN_SYSTEM

Frontend 기술 구현
→ FRONTEND_GUIDE

AI 작업 행동
→ AI_RULES

화면 세부 기능
→ 해당 Screen 기능정의서

시각적 참고
→ Wireframe / Prototype
```

충돌이 해결되지 않는 경우 개발자가 임의의 새로운 정책을 만들지 않고 확인
후 문서를 먼저 수정합니다.

------------------------------------------------------------------------

## 13. AI Agent 작업 시작 방법

AI Agent에게 바로 코드를 작성시키지 않습니다.

기본 작업 순서는 다음과 같습니다.

``` text
1. AI_RULES 읽기
2. AI_RULES가 지정한 공통 문서 읽기
3. 현재 작업 화면의 기능정의서 읽기
4. 필요한 Prototype / Wireframe 확인
5. 기존 코드 구조 확인
6. 작업 명세 작성
7. 사람 검토
8. 구현 Plan 작성
9. 사람 검토
10. 코드 구현
11. lint
12. typecheck
13. build
14. 기능 QA
15. Commit / PR
```

### AI에게 전달할 기본 시작 Prompt 예시

``` text
docs/frontend/AI_RULES.md 파일을 먼저 정독해줘.

AI_RULES에서 이번 작업에 읽도록 지정한 문서만 추가로 확인하고,
아직 코드를 수정하지 마.

이번 작업은 [화면명] 프론트엔드 구현이야.

먼저 관련 기능정의서와 현재 프로젝트 구조를 분석해서
구현 범위, 재사용할 기존 컴포넌트, 새로 필요한 컴포넌트,
API/상태 처리, 예외 상태, 예상 수정 파일을 포함한
작업 명세서를 작성해줘.
```

AI_RULES 작성 이후 이 Prompt도 최종 규칙에 맞게 갱신합니다.

------------------------------------------------------------------------

## 14. Prototype 사용 원칙

기존 Hi-Fi Prototype은 다음 항목을 참고하기 위한 자료입니다.

-   정보 구조
-   Layout
-   시각적 우선순위
-   모바일 / 데스크톱 배치
-   Interaction 의도
-   PDS Design System 적용 예시

다음 코드는 그대로 Production으로 복사하지 않습니다.

``` text
Hash Router
DOM 직접 조작
Inline JavaScript
Prototype Mock Data
Prototype Modal
Prototype Toast
Prototype 전용 CSS 구조
```

Next.js / React 구조에 맞게 다시 구현합니다.

------------------------------------------------------------------------

## 15. Brand Asset

TBP Brand Asset은 다음 위치에서 관리합니다.

``` text
frontend/public/images/brand/
```

예:

``` text
tbp-mark.png
tbp-wordmark.svg
```

### Asset 규칙

-   Base64 이미지를 Production HTML/TSX에 직접 삽입하지 않습니다.
-   사용자가 제공한 원본 Brand Asset을 임의로 재생성하지 않습니다.
-   PNG 사용이 더 안정적인 Asset은 SVG를 억지로 사용하지 않습니다.
-   적절한 경우 Next.js `Image`를 사용합니다.
-   원본 Asset의 비율을 임의로 왜곡하지 않습니다.

------------------------------------------------------------------------

## 16. Design System

PDS UI는 `docs/core/DESIGN_SYSTEM.md`를 Source of Truth로 사용합니다.

핵심 방향:

``` text
Professional Sports Tool
+
Youth Development
+
Evidence-Based Coaching
```

주요 Brand Color:

``` text
Navy
Blue
Orange Accent
White / Neutral Gray
```

Design Token은 Frontend에서 다음 파일로 코드화합니다.

``` text
src/styles/tokens.css
```

페이지마다 임의의 색상, Radius, Shadow를 추가하기보다 기존 Token과
Component를 먼저 사용합니다.

------------------------------------------------------------------------

## 17. Responsive 원칙

PDS는 Mobile First입니다.

``` text
Mobile
360–390px 우선

Tablet
768px+

Desktop
1024px+
```

Mobile:

-   Bottom Navigation
-   한 손 조작
-   Sticky Action
-   최소 44px Touch Target
-   주요 Button / Input 약 48px

Desktop:

-   Sidebar
-   넓은 화면의 정보 밀도 활용
-   핵심 행동 순서는 Mobile과 일관되게 유지

------------------------------------------------------------------------

## 18. PDS 핵심 데이터 규칙

Frontend 작업자는 다음 규칙을 변경하거나 우회해서는 안 됩니다.

``` text
1. Player당 Active Goal은 최대 1개
2. Goal History 보존
3. Class와 Class Session 구분
4. 과거 Session Snapshot/History 보존
5. Attendance는 Session 기준
6. Player/Session에 Observation 여러 개 가능
7. successes > attempts 금지
8. Class Log에서 Skill 자동 변경 금지
9. Skill 변경은 Coach 승인
10. Skill History overwrite 금지
11. 미평가와 Level 1 구분
12. Approved Report Snapshot 보존
13. Draft Report는 완료가 아님
14. Media 없이 Report 작성 가능
15. AI는 없는 Evidence를 생성하지 않음
16. Next Goal 적용 시 이전 Goal History 보존
17. 복합 데이터 변경은 Backend Transaction
18. Frontend는 DB를 직접 수정하지 않음
```

세부 데이터 구조는 `docs/core/ERD.md`를 기준으로 합니다.

------------------------------------------------------------------------

## 19. Git Workflow

정확한 팀 운영 방식은 Repository 세팅과 AI_RULES에서 최종 확정합니다.

초기 기본안:

``` text
main
 ├── feature/dashboard
 ├── feature/players
 ├── feature/class-log
 └── feature/monthly-report
```

### 작업 시작

``` bash
git checkout main
git pull origin main
git checkout <작업 브랜치>
git merge main
```

새 기능 브랜치를 만드는 경우:

``` bash
git checkout main
git pull origin main
git checkout -b feature/<feature-name>
```

### 작업 완료 전

``` bash
npm run lint
npm run typecheck
npm run build
```

### Commit

예:

``` bash
git add .
git commit -m "feat: add dashboard UI"
```

### Push

``` bash
git push origin <작업 브랜치>
```

그 후 GitHub에서 Pull Request → Review → Merge 흐름을 사용합니다.

> AI Agent가 Git을 실행하는 경우에도 현재 Branch를 먼저 확인해야 합니다.
> `main`에서 직접 기능 개발을 시작하지 않습니다.

------------------------------------------------------------------------

## 20. Branch / Commit Convention

초기 Branch 예시:

``` text
feature/dashboard
feature/players
feature/player-detail
feature/classes
feature/class-log
feature/skill-ladder
feature/monthly-report

fix/class-log-validation
fix/mobile-navigation

docs/frontend-guide
docs/ai-rules
```

Commit Message 기본 예시:

``` text
feat: add players screen
fix: prevent invalid attempt count
refactor: split player card component
docs: add frontend guide
test: add observation form tests
chore: configure msw
```

Convention은 팀 운영 중 필요하면 확장할 수 있습니다.

------------------------------------------------------------------------

## 21. Frontend 개발 순서

권장 순서:

``` text
0. Project Foundation

1. Design System / Common Components

2. Dashboard

3. Players

4. Player Detail

5. Classes

6. Class Detail

7. Class Log

8. Skill Ladder

9. Monthly Report
```

Backend가 준비되기 전에는 MSW를 이용해 API 계약을 Mocking합니다.

------------------------------------------------------------------------

## 22. 화면별 개발 프로세스

모든 화면은 아래 흐름을 기본으로 합니다.

``` text
기능정의서
    ↓
AI 작업 명세
    ↓
사람 검토
    ↓
AI Plan
    ↓
사람 검토
    ↓
구현
    ↓
lint / typecheck / build
    ↓
UI / Functional QA
    ↓
Commit / PR
```

Prototype만 보고 기능을 추측해서 구현하지 않습니다.

------------------------------------------------------------------------

## 23. Frontend Definition of Done

기능 완료 전 최소 확인 항목:

``` text
[ ] 기능정의서 요구사항 충족
[ ] Design System 준수
[ ] Prototype 정보 구조 반영
[ ] Mobile 360–390px 확인
[ ] Desktop 1024px+ 확인
[ ] Touch Target 확인
[ ] Loading 상태 확인
[ ] Empty 상태 확인
[ ] Error 상태 확인
[ ] Form Validation 확인
[ ] API Layer 구조 준수
[ ] DB 직접 접근 없음
[ ] History overwrite 없음
[ ] Skill 자동 승급 없음
[ ] TypeScript 오류 없음
[ ] ESLint 오류 없음
[ ] Production Build 성공
[ ] 주요 Interaction 직접 QA
```

------------------------------------------------------------------------

## 24. 초기 프로젝트 세팅 체크리스트

STEP 1\~3 문서가 확정된 후 실제 Frontend 초기 세팅에서 진행합니다.

``` text
[ ] GitHub Repository 연결 확인
[ ] Next.js + TypeScript 프로젝트 생성
[ ] App Router 확인
[ ] src/ 구조 사용
[ ] CSS Modules 확인
[ ] ESLint 설정
[ ] strict TypeScript 확인
[ ] classnames 설치
[ ] TanStack React Query 설치
[ ] Axios 설치
[ ] React Hook Form 설치
[ ] Zod 설치
[ ] MSW 설치
[ ] QueryProvider 구성
[ ] Axios Client 구성
[ ] .env.example 생성
[ ] Design Token 기본 파일 생성
[ ] App Shell 기본 구조 생성
[ ] TBP Brand Asset 추가
[ ] lint 실행 확인
[ ] typecheck 실행 확인
[ ] build 실행 확인
```

------------------------------------------------------------------------

## 25. 현재 프로젝트 단계

``` text
STEP 1
Frontend 기술 스택 / 개발 구조
→ 완료

STEP 2
README
→ 현재 문서

STEP 3
AI_RULES
→ 다음 작업

STEP 4
GitHub / Next.js Frontend Initial Setup

STEP 5
Design System / Common Components

STEP 6+
화면별 기능정의서
→ AI 작업 명세
→ Plan
→ 구현
```

------------------------------------------------------------------------

## 26. 관련 문서

Frontend 개발 전 최소한 다음 문서의 역할을 이해해야 합니다.

``` text
REQUIREMENTS.md
→ 무엇을 만드는가

USER_FLOW.md
→ 사용자가 어떻게 이동하는가

ERD.md
→ 데이터와 무결성 규칙은 무엇인가

DESIGN_SYSTEM.md
→ 어떻게 보여야 하는가

FRONTEND_GUIDE.md
→ Frontend를 어떻게 구현하는가

AI_RULES.md
→ AI Agent가 어떻게 작업해야 하는가

screens/*.md
→ 해당 화면이 정확히 어떻게 동작하는가
```

------------------------------------------------------------------------

## 27. 주의사항

-   문서에 없는 기능을 임의로 추가하지 않습니다.
-   Prototype을 요구사항보다 우선하지 않습니다.
-   Backend API가 확정되지 않았는데 임의의 API 계약을 최종안처럼
    고정하지 않습니다.
-   과거 기록을 현재 상태로 덮어쓰지 않습니다.
-   UI 편의를 이유로 PDS 데이터 무결성 규칙을 우회하지 않습니다.
-   Secret을 Frontend Repository에 Commit하지 않습니다.
-   AI Agent에게 전체 `docs/`를 무조건 읽게 하지 않습니다.
-   화면 작업 시 AI_RULES가 허용한 문서만 읽게 합니다.

------------------------------------------------------------------------

## 28. 다음 단계

다음 작업은:

``` text
docs/frontend/AI_RULES.md
```

작성입니다.

AI_RULES에서는 다음을 구체적으로 고정합니다.

-   AI가 작업 전에 반드시 읽어야 하는 문서
-   읽으면 안 되는 문서
-   Plan Mode
-   작업 명세 작성 규칙
-   기존 Component 재사용 규칙
-   Prototype 사용 규칙
-   코드 수정 허용 범위
-   PDS 데이터 무결성 절대 규칙
-   Git Branch 확인
-   lint / typecheck / build
-   작업 완료 보고 형식
-   임의 추측 금지
-   화면별 기능정의서 적용 방식

------------------------------------------------------------------------

**Product:** TBP Player Development System\
**Project:** PDS Frontend\
**Document:** README\
**Version:** v0.1\
**Status:** Initial Development Baseline
