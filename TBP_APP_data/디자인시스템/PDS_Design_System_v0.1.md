# TBP PDS Design System v0.1

- Product: TBP Player Development System (PDS)
- Version: v0.1
- Status: Wireframe / MVP 기준 디자인 시스템
- Primary User: Coach
- Secondary Output User: Parent
- Frontend: Next.js / React
- UI Strategy: Mobile First
- Brand Direction: TBP Baseball × Professional Sports × Youth Development × Data
- 기준 화면: 360–390px Mobile → Tablet/Desktop 확장

---

# 1. Design System 목적

PDS의 7개 핵심 화면이 서로 다른 서비스처럼 보이지 않도록 공통 시각 언어와 UI 규칙을 정의한다.

대상 화면:

1. Dashboard
2. Players
3. Player Detail
4. Classes
5. Class Log
6. Skill Ladder
7. Monthly Report

PDS는 두 가지 경험을 동시에 만족해야 한다.

### Coach UI
- 운동장에서 빠르게 사용
- 한 손 조작 가능
- 정보 탐색보다 행동 우선
- Class Log 20~30초 내 입력
- 데이터가 많아져도 복잡해 보이지 않음

### Parent Output
- 전문적이지만 어렵지 않음
- 아이의 성장과 코치의 관찰이 눈에 들어옴
- Monthly Report를 약 10초 안에 스캔 가능
- 출력/이미지 공유에도 TBP 브랜드가 유지됨

---

# 2. Brand Direction

## Brand Keywords

```text
Professional
Clear
Trustworthy
Active
Growth
Youthful
Baseball
```

## 핵심 문장

> 선수의 성장을 기록하는 TBP의 코칭 시스템.

## Visual Direction

```text
Professional Sports Tool
        +
Youth Development
        +
Evidence-Based Coaching
```

야구공, 배트, 잔디 등의 장식 요소를 UI 전체에 반복하지 않는다.

TBP 브랜드는 다음으로 표현한다.

- Navy 중심 컬러
- TBP Blue의 명확한 선택 상태
- Orange의 제한적 강조
- 스포츠 서비스다운 단단한 Typography
- 빠른 정보 인식
- 실제 선수 Media

---

# 3. Brand Asset 사용 원칙

현재 TBP 브랜드에서 확인되는 주요 요소:

- TBP Wordmark / Circle Mark
- Navy 계열 유니폼
- Vivid Blue
- Orange mascot accent
- White typography

## Logo

### 권장
- Login
- Desktop sidebar/header
- Monthly Report
- Empty state 일부
- Export PDF/Image

### 비권장
- 모든 Card 내부
- 모든 Button
- 반복되는 배경 watermark
- Class Log 입력 화면 중앙

운영 UI에서는 Logo보다 정보와 행동이 우선이다.

## Mascot

Mascot은 브랜드 친근감을 높이는 보조 Asset이다.

사용 가능:
- Empty State
- Onboarding
- Monthly Report footer
- 성공/완료 화면
- Parent-facing material

사용하지 않음:
- Error severity를 흐리는 상황
- 모든 카드
- Observation 입력 폼
- Skill 평가 화면의 핵심 판단 영역

---

# 4. Color System

> 아래 HEX는 현재 제공된 TBP 마크의 시각적 방향을 기준으로 잡은 **UI Design Token v0.1**이다. 공식 브랜드 원본 컬러값이 확인되면 Brand Token만 교체하고 Semantic Token 구조는 유지한다.

## 4.1 Brand Colors

| Token | HEX | 역할 |
|---|---|---|
| `brand.navy.900` | `#071E3A` | 최상위 Navy / Header |
| `brand.navy.800` | `#0B2A4A` | Primary Navy |
| `brand.navy.700` | `#123B63` | Hover / Secondary Navy |
| `brand.blue.600` | `#1546F5` | TBP Vivid Blue |
| `brand.blue.500` | `#2D5BFF` | Active / Focus |
| `brand.blue.100` | `#E8EEFF` | Selected background |
| `brand.orange.500` | `#FF7A1A` | TBP Orange Accent |
| `brand.orange.100` | `#FFF0E5` | Orange subtle |
| `brand.white` | `#FFFFFF` | White |

