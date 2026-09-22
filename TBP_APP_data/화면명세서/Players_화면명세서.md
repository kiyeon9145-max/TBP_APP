# PDS Round 2 — Players 화면 명세서 v0.1

- 문서 ID: `SCR-PLAYERS`
- 제품: PDS (Player Development System)
- 화면: Players
- 버전: v0.1
- 우선순위: P0
- 주요 사용자: 코치
- 설계 기준: Mobile First
- 상위 문서: PDS 요구사항 명세서 v0.1 / PDS User Flow v0.1 / Dashboard 화면 명세서 v0.1

---

## 1. 화면 목적

Players는 등록된 선수를 **빠르게 찾고, 현재 상태를 파악하고, Player Detail로 진입하는 선수 관리 허브**다.

이 화면의 핵심 질문은 다음과 같다.

1. 내가 관리하는 선수는 누구인가?
2. 특정 선수를 얼마나 빨리 찾을 수 있는가?
3. 이 선수의 현재 목표와 최근 기록 상태는 무엇인가?
4. 신규 선수를 어떻게 등록하는가?
5. 활동 중인 선수와 비활성 선수를 어떻게 구분하는가?

### 핵심 원칙

- 선수 목록은 연락처 목록이 아니라 `성장 관리 대상 목록`이어야 한다.
- 카드에는 상세 데이터를 모두 노출하지 않고, 다음 행동에 필요한 정보만 표시한다.
- 검색은 이름 중심으로 즉시 사용할 수 있어야 한다.
- 필터는 MVP에서 꼭 필요한 수준으로 제한한다.
- 선수를 삭제하기보다 `비활성` 상태로 관리하여 과거 성장 데이터를 보존한다.
- 모바일에서 선수 검색 → 선택 → Detail 진입이 빠르게 이루어져야 한다.

---

## 2. 진입 / 이탈 경로

### 진입

- Dashboard 하단 Navigation `선수`
- Dashboard `+ 선수 등록` 완료 후 Players 또는 Player Detail
- Global Navigation `선수`

### 이탈

- 선수 카드 선택 → Player Detail
- `+ 선수 등록` → Player Create
- 클래스 필터/연결 → 해당 선수 목록 유지
- Global Navigation → Dashboard / Classes / Reports

> Player Detail의 상세 정보 구조는 Round 3에서 정의한다.

---

## 3. 핵심 사용자 시나리오

### Scenario A — 특정 선수 찾기

1. 코치가 Players에 진입한다.
2. 검색창에 `민준`을 입력한다.
3. 이름이 일치하는 선수가 실시간 또는 검색 실행 후 표시된다.
4. 김민준 선수를 선택한다.
5. Player Detail로 이동한다.

### Scenario B — 오늘 수업 전 선수 확인

1. Players에서 클래스 필터를 선택한다.
2. `강남 토요일 A반` 소속 선수만 확인한다.
3. 선수의 현재 목표를 빠르게 훑는다.
4. 필요한 선수를 선택해 Detail로 이동한다.

### Scenario C — 신규 선수 등록

1. Players에서 `+ 선수 등록`을 누른다.
2. Player Create Flow로 이동한다.
3. 기본정보를 입력한다.
4. 저장 후 신규 선수의 Player Detail 또는 Players로 돌아온다.

### Scenario D — 퇴원/휴원 선수 찾기

1. 기본 목록에서는 활동 중 선수만 본다.
2. 상태 필터에서 `비활성`을 선택한다.
3. 과거 선수를 조회한다.
4. 기존 기록은 그대로 보존된다.

---

## 4. 정보 구조

1. Header — `선수`
2. Search Bar
3. Filter / Sort
4. 선수 현황 요약
5. Player List
6. Floating / Primary `+ 선수 등록`
7. Global Navigation

### SCR-PLAYERS-001
기본 진입 시 `active` 선수만 표시해야 한다.

### SCR-PLAYERS-002
선수 이름으로 검색할 수 있어야 한다.

### SCR-PLAYERS-003
클래스와 선수 상태를 기준으로 필터링할 수 있어야 한다.

### SCR-PLAYERS-004
각 선수 카드에서 최소한 이름, 학년/나이 정보, 클래스, 현재 목표, 최근 기록일을 확인할 수 있어야 한다.

### SCR-PLAYERS-005
선수 카드를 선택하면 해당 Player Detail로 이동해야 한다.

### SCR-PLAYERS-006
비활성 선수의 과거 수업·Skill·Media·Report 데이터를 삭제해서는 안 된다.

---

## 5. Low-Fidelity Wireframe

