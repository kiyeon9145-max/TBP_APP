# PDS AI 작업 가이드

> 문서명: `AI_RULES.md`\
> 제품: TBP Player Development System (PDS)\
> 적용 범위: PDS Frontend 개발에 참여하는 모든 AI Agent\
> 버전: v0.1\
> 상태: Initial Development Baseline

------------------------------------------------------------------------

# 0. 문서 목적

이 문서는 AI Agent가 PDS Frontend를 수정할 때 반드시 따라야 하는
**최상위 작업 규칙**이다.

AI는 작업 속도보다 다음을 우선한다.

``` text
요구사항 정확성
→ 기존 구조 보존
→ 데이터 무결성
→ 재사용
→ 검증
→ 구현 속도
```

AI는 화면을 "비슷하게 만드는 것"이 아니라, 지정된 문서와 기존 코드에
근거하여 **유지보수 가능한 Production Frontend**를 구현해야 한다.

------------------------------------------------------------------------

# 1. 작업 시작 전 반드시 이 문서를 먼저 읽는다

모든 Frontend 작업에서 가장 먼저:

``` text
/docs/frontend/AI_RULES.md
```

를 정독한다.

이 문서보다 먼저 Prototype이나 Screen 문서만 보고 구현을 시작하지
않는다.

------------------------------------------------------------------------

# 2. 문서 읽기 범위 제한

## 2.1 기본 원칙

AI는 `docs/` 폴더 전체를 임의로 읽지 않는다.

현재 작업에 필요한 문서만 읽는다.

기본 공통 문서:

``` text
/docs/core/REQUIREMENTS.md
/docs/core/USER_FLOW.md
/docs/core/ERD.md
/docs/core/DESIGN_SYSTEM.md

/docs/frontend/FRONTEND_GUIDE.md
/docs/frontend/AI_RULES.md
```

화면 작업 시 추가:

``` text
/docs/screens/{현재 작업 화면}.md
```

필요한 경우에만:

``` text
/docs/wireframes/{현재 작업 화면 관련 파일}
/prototype/
```

## 2.2 읽지 말아야 하는 문서

사용자 또는 현재 작업 Prompt가 지정하지 않은 다음 자료는 임의로 읽지
않는다.

``` text
다른 화면의 기능정의서
다른 화면의 Wireframe
작업과 무관한 회의 문서
과거 폐기 문서
실험용 문서
개인 메모
다른 프로젝트 문서
```

예외:

현재 화면을 구현하기 위해 다른 화면과의 연결 계약을 확인해야 하는 경우,
먼저 왜 해당 문서가 필요한지 설명하고 필요한 최소 범위만 확인한다.

------------------------------------------------------------------------

# 3. 문서 역할을 혼동하지 않는다

각 문서는 역할이 다르다.

``` text
REQUIREMENTS.md
→ 제품 요구사항

USER_FLOW.md
→ 사용자 이동 및 Core Flow

ERD.md
→ 데이터 구조 / 무결성 / History 정책

DESIGN_SYSTEM.md
→ UI / Visual / Component 기준

FRONTEND_GUIDE.md
→ Frontend Architecture / 기술 구현 기준

AI_RULES.md
→ AI 작업 행동 규칙

screens/*.md
→ 해당 화면의 기능 요구사항 / 상태 / Acceptance Criteria

wireframes/*
→ 설계 구조 참고

prototype/*
→ Hi-Fi 시각적 참고
```

Prototype은 기능 요구사항의 Source of Truth가 아니다.

------------------------------------------------------------------------

# 4. 문서 충돌 시 행동

문서 간 내용이 충돌하거나 구현 방식이 불명확하면 AI가 임의로 새로운
정책을 만들지 않는다.

우선 역할에 따라 충돌을 분류한다.

예:

``` text
DB 무결성 충돌
→ ERD 확인

화면 동작 충돌
→ Screen 기능정의서 확인

색상/간격 충돌
→ DESIGN_SYSTEM 확인

Frontend 구조 충돌
→ FRONTEND_GUIDE 확인
```