## 4.2 Neutral

| Token | HEX |
|---|---|
| `gray.950` | `#111827` |
| `gray.800` | `#1F2937` |
| `gray.700` | `#374151` |
| `gray.600` | `#4B5563` |
| `gray.500` | `#6B7280` |
| `gray.400` | `#9CA3AF` |
| `gray.300` | `#D1D5DB` |
| `gray.200` | `#E5E7EB` |
| `gray.100` | `#F3F4F6` |
| `gray.50` | `#F8FAFC` |

## 4.3 Semantic Colors

| Token | HEX | 사용 |
|---|---|---|
| `success` | `#16805D` | 저장 완료 / Approved |
| `success.bg` | `#EAF7F2` | Success background |
| `warning` | `#B96800` | 미작성 / 주의 |
| `warning.bg` | `#FFF4E5` | Warning background |
| `error` | `#C9362B` | 오류 / 삭제 |
| `error.bg` | `#FFF0EE` | Error background |
| `info` | `#2563EB` | 정보 |
| `info.bg` | `#EFF6FF` | Info background |

## 4.4 컬러 사용 비율

권장 체감 비율:

```text
Navy / Dark Text        30%
White / Gray            55%
TBP Blue                10%
Orange / Semantic        5%
```

Orange는 브랜드 포인트다. 대형 배경색으로 남용하지 않는다.

## 4.5 Semantic Mapping

```text
Primary Action       → Navy 800
Primary Hover        → Navy 700
Selected / Active    → Blue 600
Focus Ring           → Blue 500
Growth Highlight     → Blue 또는 Orange
Approved             → Success
Draft / Missing      → Warning
Destructive          → Error
Background           → Gray 50
Surface              → White
Border               → Gray 200
Primary Text         → Gray 950
Secondary Text       → Gray 600
Disabled Text        → Gray 400
```

---

# 5. Typography

## Font Family

권장:

```css
font-family:
  Pretendard,
  "Noto Sans KR",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

웹폰트가 없을 때도 깨지지 않는 fallback을 둔다.

## Type Scale

| Token | Size | Weight | Line Height | 용도 |
|---|---:|---:|---:|---|
| Display | 32 | 700 | 1.25 | Login / 큰 Report 제목 |
| H1 | 28 | 700 | 1.3 | Desktop page title |
| H2 | 24 | 700 | 1.35 | Section title |
| H3 | 20 | 700 | 1.4 | Card/Panel title |
| Title | 18 | 700 | 1.4 | Mobile page title |
| Body L | 16 | 400/600 | 1.55 | 주요 본문 |
| Body M | 14 | 400/600 | 1.55 | 기본 UI |
| Body S | 13 | 400/600 | 1.5 | Secondary |
| Caption | 12 | 400/600 | 1.45 | 날짜/metadata |
| Micro | 11 | 600 | 1.4 | 제한적 badge |

## 규칙

- Body 기본은 Mobile `14~16px`.
- 주요 행동/관찰 문장은 14px 미만으로 줄이지 않는다.
- Level, 성공/시도 횟수는 Tabular Number 사용 권장.
- 한 화면에 Weight를 과도하게 사용하지 않는다.
- `400 / 600 / 700` 중심.

---

# 6. Spacing

4px Base Grid.

```text
space.0   = 0
space.1   = 4px
space.2   = 8px
space.3   = 12px
space.4   = 16px
space.5   = 20px
space.6   = 24px
space.8   = 32px
space.10  = 40px
space.12  = 48px
space.16  = 64px
```

## 기본 규칙

- Mobile page horizontal padding: `16px`
- Desktop content padding: `24~32px`
- Card internal padding: `16px`
- Large Card: `20~24px`
- Form field gap: `16px`
- Related controls: `8px`
- Section gap: `24~32px`

---

# 7. Radius

```text
radius.sm   = 6px
radius.md   = 8px
radius.lg   = 12px
radius.xl   = 16px
radius.full = 999px
```

## 사용

- Button: 8px
- Input: 8px
- Card: 12px
- Modal/Sheet: 16px
- Chip/Badge: full

PDS는 장난감 같은 과도한 pill/rounded UI를 피한다.

---

# 8. Shadow / Elevation

기본 UI는 Border 중심.

```text
elevation.0 = none
elevation.1 = 0 1px 2px rgba(15,23,42,.06)
elevation.2 = 0 4px 12px rgba(15,23,42,.08)
elevation.3 = 0 12px 28px rgba(15,23,42,.12)
```

- Card → 0 또는 1
- Sticky Bottom Action → 2
- Modal / Bottom Sheet → 3
- 모든 카드에 강한 Shadow 금지

---

# 9. Layout

## Mobile
기준: `360~390px`

```text
Page
 ├─ Top App Bar
 ├─ Page Header
 ├─ Main Content
 └─ Bottom Navigation / Sticky Action