### Mobile

```text
┌──────────────────────────────┐
│ 선수                    [+ 등록] │
│                              │
│ 🔍 선수 이름 검색              │
│                              │
│ [전체 클래스 ▾] [활동중 ▾]      │
│                              │
│ 활동 선수 20명                 │
├──────────────────────────────┤
│ 김민준 선수                    │
│ 초2 · 강남 토요일 A반           │
│ 🎯 반대발 내딛고 던지기          │
│ 최근 기록 9/22              >  │
├──────────────────────────────┤
│ 이서준 선수                    │
│ 초4 · 강남 토요일 A반           │
│ 🎯 좌우 이동 후 포구             │
│ 최근 기록 9/21              >  │
├──────────────────────────────┤
│ 박지호 선수                    │
│ 7세 · 강남 토요일 B반           │
│ 🎯 토스 공을 앞으로 보내기       │
│ 최근 기록 9/20              >  │
├──────────────────────────────┤
│                              │
│      [ + 선수 등록 ]           │
│                              │
├──────────────────────────────┤
│ 홈      선수      수업    리포트 │
└──────────────────────────────┘
```

### 검색 상태

```text
검색: "민준"

검색 결과 1명

김민준 선수
초2 · 강남 토요일 A반
🎯 반대발 내딛고 던지기
```

### 검색 결과 없음

```text
"민준호"와 일치하는 선수가 없습니다.

[검색어 지우기]
```

---

## 6. Player Card 명세

### CMP-PLAYERS-001 — Header

표시:
- 화면 제목 `선수`
- `+ 등록` Action

### CMP-PLAYERS-002 — Search Bar

Placeholder:
`선수 이름 검색`

MVP 검색 대상:
- 선수 이름

향후:
- 보호자명
- 전화번호
- 태그

검색 규칙:
- 부분 일치 허용
- 앞뒤 공백 제거
- 한글 이름 검색 지원
- 검색 결과가 0명인 경우 Empty Search State 표시

### CMP-PLAYERS-003 — Filter

MVP 필터:
1. 클래스
2. 선수 상태

클래스:
- 전체 클래스
- 코치가 관리하는 클래스 목록

상태:
- 활동 중
- 비활성
- 전체

기본값:
- 전체 클래스
- 활동 중

### CMP-PLAYERS-004 — Player Summary

표시:
- 현재 필터 조건에 해당하는 선수 수
- 예: `활동 선수 20명`

### CMP-PLAYERS-005 — Player Card

필수 표시:
- 선수 이름 + `선수`
- 학년 또는 연령
- 현재 소속 클래스
- 현재 목표 1개
- 최근 기록 날짜
- Detail 이동 표시

선택 표시:
- 프로필 사진/아바타

MVP에서는 프로필 사진이 없어도 완전히 사용할 수 있어야 한다.

### Player Card에서 제외

- 보호자 전화번호
- 상세 Skill 4개 전체
- 모든 최근 기록
- 긴 코치 메모
- 결제 상태
- 민감한 특이사항

이 정보는 목록에서 과밀하게 노출하지 않는다.

### CMP-PLAYERS-006 — Add Player CTA

- Header의 `+ 등록`
- 긴 목록 하단 또는 Floating CTA

동일한 Player Create Flow로 연결한다.

### CMP-PLAYERS-007 — Global Navigation

- 홈
- 선수
- 수업
- 리포트

현재 `선수` 활성 상태 표시.

---

## 7. 정렬 정책

### SORT-PLAYERS-001

MVP 기본 정렬:
`이름 가나다순`

이유:
- 선수를 찾는 목적에 가장 예측 가능하다.
- 최근 활동 순 정렬은 코치가 특정 선수를 찾을 때 위치가 계속 바뀔 수 있다.

### 향후 정렬

- 최근 기록순
- 등록일순
- 학년순

MVP에서는 필수 아님.

---

## 8. 선수 상태 정의

### active

현재 관리 중인 선수.

기본 Players 목록에 포함된다.

### inactive

퇴원, 장기 휴원 등 현재 수업 관리 대상이 아닌 선수.

기본 목록에서 제외되지만 상태 필터로 조회할 수 있다.

### STATUS-PLAYERS-001

선수를 inactive로 변경해도 아래 데이터는 유지해야 한다.

- Player 기본정보
- Class History
- Class Log / Observation
- Skill History
- Media
- Monthly Report
- Goal History

### 삭제 정책

MVP에서 일반 코치에게 영구 삭제 기능을 기본 제공하지 않는다.