그래도 해결되지 않으면:

``` text
1. 충돌 내용을 명시한다.
2. 관련 문서를 표시한다.
3. 임의 구현을 중단한다.
4. 사용자에게 결정을 요청한다.
```

------------------------------------------------------------------------

# 5. 작업 전에 코드를 수정하지 않는다

새 화면 또는 의미 있는 기능 작업은 바로 구현하지 않는다.

기본 Workflow:

``` text
문서 확인
↓
현재 코드 확인
↓
작업 명세 작성
↓
사용자 검토
↓
구현 Plan 작성
↓
사용자 검토
↓
코드 구현
↓
검증
↓
완료 보고
```

사용자가 명시적으로 "바로 구현해"라고 요청한 작은 수정은 예외로 할 수
있다.

------------------------------------------------------------------------

# 6. 작업 명세 작성 규칙

화면 또는 주요 기능 개발 전에 AI는 먼저 작업 명세를 작성한다.

최소 포함 항목:

``` text
1. 작업 목적
2. 구현 범위
3. 구현하지 않는 범위
4. 관련 Route
5. 필요한 화면 상태
6. 사용할 기존 Component
7. 새로 필요한 Component
8. Server State
9. Local UI State
10. Form State
11. 필요한 API
12. Validation
13. Loading / Empty / Error
14. Responsive 대응
15. Accessibility 고려
16. 예상 수정/생성 파일
17. 테스트/검증 항목
18. 확인이 필요한 사항
```

API가 아직 확정되지 않은 경우 임의 Endpoint를 최종안처럼 만들지 않는다.

------------------------------------------------------------------------

# 7. Plan 작성 규칙

작업 명세가 승인된 뒤 구현 Plan을 작성한다.

Plan은 실제 수정 순서대로 작성한다.

예:

``` text
1. 기존 공통 Component 확인
2. 필요한 Type / Schema 정의
3. Mock API 추가
4. API Function 작성
5. React Query Hook 작성
6. Feature Component 작성
7. Route Page 연결
8. Responsive CSS 적용
9. Loading / Empty / Error 처리
10. lint / typecheck / build
11. 주요 Flow QA
```

"화면 구현 → 테스트"처럼 지나치게 추상적인 Plan은 피한다.

------------------------------------------------------------------------

# 8. 기존 코드를 먼저 확인한다

새 Component, Hook, Utility, Type, API 함수를 만들기 전에 기존 구현을
검색한다.

반드시 확인:

``` text
동일 역할 Component 존재 여부
유사 Component 존재 여부
공통 Layout 존재 여부
기존 Hook 존재 여부
기존 API Function 존재 여부
기존 Schema / Type 존재 여부
Design Token 존재 여부
```

기존 구현으로 해결 가능하면 재사용한다.

------------------------------------------------------------------------

# 9. 중복 구현 금지

다음과 같은 중복을 만들지 않는다.

``` text
Button이 있는데 NewButton 생성
StatusChip이 있는데 ReportStatusBadge 생성
공통 Modal이 있는데 화면마다 Modal 구현
동일 API를 여러 파일에서 호출
같은 Player Type을 여러 곳에서 재정의
같은 색상을 페이지마다 HEX로 반복
```

새로운 구현이 필요한 경우 기존 것으로 해결할 수 없는 이유가 있어야 한다.

------------------------------------------------------------------------

# 10. Prototype 사용 규칙

`/prototype/`은 Production Source가 아니라 **UI Reference**다.

참고할 수 있는 것:

``` text
Layout
Information Hierarchy
Spacing 느낌
Color 사용
Desktop / Mobile 구조
Interaction 의도
```

그대로 복사하면 안 되는 것:

``` text
Hash Router
Inline JavaScript
DOM 직접 조작
Prototype Mock Data 구조
Prototype Modal 코드
Prototype Toast 코드
Base64 Asset
임시 CSS 구조
```

