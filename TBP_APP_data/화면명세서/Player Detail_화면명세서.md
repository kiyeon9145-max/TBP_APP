# PDS Round 3 — Player Detail 화면 명세서 v0.1

- 문서 ID: `SCR-PLAYER-DETAIL`
- 제품: PDS (Player Development System)
- 화면: Player Detail
- 버전: v0.1
- 우선순위: P0
- 주요 사용자: 코치
- 설계 기준: Mobile First
- 상위 문서: PDS 요구사항 명세서 v0.1 / PDS User Flow v0.1 / Players 화면 명세서 v0.1

---

## 1. 화면 목적

Player Detail은 한 선수의 **현재 상태와 성장 히스토리를 연결해서 보는 PDS의 중심 화면**이다.

이 화면에서 코치는 다음 질문에 답할 수 있어야 한다.

1. 이 선수는 누구이며 현재 어떤 클래스에 속해 있는가?
2. 지금 가장 중요한 코칭 목표는 무엇인가?
3. 받기·던지기·치기·주루 Skill은 현재 어느 단계인가?
4. 최근 수업에서 실제로 어떤 행동이 관찰되었는가?
5. 최근 어떤 영상/사진이 기록되었는가?
6. 과거 월간 리포트와 다음 목표는 무엇이었는가?

### 핵심 원칙

- Player Detail은 단순 프로필이 아니라 `선수 성장 기록의 단일 진입점`이다.
- 현재 목표를 화면 최상위 정보 중 하나로 둔다.
- 현재 상태와 과거 History를 동시에 확인할 수 있어야 한다.
- Skill은 현재 단계만 보여주는 것이 아니라 변화 이력을 보존한다.
- 관찰하지 않은 정보를 추측하거나 자동 생성하지 않는다.
- 선수의 모든 원본 데이터를 한 화면에 길게 펼치지 않고 탭/섹션으로 분리한다.
- 모바일에서 Overview만 보더라도 선수의 현재 상태를 빠르게 파악할 수 있어야 한다.

---

## 2. 진입 / 이탈 경로

### 진입

- Players → Player Card 선택
- Class Log → 선수 이름/프로필 선택
- Monthly Report → 선수 프로필 이동
- 검색 결과 → Player Detail

### 이탈

- 뒤로가기 → 이전 화면
- `수업 기록` → 해당 선수의 기록 탭
- `Skill` → Skill 탭
- `영상` → Media 탭
- `Report` → Report 탭
- `기록 추가` → Class Log 또는 선수 단독 기록 Flow
- `정보 수정` → Player Edit
- 현재 Goal 편집 → Goal Edit/Create

---

## 3. 화면 구조

Player Detail은 아래 구조를 기본으로 한다.

1. Player Header
2. Current Goal Card
3. Tab Navigation
   - Overview
   - 수업기록
   - Skill
   - 영상
   - Report
4. 탭별 Content
5. 주요 Action

### SCR-PD-001

Player Header에는 최소 이름, 학년/연령, 투/타, 현재 클래스, 선수 상태를 표시해야 한다.

### SCR-PD-002

현재 Goal은 Overview 최상단에서 확인할 수 있어야 한다.

### SCR-PD-003

현재 Goal이 없으면 `현재 목표 미설정` 상태를 명확하게 표시해야 한다.

### SCR-PD-004

Skill은 받기 / 던지기 / 치기 / 주루 4개 영역의 현재 단계를 확인할 수 있어야 한다.

### SCR-PD-005

최근 관찰 기록은 최신순으로 표시해야 한다.

### SCR-PD-006

Media와 Report는 해당 선수 데이터만 표시해야 한다.

### SCR-PD-007

선수 상태를 inactive로 변경해도 기존 성장 데이터는 유지되어야 한다.

---

## 4. Low-Fidelity Wireframe — Overview