```

Horizontal padding: `16px`

## Tablet
`768px+`

## Desktop
`1024px+`

권장:
- Sidebar: 220~240px
- Main max width: 1200~1280px
- Form/detail content: 필요 시 720~960px 제한

## Breakpoints

```text
sm  640
md  768
lg  1024
xl  1280
```

---

# 10. Touch & Interaction

- 최소 터치 영역: `44×44px`
- 핵심 Field/Primary Button 높이: `48px`
- 작은 Icon button도 hit area는 44px
- Hover에 의존하지 않는다.
- 중요한 행동은 icon-only로 만들지 않는다.
- 운동장 사용을 고려해 입력 대상 사이 간격 확보.
- 저장 성공 후 명확한 피드백 제공.

---

# 11. Iconography

권장 스타일:
- Outline
- 20~24px
- Stroke 1.75~2px
- 단순하고 보편적인 아이콘

예:
- Home
- Users
- Calendar
- Clipboard/Edit
- Target
- Image/Video
- FileText
- Chevron
- Plus
- Search

Baseball 전용 아이콘은 필요한 Domain Context에만 사용한다.

---

# 12. Button

## Primary

```text
Background: Navy 800
Text: White
Height: 48px
Radius: 8px
Padding X: 16px
Font: 14~16 / 600
```

예:
- 저장하고 다음
- 수업 시작
- 리포트 승인

## Secondary

```text
White background
Navy text
Gray 300 border
```

## Tertiary / Ghost

배경 없이 Text/Icon 중심.

## Destructive

Error color.
삭제/비활성화 등 실제 파괴 행동만 사용.

## Disabled

- Gray 100 background
- Gray 400 text
- Cursor/action disabled

## Loading

텍스트를 갑자기 없애지 않고 spinner + action 의미 유지.

---

# 13. Input

높이:
`48px`

구조:

```text
Label
Input
Helper / Error
```

State:
- Default
- Focus
- Filled
- Error
- Disabled

Focus:
- Border Blue 500
- 2~3px subtle focus ring

Error:
- Error border
- Error text
- 오류 이유를 문장으로 표시

Placeholder는 Label 역할을 대신하지 않는다.

---

# 14. Textarea

Observation 입력의 핵심 컴포넌트.

권장:
- 최소 높이 96px
- Mobile에서 resize보다 auto-grow 권장
- 실제 관찰 예시 placeholder 가능

예:

```text
정면으로 오는 공 5회 중 4회 포구
```

Placeholder를 평가 문구로 사용하지 않는다.

---

# 15. Select / Dropdown

Mobile에서는 작은 Dropdown보다 Bottom Sheet/Native Select가 더 빠를 수 있다.

사용:
- Class 선택
- Month 선택
- 상태 필터

4개 Skill은 Select보다 Chip/Segmented Control을 우선한다.

---

# 16. Checkbox / Radio / Switch

- Checkbox → 다중 선택
- Radio → 단일 선택
- Switch → 즉시 켜고 끄는 설정

Attendance처럼 중요한 상태는 작은 Checkbox보다 명확한 Status control을 사용.

---

# 17. Chip

## Filter Chip
예:
`전체 / A반 / B반`

## Skill Chip
```text
받기
던지기
치기
주루
```

Selected:
- Blue 100 background
- Blue 600 border/text

## Status Chip
```text
진행 중
완료
미작성
Draft
Approved
```

상태 의미에 Semantic Color 적용.

---

# 18. Badge

Chip보다 작고 정보 표시 전용.

예:
- `L3`
- `영상`
- `3개`
- `신규`

Badge를 Button처럼 사용하지 않는다.

---

# 19. Card

기본:

```text
Background: White
Border: Gray 200
Radius: 12px
Padding: 16px
Shadow: none / elevation 1
```

Card 전체가 이동 행동이면 전체 영역을 클릭 가능하게 한다.

한 Card 안에 Primary CTA를 여러 개 넣지 않는다.

---

# 20. Navigation

## Mobile Bottom Navigation

MVP 후보:

```text
홈
선수
수업
리포트
```

Skill은 Player Detail 내부에 둔다.

### 규칙
- 4~5개 이내
- icon + label
- active = Navy/Blue
- inactive = Gray 500
- 최소 56~64px 높이
- safe area 대응

## Desktop

Left Sidebar 권장.

```text
TBP PDS
Dashboard
Players
Classes
Reports
```

---

# 21. Top App Bar

Mobile:

```text
[Back] Page Title        [Action]
```

- 높이 56px 전후
- 제목은 1줄
- 뒤로가기와 현재 페이지 명확히 표시

Class Log에서는 Session Context를 Header 아래 별도 표시.

---

# 22. Modal / Bottom Sheet

## Modal
Desktop confirmation.

## Bottom Sheet
Mobile 선택/확인.

사용:
- Skill Level 변경
- Media 선택
- Filter
- 승인 확인

위험 행동은 Action Sheet 또는 Confirmation Dialog 사용.

---

# 23. Toast

사용:
- 저장 완료
- 수정 완료
- 업로드 완료
- 재시도 가능 오류

Toast만으로 중요한 Error를 전달하지 않는다.
폼 오류는 해당 Field 근처에도 표시.

---

# 24. Empty State

구성:

```text
Simple icon / optional mascot
Title
Short explanation
Primary action
```

예:

```text
아직 등록된 선수가 없어요.
첫 선수를 등록하면 수업 기록을 시작할 수 있어요.