Prototype HTML을 React Component에 통째로 붙여넣지 않는다.

------------------------------------------------------------------------

# 11. Wireframe 사용 규칙

Wireframe은 기능의 구조와 설계 의도를 이해하기 위한 자료다.

Wireframe의 HTML/CSS 자체는 Production 코드가 아니다.

화면 기능은 반드시:

``` text
Screen 기능정의서
+
Core 문서
+
Frontend Guide
```

를 우선하여 구현한다.

------------------------------------------------------------------------

# 12. PDS 절대 데이터 규칙

아래 규칙은 UI 편의나 구현 편의를 이유로 변경하지 않는다.

## NEVER

``` text
Frontend에서 PostgreSQL 직접 접근

Frontend에서 Skill History 직접 생성/수정

Class Log Observation만으로 Skill 자동 승급

Skill History overwrite

Goal History overwrite

현재 Class 구성으로 과거 Session 구성 재계산

과거 Attendance를 현재 Enrollment로 덮어쓰기

Draft Monthly Report를 완료 Report로 계산

Approved Report Snapshot을 조용히 변경

AI가 존재하지 않는 Observation 생성

AI가 존재하지 않는 날짜/횟수/성장 사실 생성

Media가 없다는 이유로 Report 작성 자체 차단

복수 DB 변경 Transaction을 Frontend에서 흉내내기

Secret Key를 Browser 코드에 포함
```

------------------------------------------------------------------------

# 13. PDS 핵심 무결성 규칙

구현 중 항상 유지한다.

``` text
1. Player당 Active Goal 최대 1개
2. 기존 Goal은 History에 남음
3. Class와 Class Session은 별도 개념
4. Session은 실제 날짜의 수업 기록
5. Session Attendance는 Session 기준
6. Observation은 Session + Player에 여러 개 가능
7. successes <= attempts
8. Skill 변경은 Coach 승인
9. 미평가 != Level 1
10. Skill 변경 시 History 보존
11. Skill 하향도 가능하나 이유 기록
12. Approved Report는 Snapshot
13. Report Next Goal 적용 시 기존 Goal 보존
14. 복합 변경은 Backend Transaction
15. Frontend는 Backend API 결과를 기준으로 상태 갱신
```

------------------------------------------------------------------------

# 14. Class Log 특별 규칙

Class Log는 현장 입력 핵심 화면이다.

목표:

``` text
선수 1명 기록 약 30초
```

우선순위:

``` text
Player Context
→ Current Goal
→ Skill
→ Observation
→ Optional Attempts / Successes
→ Optional Media
→ Save & Next
```

AI는 다음을 하면 안 된다.

``` text
모든 Skill을 매 수업 필수 입력으로 만들기
Observation 저장과 Skill 변경을 자동 결합
Media Upload 실패 때문에 Observation Text까지 손실
Absent Player를 기록 완료율 분모에 포함
Save & Next에서 새 Session 생성
```

진행 중 Session 재진입 시 기존 `sessionId`를 사용한다.

------------------------------------------------------------------------

# 15. Skill Ladder 특별 규칙

Skill은 숫자 평가 점수가 아니라 관찰 가능한 행동 단계다.

핵심 영역:

``` text
받기
던지기
치기
주루
```

금지:

``` text
자동 승급
선수 랭킹
종합 점수
평균 점수
별점
나이에 따른 강제 Level
```

Skill 변경은:

``` text
Evidence 확인
→ Coach 판단
→ 명시적 변경 Action
→ Backend 성공
→ Current / History 갱신
```

순서를 따른다.

------------------------------------------------------------------------

# 16. Monthly Report 특별 규칙

Monthly Report AI는 **초안 작성자**다.

``` text
Evidence
→ AI Draft
→ Coach Edit
→ Coach Approval
```

AI가 Report를 자동 승인하지 않는다.

Report 문장은 Evidence 범위 안에서 작성한다.

Before / After:

``` text
실제 비교 가능한 Media 있음
→ 표시 가능

Media 없음
→ 섹션 생략 가능
```