```text
┌──────────────────────────────┐
│ ‹ 선수                [•••]   │
│                              │
│ 김민준 선수                    │
│ 초2 · 우투우타                 │
│ 강남 토요일 A반 · 활동 중       │
├──────────────────────────────┤
│ 🎯 현재 목표                   │
│ 반대발을 내디디며 던지기         │
│ 시작 9/15             [수정]   │
├──────────────────────────────┤
│ Overview | 기록 | Skill | 영상 | Report
├──────────────────────────────┤
│ 현재 Skill                    │
│                              │
│ 받기      ●●●○   Level 3  >   │
│ 던지기    ●●○○   Level 2  >   │
│ 치기      ●●●○   Level 3  >   │
│ 주루      ●●○○   Level 2  >   │
├──────────────────────────────┤
│ 최근 변화                     │
│ 받기  Level 2 → Level 3 ↑     │
│ 9월 22일                      │
├──────────────────────────────┤
│ 최근 수업 기록                 │
│                              │
│ 9/22 · 강남 A반               │
│ [받기] 정면 포구 5회 중 5회     │
│                              │
│ 9/22 · 강남 A반               │
│ [던지기] 반대발 사용 4/5        │
│                         [더보기]│
├──────────────────────────────┤
│ 최근 영상                     │
│ [썸네일] [썸네일] [썸네일]      │
│                         [더보기]│
├──────────────────────────────┤
│ 최근 리포트                   │
│ 9월 Monthly Report · Approved │
│ 다음 목표: 반대발 내딛기         │
│                         [보기] │
├──────────────────────────────┤
│        [ + 기록 추가 ]         │
└──────────────────────────────┘
```

---

## 5. Player Header

### CMP-PD-001 — Player Header

필수 표시:
- 선수 이름
- 학년 또는 연령
- 투/타
- 현재 클래스
- 상태 (`active` / `inactive`)

선택:
- 프로필 사진

Action:
- 뒤로가기
- `•••` More Menu

### More Menu MVP

- 선수 정보 수정
- 상태 변경

MVP에서 영구 삭제는 제공하지 않는다.

---

## 6. Current Goal

### CMP-PD-002 — Current Goal Card

표시:
- 현재 Goal title
- Goal 시작일
- 편집 Action

예:
`🎯 반대발을 내디디며 던지기`

### Goal 정책

한 시점에 Player Detail의 대표 Current Goal은 **1개**를 기본으로 한다.

이유:
- 코치가 다음 수업에서 가장 집중해야 할 행동을 명확하게 하기 위함.
- Monthly Report의 `다음 달 목표 1개` 정책과 연결.

여러 보조 목표 기능은 향후 확장 가능.

### Goal 상태

- `current`
- `achieved`
- `replaced`
- `cancelled`

### ACT-PD-001 — Goal 변경

새 Goal을 Current로 지정하면 기존 Current Goal을 삭제하지 않는다.

기존 Goal:
`current → achieved/replaced/cancelled`

신규 Goal:
`current`

Goal History를 유지한다.

---

## 7. Tab Navigation

### CMP-PD-003

탭:
1. Overview
2. 수업기록
3. Skill
4. 영상
5. Report

기본 탭:
`Overview`

모바일에서는 탭이 화면 폭을 초과할 경우 가로 스크롤 가능한 탭 UI를 허용한다. 단, 페이지 전체가 가로 스크롤되면 안 된다.

URL/라우팅 구현 시 가능하면 탭 상태를 보존할 수 있어야 한다.

예:
`/players/{player_id}?tab=skill`

---

## 8. Overview

Overview는 상세 데이터 전체가 아니라 **현재 상태 요약**을 제공한다.

### CMP-PD-004 — Skill Summary

표시:
- 받기
- 던지기
- 치기
- 주루
- 각 현재 Level

Level 예:
`Level 1~4`

현재 평가가 없으면:
`미평가`

Skill Card 선택:
→ Skill 탭의 해당 영역으로 이동

### CMP-PD-005 — Recent Change

최근 Skill Level 변경 1~3개 표시.

예:
`받기 Level 2 → Level 3 · 9/22`

변화가 없으면:
`최근 Skill 단계 변경이 없습니다.`

### CMP-PD-006 — Recent Observation

최신 Observation 3개를 기본 표시.

각 항목:
- 날짜
- 클래스
- Skill Area
- 관찰 내용
- 시도/성공 데이터가 있으면 표시

예:
`9/22 · 받기 · 정면 포구 5/5`

`더보기`:
→ 수업기록 탭

### CMP-PD-007 — Recent Media

최근 Media 최대 3개.

표시:
- Thumbnail
- 영상/사진 구분
- 날짜

선택:
→ Media 상세 또는 영상 탭

Media 없음:
`아직 등록된 영상이나 사진이 없습니다.`

### CMP-PD-008 — Recent Report