잘못 등록된 중복 데이터 등의 영구 삭제 정책은 관리자 기능에서 별도 정의한다.

---

## 9. 신규 선수 등록 진입

Players 화면에서는 등록 Form 전체를 펼치지 않는다.

`+ 선수 등록` 선택 시 별도 Player Create Flow로 이동한다.

MVP Player Create 최소 필드 후보:
- 이름
- 생년월일 또는 학년
- 투/타
- 야구 경험
- 클래스
- 초기 Skill 또는 미평가
- 현재 목표
- 코치 특이사항

상세 필드/Validation은 Player Detail 및 Player Create 설계 시 확정한다.

---

## 10. Empty / Error 상태

### STATE-PLAYERS-001 — 등록 선수 0명

표시:
`아직 등록된 선수가 없습니다.`

설명:
`첫 선수를 등록하고 성장 기록을 시작해보세요.`

CTA:
`+ 첫 선수 등록`

### STATE-PLAYERS-002 — 검색 결과 0명

표시:
`검색어와 일치하는 선수가 없습니다.`

Action:
`검색어 지우기`

### STATE-PLAYERS-003 — 필터 결과 0명

표시:
`선택한 조건에 해당하는 선수가 없습니다.`

Action:
`필터 초기화`

### ERR-PLAYERS-001 — 목록 로드 실패

표시:
`선수 목록을 불러오지 못했습니다.`

Action:
`다시 시도`

### ERR-PLAYERS-002 — 검색/필터 처리 실패

기존 목록을 가능한 한 유지하고 오류 안내를 표시한다.

---

## 11. 주요 인터랙션

### ACT-PLAYERS-001 — 선수 검색

Input:
- search keyword

Output:
- 일치하는 Player Card 목록

검색 시 기존 클래스/상태 필터 조건을 유지한다.

### ACT-PLAYERS-002 — 클래스 필터

선택한 클래스에 현재 소속된 선수만 표시한다.

과거 클래스 소속 이력만 있는 선수는 현재 클래스 필터 결과에 포함하지 않는다.

### ACT-PLAYERS-003 — 상태 필터

active / inactive / all 상태에 맞춰 목록을 갱신한다.

### ACT-PLAYERS-004 — Player Detail 진입

선수 카드 전체를 탭 가능한 영역으로 사용한다.

선택한 `player_id`를 기준으로 Player Detail로 이동한다.

### ACT-PLAYERS-005 — 선수 등록

Player Create Flow로 이동한다.

---

## 12. 모바일 요구사항

### UX-PLAYERS-001

검색창은 화면 상단에서 쉽게 발견할 수 있어야 한다.

### UX-PLAYERS-002

선수 카드 전체가 터치 가능해야 한다.

### UX-PLAYERS-003

필터는 모바일에서 한 줄 또는 간단한 Bottom Sheet/Dropdown으로 사용할 수 있어야 한다.

### UX-PLAYERS-004

현재 목표가 너무 길면 최대 1~2줄까지만 표시하고 말줄임 처리한다.

### UX-PLAYERS-005

선수 카드에서 가장 시각적으로 우선되는 정보는 `선수 이름`과 `현재 목표`다.

### UX-PLAYERS-006

가로 스크롤 없이 주요 정보를 확인할 수 있어야 한다.

### UX-PLAYERS-007

프로필 사진이 없는 경우에도 레이아웃이 깨지면 안 된다.

---

## 13. 데이터 요구사항

### Player

최소 조회:
- id
- name
- birth_date 또는 grade
- status
- current_goal_id
- created_at

### Current Class Membership

- player_id
- class_id
- class_name
- membership_status

### Goal

- id
- player_id
- title
- status
- started_at

목록에서는 `current` Goal 1개만 표시한다.

### Recent Observation

- player_id
- observed_at

목록에서는 최근 기록 날짜만 필요하다.

### Derived Data

- 필터 조건에 해당하는 선수 수
- 현재 클래스명
- 현재 Goal
- 최근 기록일

---

## 14. 성능 / 목록 처리

### PERF-PLAYERS-001

일반적인 소규모 아카데미 기준 수십~수백 명의 선수 목록에서 검색/필터가 불편하지 않아야 한다.

### PERF-PLAYERS-002

MVP에서는 초기 데이터 규모가 작다면 단순 Pagination 또는 제한된 전체 조회를 사용할 수 있다.

### PERF-PLAYERS-003

데이터가 커질 것을 고려하여 UI가 무한히 모든 상세 데이터를 한 번에 요청하는 구조는 피한다.

Player Card에 필요한 최소 데이터만 목록 API/Query에서 조회한다.