Next Goal은 대표 목표 1개를 기본으로 한다.

Approved Report 수정은 Revision / Re-approve 개념을 고려한다.

------------------------------------------------------------------------

# 17. Frontend Architecture 준수

기본 의존 방향:

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
```

금지:

``` text
api → ui
api → hooks
shared → app
ui/components → 특정 Screen
```

Page Component에 API, 대규모 UI, Business Logic을 한꺼번에 작성하지
않는다.

------------------------------------------------------------------------

# 18. 상태 관리 규칙

``` text
Server State
→ TanStack React Query

Form State
→ React Hook Form

Local UI State
→ useState / useReducer
```

서버 데이터를 불필요하게 `useState`로 복제하지 않는다.

Redux/Zustand 등 전역 State Library는 필요성이 확인되기 전 임의 도입하지
않는다.

------------------------------------------------------------------------

# 19. API 작업 규칙

모든 Backend 요청은 API Layer를 통한다.

``` text
Feature
→ Hook
→ Domain API
→ Axios Client
→ Backend
```

Screen에서 직접:

``` ts
axios.get(...)
fetch(...)
```

를 작성하지 않는다.

공통 Axios Client를 사용한다.

------------------------------------------------------------------------

# 20. API를 추측하지 않는다

Backend API가 아직 확정되지 않은 경우:

``` text
임의 Endpoint
임의 Request DTO
임의 Response DTO
임의 Error Code
```

를 Production 계약처럼 확정하지 않는다.

필요하면 Mock 계약 또는 `TODO: API contract pending`으로 명확히
표시한다.

------------------------------------------------------------------------

# 21. MSW 규칙

Backend가 준비되지 않은 화면은 MSW를 사용한다.

Mock도 실제 Architecture를 따른다.

``` text
UI
→ React Query
→ API Layer
→ Axios
→ MSW
```

Component 내부에서 배열을 하드코딩해서 실제 API 연동 구조를 우회하지
않는다.

Mock은 가능하면 다음 상태를 제공한다.

``` text
Normal
Empty
Slow Loading
400
401
403
404
409
500
```

------------------------------------------------------------------------

# 22. TypeScript 규칙

TypeScript `strict` 기준을 유지한다.

금지:

``` text
any 남용
@ts-ignore 남용
타입 오류를 assertion으로 숨김
API 응답 무조건 캐스팅
```

가능하면:

``` ts
import type { Player } from ...
```

처럼 Type-only import를 사용한다.

------------------------------------------------------------------------

# 23. Form 규칙

복잡한 Form은:

``` text
React Hook Form
+
Zod
```

를 기본으로 한다.

Frontend Validation은 빠른 UX 피드백이고 최종 무결성 검증은 Backend
책임이다.

Submit 중 중복 요청을 방지한다.

저장 중에는 적절한 Loading / Disabled 상태를 제공한다.

------------------------------------------------------------------------

# 24. CSS 규칙

기본:

``` text
CSS Modules
+
classnames
+
Design Tokens
```

금지:

``` text
대량 inline style
임의 HEX 반복
임의 Radius
임의 Shadow
!important 남용
전역 CSS 남용
```

Design System Token이 있으면 반드시 먼저 사용한다.

------------------------------------------------------------------------

# 25. Design System 규칙

PDS Design System을 Source of Truth로 사용한다.

기본 방향:

``` text
Professional Sports Tool
+
Youth Development
+
Evidence-Based Coaching
```

Brand:

``` text
Navy
Blue
Orange Accent
Neutral Gray / White
```

AI가 화면마다 새로운 스타일 언어를 만들지 않는다.

------------------------------------------------------------------------

# 26. 반응형 규칙

Mobile First.

``` text
Mobile: 360–390px
Tablet: 768px+
Desktop: 1024px+
```

Mobile:

``` text
Bottom Navigation
Sticky Action
한 손 조작
44px 이상 Touch Target
주요 Button/Input 약 48px
```

Desktop:

``` text
Sidebar
적절한 정보 밀도
Mobile의 핵심 행동 우선순위 유지
```

Desktop 화면만 보고 구현 완료로 판단하지 않는다.

------------------------------------------------------------------------

# 27. 접근성 규칙

최소 기준:

``` text
button은 button element
input에는 label
nav는 semantic nav
keyboard focus 제공
focus-visible 확인
색상만으로 상태 구분 금지
icon-only button accessible label
이미지 alt
form error 연결
충분한 touch target
```

클릭 가능한 `div`를 습관적으로 만들지 않는다.

------------------------------------------------------------------------

# 28. UI State 규칙

정상 데이터 화면만 만들고 완료 처리하지 않는다.

필요한 상태:

``` text
Loading
Empty
Error
Success
Disabled
Submitting
```

화면에 따라:

``` text
No Classes
No Players
No Observations
No Media
Skill Unrated
No Report Target
```

등을 구현한다.

------------------------------------------------------------------------

# 29. Asset 규칙

Brand Asset:

``` text
/public/images/brand/
```

에 둔다.

금지:

``` text
Base64 이미지를 TSX에 직접 삽입
원본 로고 비율 변경
AI가 원본 Brand Asset 임의 재생성
```

적절한 경우 Next.js `Image`를 사용한다.

------------------------------------------------------------------------

# 30. Secret / 환경변수 규칙

Frontend에 Secret을 넣지 않는다.

금지:

``` text
DB_PASSWORD
OPENAI_API_KEY
Storage Secret
Private API Key
Service Account Credential
```

Browser에 노출되어도 되는 설정만 `NEXT_PUBLIC_`을 사용한다.

`.env.local`은 Commit하지 않는다.

`.env.example`에는 실제 Secret 값을 넣지 않는다.

------------------------------------------------------------------------

# 31. 파일 / Naming 규칙

파일:

``` text
kebab-case
```

예:

``` text
player-card.tsx
player-card.module.css
players-api.ts
use-player-detail.ts
```

Component:

``` text
PascalCase
```

Hook:

``` text
usePlayerDetail
useCreateObservation
```

Handler:

``` text
handleSave
handleApprove
handleSelectPlayer
```

Boolean:

``` text
isLoading
isActive
hasObservation
canApprove
```

------------------------------------------------------------------------

# 32. Component 분리 규칙

다음 중 하나 이상이면 Component 분리를 검토한다.

``` text
2곳 이상 재사용
독립 UI 책임
독립 Interaction
테스트 가치가 있는 로직
Screen이 지나치게 커짐
```

하지만 모든 `div`를 Component로 만들지 않는다.

반대로 Screen 하나에 모든 코드를 몰아넣지도 않는다.

------------------------------------------------------------------------

# 33. 주석 규칙

코드만 읽어도 알 수 있는 내용을 주석으로 반복하지 않는다.

좋은 주석:

``` text
왜 이 구현을 선택했는지
왜 특정 invalidation이 필요한지
왜 History 관련 동작을 Client에서 하지 않는지
브라우저/라이브러리 제약
```

나쁜 주석:

``` text
// 버튼 클릭
// 데이터를 가져온다
// 변수를 선언한다
```

------------------------------------------------------------------------

# 34. 임의 리팩터링 금지

현재 작업 범위를 넘어선 파일을 "깔끔하게 만들기 위해" 대규모 수정하지
않는다.

예:

``` text
Dashboard 작업 중 Players 구조 전체 변경
작은 CSS 수정 중 Router 구조 변경
버그 수정 중 전체 Naming Convention 변경
```

필요한 리팩터링이 발견되면 별도 제안으로 보고한다.

------------------------------------------------------------------------

# 35. 기존 동작을 깨지 않는다

수정 전 영향 범위를 확인한다.

공통 Component 수정 시:

``` text
어디에서 사용되는지 검색
Props 영향 확인
Responsive 영향 확인
기존 테스트 확인
```

한 화면을 고치면서 다른 화면을 깨뜨리지 않는다.

------------------------------------------------------------------------

# 36. 삭제 규칙

파일, Component, Type, API를 삭제하기 전에 사용처를 검색한다.

"안 쓰는 것처럼 보인다"는 이유만으로 삭제하지 않는다.

삭제가 필요한 경우:

``` text
사용처 없음 확인
대체 구현 확인
삭제 영향 확인
```

후 진행한다.

------------------------------------------------------------------------

# 37. Git 작업 전 규칙

AI가 Git 명령을 실행할 수 있는 환경이라면 작업 시작 전에 반드시
확인한다.

``` bash
git status
git branch --show-current
```

기능 개발을 `main`에서 바로 시작하지 않는다.

권장:

``` text
feature/dashboard
feature/players
feature/class-log
feature/monthly-report
```

현재 사용자 변경사항이 있으면 임의로 discard/reset 하지 않는다.

------------------------------------------------------------------------

# 38. Git에서 절대 하지 말 것

사용자 명시적 요청 없이 다음을 하지 않는다.

``` text
git reset --hard
git clean -fd
force push
기존 commit history rewrite
다른 사람 변경사항 삭제
main 직접 push
```

Conflict가 발생하면 임의로 상대 변경을 제거하지 않는다.

------------------------------------------------------------------------

# 39. Commit 규칙

작업 단위가 이해 가능한 Commit을 만든다.

예:

``` text
feat: add dashboard UI
feat: add observation form
fix: prevent successes exceeding attempts
refactor: reuse status chip
docs: update frontend guide
```

한 Commit에 무관한 대규모 변경을 섞지 않는다.

------------------------------------------------------------------------

# 40. 작업 후 필수 검증

구현 후 최소:

``` bash
npm run lint
npm run typecheck
npm run build
```

를 실행한다.

관련 Test가 있다면 함께 실행한다.

실행하지 못한 검증이 있으면 "성공했다"고 말하지 않는다.

대신:

``` text
실행하지 못한 항목
이유
사용자가 실행할 명령
```

을 명확히 보고한다.

------------------------------------------------------------------------

# 41. 브라우저 QA

가능한 환경이면 실제 화면을 확인한다.

최소:

``` text
Mobile width
Desktop width
Navigation
Primary Action
Form
Loading
Empty
Error
Modal/Sheet
```

Class Log는 특히:

``` text
Skill 선택
Observation 입력
Attempts/Successes
Save
Save & Next
진행률
이탈
```

을 확인한다.

------------------------------------------------------------------------

# 42. 작업 완료 보고 형식

작업 완료 후 다음 형식으로 보고한다.

``` text
## 완료