가장 최근 Monthly Report 1개.

표시:
- 기준 월
- 상태
- 다음 목표
- 보기 Action

Report 없음:
`아직 생성된 월간 리포트가 없습니다.`

---

## 9. 수업기록 탭

### 목적

해당 선수에게 누적된 실제 관찰 기록을 시간순으로 확인한다.

### CMP-PD-009 — Observation Timeline

기본 정렬:
`최신순`

각 기록:
- 날짜
- 클래스
- Skill Area
- Observation
- attempts / successes (있는 경우)
- 코치 메모
- 연결 Media 여부

예:

```text
9월 22일 · 강남 A반

[받기]
정면으로 오는 공을 끝까지 보고 잡음
5회 중 5회

[던지기]
반대발을 내디디며 던짐
5회 중 4회
```

### 필터 MVP

- 전체
- 받기
- 던지기
- 치기
- 주루

날짜 범위 필터는 향후 확장 가능.

### 기록 수정

MVP에서 본인이 작성한 Observation 수정은 허용한다.

수정 시 원본 데이터 감사 이력까지 저장할지는 Backend 설계에서 결정한다.

### 기록 삭제

실수 입력 처리 필요.

권장:
- 사용자에게는 `삭제` 제공 가능
- 실제 DB Hard Delete보다 Soft Delete 우선

최종 정책은 DB/권한 설계에서 확정.

---

## 10. Skill 탭

### 목적

현재 Skill과 단계 변화 History를 확인한다.

### CMP-PD-010 — Skill Area Card

4개 영역:
- 받기
- 던지기
- 치기
- 주루

각 영역:
- 현재 Level
- 현재 Level 행동 기준
- 최근 변경일
- History 보기
- 단계 변경 Action

예:

```text
받기

현재 Level 3
"정면으로 오는 공을 잡는다."

최근 변경
9/22 · Level 2 → Level 3

[History] [단계 변경]
```

### ACT-PD-002 — Skill 변경

Skill 변경은 코치가 직접 승인한다.

AI/Observation이 자동으로 Skill Level을 변경하면 안 된다.

변경 시:
- previous_level
- new_level
- changed_at
- reason 또는 근거 Observation
- changed_by

를 기록할 수 있어야 한다.

상세 Skill Ladder 기준은 Round 6에서 정의한다.

---

## 11. 영상 탭

### 목적

해당 선수의 사진/영상을 성장 기록과 연결해 확인한다.

### CMP-PD-011 — Media Gallery

표시:
- Thumbnail
- 날짜
- Skill Area
- Media type
- 태그

필터 MVP:
- 전체
- 받기
- 던지기
- 치기
- 주루

Action:
- Media 보기
- `+ 영상/사진 추가`

### Media 연결 정보

최소:
- player_id
- recorded_at
- skill_area
- file_url

선택:
- class_session_id
- observation_id
- tag
- coach_note

### Before / After

MVP에서는 Media에 `Before`, `After` 태그를 수동으로 붙일 수 있는 구조를 고려한다.

자동 비교/AI 자세 분석은 제외.

---

## 12. Report 탭

### 목적

해당 선수에게 발행/작성된 Monthly Report History를 확인한다.

### CMP-PD-012 — Report List

각 Report:
- 기준 월
- status
- created_at / approved_at
- 다음 목표
- 보기 Action

정렬:
`최신 월 우선`

상태:
- Draft
- Approved

Action:
- Draft → 편집
- Approved → 보기

Report 상세 작성 UX는 Round 7에서 정의한다.

---

## 13. Quick Action

### CMP-PD-013 — Add Record

CTA:
`+ 기록 추가`

목적:
수업 직후 또는 기록 보완 시 해당 선수의 Observation을 빠르게 추가한다.

가능한 진입:
- 활성 Class Session이 있으면 해당 Session의 Class Log
- 활성 Session이 없다면 별도 기록 Flow 또는 최근 수업 선택

이 정책의 상세는 Round 5 Class Log에서 확정한다.

---

## 14. 선수 정보 수정

### ACT-PD-003 — Player Edit

수정 가능 후보:
- 이름
- 생년월일
- 학년
- 투/타
- 야구 경험
- 현재 클래스
- 코치 메모

현재 클래스 변경 시 과거 Class Membership History를 덮어쓰지 않는다.

---

## 15. 선수 상태 변경