[선수 등록]
```

Mascot을 사용할 수 있는 대표 영역.

---

# 25. Loading

- 전체 화면 Spinner 남용 금지
- List → Skeleton
- Button action → Button loading
- Image → media placeholder
- Report AI generation → progress/status text

---

# 26. Error

구분:

### Field Error
입력 오류.

### Inline Error
특정 Card/API 실패.

### Page Error
화면 핵심 데이터를 불러오지 못함.

### Destructive Confirmation
삭제/비활성화.

문구:
무엇이 실패했는지 + 사용자가 무엇을 할 수 있는지.

---

# 27. Player Card

## 목적
Players 화면에서 2~3초 내 선수 식별.

구조:

```text
[Avatar] 김민준          >
         초3 · 토요일 A반
         목표  좌우 이동 후 포구
         최근 기록  9/22
```

### 우선순위
1. 이름
2. Class
3. Current Goal
4. 최근 기록

Skill 4개를 Player List Card에 전부 노출하지 않는다.

---

# 28. Class Card

```text
토요일 A반
10:00–11:00 · 8명

오늘 7명 출석
기록 5 / 7

[수업 기록 계속]
```

상태:
- 예정
- 진행 중
- 완료
- 취소

진행 중일 때 Primary CTA를 가장 강하게 표시.

---

# 29. Observation Card

```text
받기                     9/22
정면으로 오는 공 5회 중 4회 포구

시도 5 · 성공 4
[영상 1]
```

원칙:
- Observation Text가 가장 중요
- Skill/날짜는 Metadata
- 숫자는 기록이 있을 때만
- Coach Note는 부모용 출력과 분리

---

# 30. Skill Level Component

Skill은 Score가 아니다.

표현:

```text
받기
L3
정면으로 오는 공을 잡는다.
```

Progress 예:

```text
L1 ─── L2 ─── ● L3 ─── L4
```

### 금지
- 별점
- 75점
- A/B/C
- 선수 평균 대비 %
- Red/Green으로 잘함/못함 표시

Level의 목적은 행동 단계 설명이다.

---

# 31. Skill Change Component

```text
현재
L2 · 글러브를 공 쪽으로 댄다

↓ 변경