- 구현한 내용
- 주요 변경 파일

## 검증

- lint:
- typecheck:
- build:
- test:
- browser QA:

## 참고

- Mock 처리된 부분
- Backend 연동 대기 부분
- 후속 작업
- 확인이 필요한 사항
```

단순히 "완료했습니다"라고만 보고하지 않는다.

------------------------------------------------------------------------

# 43. 오류가 발생했을 때

오류를 숨기기 위한 임시 패치를 하지 않는다.

순서:

``` text
1. 오류 재현
2. 원인 확인
3. 영향 범위 확인
4. 최소 수정
5. 재검증
```

TypeScript 오류를 `any`나 `@ts-ignore`로 덮는 것을 해결로 간주하지
않는다.

------------------------------------------------------------------------

# 44. 기능이 불명확할 때

추측보다 질문을 우선한다.

특히 다음은 임의 결정하지 않는다.

``` text
새 Business Rule
새 Skill 기준
새 Report 정책
새 권한 정책
새 API 계약
새 데이터 삭제 정책
새 자동화 정책
```

다만 단순한 코드 구현 세부사항은 기존 문서와 코드 패턴을 기준으로
합리적으로 결정할 수 있다.

------------------------------------------------------------------------

# 45. 화면 작업 기본 Prompt

화면 구현을 시작할 때 다음 형식을 권장한다.

``` text
/docs/frontend/AI_RULES.md를 먼저 정독해줘.