---

## 15. 개인정보 노출 원칙

### PRIV-PLAYERS-001

Players 목록에서는 보호자 연락처 등 불필요한 개인정보를 표시하지 않는다.

### PRIV-PLAYERS-002

코치 내부 특이사항이 민감할 수 있으므로 목록 카드에는 노출하지 않는다.

### PRIV-PLAYERS-003

선수 프로필 사진은 MVP 필수 필드가 아니다.

---

## 16. MVP 포함 / 제외

### MVP 포함

- 활동 선수 목록
- 이름 검색
- 클래스 필터
- active / inactive 필터
- 이름 가나다순
- Player Card
- 현재 목표
- 최근 기록일
- Player Detail 진입
- 신규 선수 등록 진입
- Empty / Error 상태
- Mobile navigation

### MVP 제외

- 다중 선수 일괄 편집
- 보호자 연락처 검색
- 선수 태그 시스템
- 즐겨찾기
- 복잡한 정렬
- 선수 비교
- 선수 성장 점수
- CSV 대량 업로드
- 프로필 사진 필수화
- 영구 삭제
- 결제 상태

---

## 17. Acceptance Criteria

### AC-PLAYERS-001
Given 활동 중 선수가 존재할 때,  
When Players 화면에 진입하면,  
Then active 선수만 기본 목록에 표시되어야 한다.

### AC-PLAYERS-002
Given 여러 선수가 등록되어 있을 때,  
When 이름 일부를 검색하면,  
Then 해당 문자열과 일치하는 선수만 표시되어야 한다.

### AC-PLAYERS-003
Given 클래스 필터를 선택했을 때,  
When 목록이 갱신되면,  
Then 해당 클래스의 현재 소속 선수만 표시되어야 한다.

### AC-PLAYERS-004
Given 상태 필터를 `비활성`으로 변경했을 때,  
When 목록이 갱신되면,  
Then inactive 선수만 표시되어야 한다.

### AC-PLAYERS-005
Given Player Card가 표시될 때,  
Then 이름, 학년/연령, 클래스, 현재 목표, 최근 기록일을 확인할 수 있어야 한다.

### AC-PLAYERS-006
Given 선수를 선택했을 때,  
When Player Card를 탭하면,  
Then 해당 player_id의 Player Detail로 이동해야 한다.

### AC-PLAYERS-007
Given 선수가 inactive로 변경되었을 때,  
Then 과거 Class Log, Skill, Media, Report 데이터는 유지되어야 한다.

### AC-PLAYERS-008
Given 검색 결과가 없을 때,  
Then 오류 화면 대신 검색 결과 없음 상태와 검색어 지우기 Action을 제공해야 한다.

### AC-PLAYERS-009
Given 등록 선수가 0명일 때,  
Then 첫 선수 등록 CTA가 포함된 Empty State를 표시해야 한다.

### AC-PLAYERS-010
Given 모바일 환경일 때,  
Then 가로 스크롤 없이 검색, 필터, 선수 선택, 신규 등록이 가능해야 한다.

### AC-PLAYERS-011
Given 현재 Goal이 없는 선수일 때,  
Then UI가 깨지지 않고 `현재 목표 미설정` 등 명확한 상태를 표시해야 한다.

### AC-PLAYERS-012
Given 최근 Observation이 없는 신규 선수일 때,  
Then `기록 없음` 상태를 표시해야 한다.

---

## 18. Round 3 연결 메모

Player Detail에서 상세 정의할 항목:
- 선수 기본 프로필
- 현재 Goal
- Overview
- 수업 기록 Timeline
- Skill History
- Media
- Monthly Report History
- 선수 정보 수정
- active/inactive 상태 변경
- Goal 변경/History

Players에서는 위 정보를 요약만 하고 상세 편집하지 않는다.

---

## 19. Round 2 결정사항 요약

- Players는 단순 명단이 아니라 `성장 관리 대상 탐색 화면`이다.
- 기본 목록은 active 선수만 보여준다.
- 검색은 이름 중심으로 단순하게 시작한다.
- MVP 필터는 클래스 + 상태만 사용한다.
- 기본 정렬은 이름 가나다순이다.
- Player Card의 핵심은 이름 + 클래스 + 현재 목표 + 최근 기록일이다.
- 민감한 개인정보와 긴 코치 메모는 목록에서 제외한다.
- 선수 퇴원 시 삭제하지 않고 inactive로 전환해 성장 데이터를 보존한다.
- 상세 성장 데이터와 편집은 Round 3 Player Detail에서 정의한다.