### ACT-PD-004 — Inactivate Player

`active → inactive`

확인 Modal:
`이 선수를 비활성화하시겠습니까? 기존 수업 기록, Skill, 영상, 리포트는 유지됩니다.`

비활성화 후:
- Players 기본 목록에서 제외
- Player Detail 직접 접근/비활성 필터에서는 조회 가능
- 신규 일반 수업 명단 자동 포함 제외

### Reactivate

`inactive → active`

과거 데이터를 그대로 유지한 상태에서 다시 활성화할 수 있다.

---

## 16. Empty / Error 상태

### STATE-PD-001 — Goal 없음
`현재 목표가 설정되지 않았습니다.`
Action: `목표 설정`

### STATE-PD-002 — Skill 미평가
각 Skill에 `미평가`

### STATE-PD-003 — Observation 없음
`아직 수업 기록이 없습니다.`

### STATE-PD-004 — Media 없음
`아직 등록된 영상이나 사진이 없습니다.`

### STATE-PD-005 — Report 없음
`아직 생성된 월간 리포트가 없습니다.`

### ERR-PD-001 — Player 로드 실패
`선수 정보를 불러오지 못했습니다.`
Action: `다시 시도`

### ERR-PD-002 — 존재하지 않는 Player
`선수를 찾을 수 없습니다.`
Action: `선수 목록으로`

### ERR-PD-003 — 권한 없음
해당 선수에 대한 접근 권한이 없는 경우 상세 데이터를 노출하지 않는다.

---

## 17. 모바일 UX 요구사항

### UX-PD-001
Header + Current Goal은 Overview 진입 후 빠르게 확인 가능해야 한다.

### UX-PD-002
탭은 모바일에서 터치하기 쉬워야 한다.

### UX-PD-003
Observation의 긴 메모는 기본적으로 적절히 접거나 줄바꿈한다.

### UX-PD-004
Skill 4개는 작은 화면에서도 각 영역과 Level을 혼동하지 않아야 한다.

### UX-PD-005
영상 썸네일은 페이지 레이아웃을 깨뜨리지 않아야 한다.

### UX-PD-006
주요 CTA의 터치 영역은 최소 44px 높이를 권장한다.

### UX-PD-007
Player Detail 페이지 자체는 가로 스크롤이 없어야 한다.

---

## 18. 데이터 요구사항

### Player
- id
- name
- birth_date
- grade
- throws
- bats
- experience
- status
- coach_note

### Class Membership
- id
- player_id
- class_id
- started_at
- ended_at
- status

### Goal
- id
- player_id
- title
- status
- started_at
- ended_at
- created_by

### Observation
- id
- player_id
- class_session_id
- skill_area
- observation_text
- attempts
- successes
- coach_note
- observed_at

### Skill Progress
- id
- player_id
- skill_area
- previous_level
- current_level
- changed_at
- reason
- changed_by

### Media
- id
- player_id
- class_session_id
- observation_id
- media_type
- file_url
- recorded_at
- skill_area
- tag
- coach_note

### Monthly Report
- id
- player_id
- year_month
- status
- next_goal
- created_at
- approved_at

---

## 19. 데이터 일관성 규칙

### DATA-PD-001
Current Goal은 Player별 대표 1개만 존재하도록 관리한다.

### DATA-PD-002
Skill 변경 시 기존 Skill History를 덮어쓰지 않는다.

### DATA-PD-003
Class 변경 시 과거 Membership History를 유지한다.

### DATA-PD-004
inactive 전환 시 관련 성장 데이터를 삭제하지 않는다.

### DATA-PD-005
Observation은 해당 player_id와 올바른 Class Session 관계를 가져야 한다.

### DATA-PD-006
Monthly Report는 해당 선수 데이터만 참조해야 한다.

---

## 20. 개인정보 / 권한 원칙

### PRIV-PD-001
Player Detail은 Players 목록보다 상세한 정보를 포함하므로 인증된 코치만 접근한다.

### PRIV-PD-002
MVP에서 보호자 연락처를 표시할 필요가 없다면 화면에서 제외한다.

### PRIV-PD-003
Media는 선수 개인 데이터이므로 공개 URL로 무제한 노출하는 구조를 피한다.

Storage/Auth 상세 정책은 Backend 설계에서 정의한다.

---

## 21. MVP 포함 / 제외