그 다음 AI_RULES에서 공통으로 읽도록 지정한 문서와
/docs/screens/[현재 화면].md만 읽어줘.

필요하면 현재 화면과 직접 관련된 Wireframe과 Prototype만 확인하고,
다른 화면 문서는 임의로 읽지 마.

아직 코드를 수정하지 말고 현재 코드베이스를 확인한 다음
먼저 작업 명세서를 작성해줘.

작업 명세에는:
- 구현 범위
- 구현하지 않는 범위
- Route
- 재사용 Component
- 신규 Component
- Server/Local/Form State
- API
- Validation
- Loading/Empty/Error
- Responsive
- Accessibility
- 예상 변경 파일
- 테스트/QA 항목
- 확인이 필요한 사항

을 포함해줘.
```

------------------------------------------------------------------------

# 46. 작업 명세 승인 후 Prompt

``` text
작업 명세를 기준으로 구현 Plan을 작성해줘.

아직 코드는 수정하지 마.

실제 작업 순서,
수정/생성할 파일,
기존 Component 재사용,
API/Hook 연결,
상태 처리,
Responsive,
검증 명령까지 포함해줘.
```

------------------------------------------------------------------------

# 47. Plan 승인 후 구현 Prompt

``` text
승인한 Plan을 기준으로 구현을 진행해줘.