L3 · 정면으로 오는 공을 잡는다

근거 기록 3개
[단계 변경]
```

최종 변경 CTA는 Navy Primary.

AI Recommendation이 향후 생겨도 별도 Suggestion으로 표시하며 자동 적용하지 않는다.

---

# 32. Attendance Control

빠른 현장 조작.

```text
김민준    [출석]
이서준    [결석]
박지호    [지각]
```

Default를 무조건 출석으로 확정 저장하지 않는다.

Session 시작 시 roster를 생성한 뒤 코치가 확인 가능한 구조.

---

# 33. Class Log — 핵심 UI 규칙

Class Log는 디자인 시스템의 최우선 화면.

## 목표
한 선수 기록 `≤30초`.

### UI 우선순위

```text
선수
→ Skill
→ Observation
→ 횟수(optional)
→ Media(optional)
→ 저장하고 다음
```

### Primary CTA
`저장하고 다음`

Mobile 하단 Sticky Action 권장.

### 피할 것
- Accordion 과다
- 긴 Form
- 4 Skill 모두 강제
- Level 변경을 같은 Form에 포함
- 저장 후 List로 매번 튕김

---

# 34. Media Card

```text
[Thumbnail]

9/22 · 받기
영상 · 00:12

[보기]
```

- Thumbnail aspect ratio 통일
- Video icon
- 날짜 + Skill
- Upload state 명확히 표시

Upload 실패가 Observation Text 저장 실패로 이어지지 않도록 UX 분리.

---

# 35. Monthly Report Status

```text
미작성
Draft
승인 완료
```

Color:
- 미작성 → Neutral / Warning
- Draft → Warning
- Approved → Success

완료율은 Approved만 계산.

---

# 36. Monthly Report Visual Language

Coach UI보다 여백을 넓게.

```text
Header
Before / After
Skill 변화
이번 달 발견
지금 연습하고 있어요
다음 달 목표
가족과 5분 야구
코치 한마디
```

### Parent Output
- White 중심
- Navy title
- Blue Skill highlight
- Orange는 Next Goal / 작은 포인트
- Mascot은 footer/brand signature 정도
- A4 1페이지

---

# 37. Data Visualization

MVP에서 Chart 사용 최소화.

사용 가능:
- Progress
- 월간 Report 완료율
- Skill Level 단계

사용하지 않음:
- Radar Chart
- Player Ranking
- Team Average
- 의미 없는 Pie Chart
- 점수 기반 성장 그래프

PDS의 핵심은 분석 Dashboard가 아니라 코칭 기록이다.

---

# 38. Motion

빠르고 절제된 Motion.

```text
Fast     120ms
Normal   180ms
Slow     240ms
```

사용:
- Button
- Sheet
- Tab
- Toast
- Chip state

운동장 입력 흐름을 방해하는 긴 Animation 금지.

---

# 39. Accessibility

- Body text 대비 WCAG AA 목표
- Color만으로 상태 구분하지 않음
- Focus state 표시
- Form Label 제공
- Button text 명확
- 최소 touch 44px
- Error에 icon/text 병행
- 이미지 alt 제공
- Motion 최소화 설정 고려

---

# 40. Content / Microcopy

## 원칙
짧고 행동 중심.

좋음:
- `수업 시작`
- `기록 추가`
- `저장하고 다음`
- `단계 변경`
- `리포트 승인`

피함:
- `확인`
- `처리`
- `실행`
- 의미가 불분명한 `완료`

## Parent-facing
부정적 낙인 표현을 피하되 사실을 숨기지 않는다.

```text
아직 안 되는 것
→ 지금 연습하고 있어요
```

---

# 41. Date / Number Format

한국 서비스 기준.

```text
2026. 09. 22.
9월 22일
10:00
5회 중 4회
L3
```

같은 화면에서는 Date Format 통일.

---

# 42. Responsive Rule

Mobile에서 기능을 제거하는 것이 아니라 우선순위를 재배치한다.

### Mobile
- 1 column
- Bottom Nav
- Sticky CTA
- Bottom Sheet

### Desktop
- Sidebar
- 2 column detail 가능
- Modal
- Wider evidence panel

---

# 43. Z-Index

```text
base          0
sticky       10
dropdown     20
overlay      40
modal        50
toast        60
```

무작위 z-index 금지.

---

# 44. Design Token 예시

```css
:root {
  --color-navy-900: #071E3A;
  --color-navy-800: #0B2A4A;
  --color-navy-700: #123B63;

  --color-blue-600: #1546F5;
  --color-blue-500: #2D5BFF;
  --color-blue-100: #E8EEFF;

  --color-orange-500: #FF7A1A;
  --color-orange-100: #FFF0E5;

  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text: #111827;
  --color-text-secondary: #4B5563;
  --color-border: #E5E7EB;

  --color-success: #16805D;
  --color-warning: #B96800;
  --color-error: #C9362B;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
}
```

---

# 45. React Component Naming

권장:

```text
Button
IconButton
Input
Textarea
Select
Chip
Badge
Card
Modal
BottomSheet
Toast
EmptyState
Skeleton