### MVP 포함
- Player Header
- Current Goal 1개
- Overview
- Observation Timeline
- Skill 4개 현재 Level + History
- Media Gallery
- Report History
- Player Edit 진입
- active/inactive
- 기록 추가 진입
- Empty/Error 상태

### MVP 제외
- AI 선수 종합 평가 점수
- 선수 간 비교
- 자동 성장 예측
- AI 영상 자세 분석
- 부모용 Player Detail
- 선수 로그인
- 복잡한 그래프
- 코치 간 내부 댓글
- 보호자 채팅
- 의료/건강 기록 관리

---

## 22. Acceptance Criteria

### AC-PD-001
Given 유효한 player_id로 진입했을 때,  
Then 선수 이름, 학년/연령, 투/타, 현재 클래스, 상태를 확인할 수 있어야 한다.

### AC-PD-002
Given Current Goal이 존재할 때,  
Then Overview 상단에서 목표와 시작일을 확인할 수 있어야 한다.

### AC-PD-003
Given Current Goal이 없을 때,  
Then `현재 목표 미설정`과 목표 설정 Action을 표시해야 한다.

### AC-PD-004
Given Skill 데이터가 존재할 때,  
Then 받기/던지기/치기/주루의 현재 Level을 확인할 수 있어야 한다.

### AC-PD-005
Given Skill 평가가 없는 영역이 있을 때,  
Then 임의 Level을 표시하지 않고 `미평가`로 표시해야 한다.

### AC-PD-006
Given Observation이 여러 개 존재할 때,  
Then 최근 기록은 최신순으로 표시되어야 한다.

### AC-PD-007
Given Overview일 때,  
Then 최근 Observation 최대 3개를 요약하고 더보기로 전체 기록에 진입할 수 있어야 한다.

### AC-PD-008
Given Skill Level이 변경되었을 때,  
Then 이전 단계 이력이 삭제되지 않아야 한다.

### AC-PD-009
Given 선수를 inactive로 변경했을 때,  
Then 과거 Observation, Skill, Media, Report 데이터가 유지되어야 한다.

### AC-PD-010
Given Media가 없을 때,  
Then 깨진 Gallery가 아니라 정상 Empty State를 표시해야 한다.

### AC-PD-011
Given Report가 존재할 때,  
Then 최신 월 우선으로 Report History를 확인할 수 있어야 한다.

### AC-PD-012
Given 모바일 환경일 때,  
Then Overview의 핵심 정보와 탭을 가로 페이지 스크롤 없이 사용할 수 있어야 한다.

### AC-PD-013
Given 새로운 Goal을 Current로 설정했을 때,  
Then 기존 Current Goal은 History에 남고 대표 Current Goal은 하나만 유지되어야 한다.

### AC-PD-014
Given 현재 클래스가 변경되었을 때,  
Then 과거 Class Membership 이력이 유지되어야 한다.

---

## 23. 이후 라운드 연결 메모

### Round 4 — Classes
- Class 기본정보
- 소속 선수
- 수업 일정
- Class Session
- 출결

### Round 5 — Class Log
- `+ 기록 추가`의 실제 입력 UX
- Observation 작성/수정
- attempts / successes
- Media 첨부
- 30초 기록 목표

### Round 6 — Skill Ladder
- Level 1~4의 정확한 행동 기준
- 단계 변경 UX
- Skill History
- Starter / Basic / Advanced 확장

### Round 7 — Monthly Report
- Report 생성/편집
- AI Draft
- Before/After
- Approved
- 다음 Goal 연결

Player Detail은 위 데이터를 연결하는 허브 역할만 하며 세부 정책은 각 라운드에서 확정한다.

---

## 24. Round 3 결정사항 요약

- Player Detail은 PDS의 `선수 성장 기록 허브`다.
- Overview 최상단에 Current Goal을 둔다.
- 대표 Current Goal은 한 번에 1개를 기본으로 한다.
- 탭은 Overview / 수업기록 / Skill / 영상 / Report 5개다.
- Overview에는 현재 Skill, 최근 변화, 최근 기록, 최근 Media, 최근 Report를 요약한다.
- Skill과 Goal History는 덮어쓰지 않는다.
- 클래스 변경도 Membership History로 보존한다.
- inactive 전환은 데이터 삭제가 아니다.
- AI 평가 점수나 자동 Skill 승급은 MVP에서 제외한다.