작업 범위를 벗어난 리팩터링은 하지 말고,
기존 Component와 Design Token을 우선 재사용해줘.

완료 후 lint, typecheck, build와 가능한 테스트를 실행하고
AI_RULES의 작업 완료 보고 형식으로 결과를 알려줘.
```

------------------------------------------------------------------------

# 48. 작은 수정 Prompt

작은 UI 수정이나 명확한 Bug Fix는 작업 명세/Plan 전체 절차를 생략할 수
있다.

예:

``` text
AI_RULES를 준수해서 이 버그만 수정해줘.
작업 범위를 넓히지 말고 원인을 먼저 확인한 뒤 최소 수정해줘.
완료 후 관련 검증 결과를 알려줘.
```

------------------------------------------------------------------------

# 49. 화면별 기능정의서 작성 단계의 AI 규칙

화면 기능정의서를 새로 작성할 때도 AI가 Prototype만 보고 기능을 발명하지
않는다.

기준:

``` text
REQUIREMENTS
+ USER_FLOW
+ ERD
+ DESIGN_SYSTEM
+ 기존 화면 간 연결
```

을 근거로 작성한다.

기능정의서에는 최소 다음을 포함한다.

``` text
화면 목적
주요 사용자
진입 / 이탈
Route
정보 구조
표시 데이터
사용자 Action
Validation
상태
API 요구사항
Loading
Empty
Error
Responsive
Accessibility
Acceptance Criteria
관련 Entity
관련 화면
MVP 제외 범위
```

------------------------------------------------------------------------

# 50. 작업 범위 예시 --- Dashboard

Dashboard를 작업한다면 기본적으로 읽는 문서:

``` text
AI_RULES.md
FRONTEND_GUIDE.md
REQUIREMENTS.md
USER_FLOW.md
ERD.md
DESIGN_SYSTEM.md
screens/01-dashboard.md
Dashboard 관련 Prototype / Wireframe
```

읽지 않는 문서 예:

``` text
screens/07-skill-ladder.md
screens/08-monthly-report.md
```

단, Dashboard의 Report Progress 계약처럼 직접 연결된 세부 정책이 현재
문서만으로 해결되지 않는 경우 필요한 최소 자료를 추가 확인한다.

------------------------------------------------------------------------

# 51. 작업 범위 예시 --- Class Log

Class Log는 데이터 무결성 영향이 크므로 특히 주의한다.

확인:

``` text
Session ID
Attendance
Present / Absent
Observation
Multiple Observation
Attempts / Successes
Media
Save & Next
Completion
Draft protection
```

금지:

``` text
새 Session 중복 생성
Absent를 completion denominator에 포함
Skill 자동 승급
Observation과 Media 저장을 불필요하게 하나의 실패 단위로 묶음
```

------------------------------------------------------------------------

# 52. 작업 범위 예시 --- Monthly Report

확인:

``` text
Report month/player
Evidence
Draft
AI Draft
Edit
Preview
Approval
Snapshot
Next Goal
Export
```

금지:

``` text
AI 자동 승인
근거 없는 성장 문장
Media 없는 Before/After 생성
Draft를 Approved로 표시
Approved Snapshot 직접 덮어쓰기
```

------------------------------------------------------------------------

# 53. Definition of Done

AI는 아래 조건을 만족해야 작업 완료로 판단한다.

``` text
[ ] 기능정의서 요구사항 충족
[ ] 작업 범위 외 수정 없음
[ ] 기존 Component 재사용 검토
[ ] Design System 준수
[ ] Mobile 확인
[ ] Desktop 확인
[ ] Loading 처리
[ ] Empty 처리
[ ] Error 처리
[ ] Validation 처리
[ ] API Layer 준수
[ ] PDS 데이터 규칙 준수
[ ] History overwrite 없음
[ ] Skill 자동 변경 없음
[ ] TypeScript 오류 없음
[ ] ESLint 오류 없음
[ ] Build 성공
[ ] 관련 Test 실행
[ ] 주요 Flow QA
[ ] 미완료/Mock/API 대기 사항 보고
```

------------------------------------------------------------------------

# 54. 최우선 행동 원칙 요약

AI Agent는 항상 다음을 기억한다.

``` text
1. AI_RULES부터 읽는다.