PlayerCard
ClassCard
ObservationCard
MediaCard
AttendanceControl
SkillLevel
SkillProgress
SkillChangeDialog
ReportStatusBadge
ReportSection
EvidenceDrawer
```

Base UI와 PDS Domain Component를 분리한다.

---

# 46. Component Folder 방향

예:

```text
components/
  ui/
    Button
    Input
    Textarea
    Chip
    Badge
    Card
    Modal
    BottomSheet

  pds/
    PlayerCard
    ClassCard
    ObservationCard
    SkillLevel
    SkillChangeDialog
    MediaCard
    ReportStatusBadge
    EvidenceDrawer
```

디자인 시스템은 구현 구조와 이름이 연결되어야 한다.

---

# 47. Wireframe 적용 원칙

7개 화면 모두 아래 순서로 설계한다.

```text
1. Page Goal
2. Information Priority
3. Main Action
4. Domain Components
5. State
6. Error / Empty
7. Mobile
8. Desktop
```

디자인 시스템에 없는 패턴이 필요하면 화면에서 임의 생성하기보다 Design System에 먼저 추가 여부를 판단한다.

---

# 48. 화면별 핵심 Component Mapping

| Screen | Core Components |
|---|---|
| Dashboard | ClassCard, Progress, ReportStatus |
| Players | Search, FilterChip, PlayerCard |
| Player Detail | GoalCard, Tabs, ObservationCard, SkillLevel, MediaCard |
| Classes | ClassCard, AttendanceControl, SessionCard |
| Class Log | SkillChip, Textarea, CountInput, MediaAttach, StickyCTA |
| Skill Ladder | SkillLevel, SkillProgress, EvidenceCard, SkillChangeDialog |
| Monthly Report | ReportStatusBadge, MediaPicker, SkillChangeSummary, EvidenceDrawer, ReportSection |

---

# 49. Do / Don't

## Do
- Navy를 구조와 Primary Action에 사용
- Blue를 Active/Selected에 사용
- Orange를 제한된 강조에 사용
- White space 확보
- 행동 중심 문구
- Card보다 정보 위계 우선
- 모바일 한 손 조작 고려
- 실제 Observation 중심

## Don't
- 모든 곳을 TBP Blue로 채우기
- Orange CTA 남발
- 모든 요소를 pill 형태로 만들기
- 강한 Shadow 남용
- 야구 장식 아이콘 남발
- Skill을 점수화
- Player ranking
- Desktop table을 그대로 Mobile에 축소
- AI 문구와 실제 기록을 구분 없이 표시

---

# 50. Design System v0.1 Definition of Done

다음 조건을 만족하면 와이어프레임 단계로 이동한다.

- Brand color 역할 정의
- Typography scale 정의
- Spacing / Radius / Shadow 정의
- Mobile / Desktop Layout 정의
- Button / Form / Chip / Badge / Card 정의
- Navigation 정의
- State / Error / Empty / Loading 정의
- Player / Class / Observation / Skill / Media / Report Domain Component 정의
- Accessibility 원칙 정의
- Content/Microcopy 원칙 정의
- Next.js Component naming 기준 정의

이 v0.1을 기준으로 다음 단계에서 7개 화면의 Low/Mid Fidelity Wireframe을 제작한다.