2. 지정된 문서만 읽는다.

3. Prototype을 요구사항으로 착각하지 않는다.

4. 코드를 쓰기 전에 기존 코드를 확인한다.

5. 기존 Component를 먼저 재사용한다.

6. 큰 작업은 작업 명세 → Plan → 구현 순서로 진행한다.

7. Frontend에서 DB에 직접 접근하지 않는다.

8. History를 덮어쓰지 않는다.

9. Class Log가 Skill을 자동 변경하지 않는다.

10. AI가 Evidence를 만들어내지 않는다.

11. API가 없으면 추측해서 최종 계약을 만들지 않는다.

12. 작업 범위를 벗어나 리팩터링하지 않는다.

13. 사용자 변경사항을 임의로 삭제하지 않는다.

14. 완료 전 lint / typecheck / build를 확인한다.

15. 검증하지 않은 것을 검증했다고 말하지 않는다.
```

------------------------------------------------------------------------

# 55. 문서 변경 규칙

이 문서의 규칙과 실제 프로젝트 운영이 달라질 경우 코드를 예외적으로 계속
쌓기보다 문서를 먼저 갱신한다.

특히 다음 변경 시 AI_RULES와 FRONTEND_GUIDE를 함께 검토한다.

``` text
Frontend Architecture 변경
State Management 도구 변경
API Layer 변경
Git Workflow 변경
Directory Structure 변경
Testing 전략 변경
AI 작업 Workflow 변경
PDS Core Business Rule 변경
```

------------------------------------------------------------------------

# 56. 다음 단계

이 문서가 확정되면 Frontend 개발 준비 문서의 기본 세트가 완성된다.

``` text
STEP 1
FRONTEND_GUIDE.md
✓

STEP 2
README.md
✓

STEP 3
AI_RULES.md
✓

STEP 4
GitHub / Next.js Initial Setup

STEP 5
Design System / Common Components

STEP 6+
화면 기능정의서
→ AI 작업 명세
→ Plan
→ 구현
```

------------------------------------------------------------------------

**Product:** TBP Player Development System\
**Document:** AI Rules / AI 작업 가이드\
**Version:** v0.1\
**Scope:** Frontend\
**Status:** Initial Development Baseline
