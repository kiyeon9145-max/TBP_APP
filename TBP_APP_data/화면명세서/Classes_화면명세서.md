# PDS Round 4 — Classes 화면 명세서 v0.1

- 문서 ID: `SCR-CLASSES`
- 제품: PDS (Player Development System)
- 화면: Classes
- 버전: v0.1
- 우선순위: P0
- 주요 사용자: 코치
- 설계 기준: Mobile First
- 상위 문서: PDS 요구사항 명세서 v0.1 / PDS User Flow v0.1 / Dashboard·Players·Player Detail 화면 명세서

---

## 1. 화면 목적

Classes는 코치가 운영하는 **반(Class)의 구성과 실제 수업(Session)을 관리하는 화면**이다.

이 화면은 두 개념을 명확하게 구분해야 한다.

- `Class` = 반복 운영되는 반/그룹
- `Class Session` = 특정 날짜에 실제로 진행되는 한 번의 수업

예:

```text
Class
강남 토요일 A반
매주 토요일 10:00
정원 10명

↓

Class Session
2026-09-22 10:00
출석 8 / 결석 2
진행 상태: completed
```

### 핵심 질문

1. 내가 운영하는 클래스는 무엇인가?
2. 각 클래스에는 누가 소속되어 있는가?
3. 오늘/다음 수업은 언제인가?
4. 수업을 시작하면 어떤 선수들이 기록 대상이 되는가?
5. 지난 수업의 출결과 기록 완료 상태는 어떠한가?

### 핵심 원칙

- Class와 Class Session을 같은 데이터로 취급하지 않는다.
- 클래스 정보 수정이 과거 Session 기록을 훼손하면 안 된다.
- 현재 소속 선수와 과거 소속 이력을 구분한다.
- 출결은 Session 단위로 관리한다.
- 수업 시작은 Class Log 진입의 시작점이다.
- 일정/예약 관리 SaaS로 확장하지 않고 코칭 기록에 필요한 수준으로 MVP를 제한한다.

---

## 2. 화면 범위

Round 4의 `Classes`는 하나의 상위 메뉴 안에서 아래 상태를 포함한다.

1. Class List
2. Class Detail
3. Session List / History
4. Session 시작 전 선수 확인
5. 출결 상태
6. Class Create / Edit 진입

별도의 복잡한 캘린더 화면은 MVP에서 필수로 하지 않는다.

---

## 3. 진입 / 이탈 경로

### 진입

- Dashboard 오늘 수업 카드
- Global Navigation `수업`
- Player Detail의 현재 클래스
- Class 관련 링크

### 이탈

- Class 선택 → Class Detail
- 선수 선택 → Player Detail
- `수업 시작` → Class Log
- 과거 Session 선택 → Session Summary / Class Log 기록 조회
- `클래스 추가` → Class Create
- `클래스 수정` → Class Edit

---

## 4. Class List 정보 구조

1. Header — `수업`
2. 오늘 수업 요약
3. Class List
4. `+ 클래스 추가`
5. Global Navigation

### SCR-CLASS-001

Class List에는 기본적으로 `active` Class만 표시한다.

### SCR-CLASS-002

각 Class Card에는 최소 다음 정보를 표시한다.

- 클래스명
- 기본 요일/시간
- 현재 선수 수 / 정원
- 다음 Session
- 상태

### SCR-CLASS-003

Class Card 선택 시 Class Detail로 이동한다.

### SCR-CLASS-004

오늘 Session이 있는 Class에는 `오늘 수업` 상태를 표시할 수 있어야 한다.

---

## 5. Low-Fidelity Wireframe — Class List

```text
┌──────────────────────────────┐
│ 수업                  [+ 클래스]│
│                              │
│ 오늘 · 9월 22일               │
│ 2개 수업 예정                  │
├──────────────────────────────┤
│ TODAY                        │
│ 강남 토요일 A반               │
│ 10:00 · 선수 8/10명           │
│                    [수업 시작] │
├──────────────────────────────┤
│ 강남 토요일 B반               │
│ 매주 토요일 12:00             │
│ 선수 10/10명                  │
│ 다음 수업 · 오늘 12:00      >  │
├──────────────────────────────┤
│ 평일 엘리트 A반               │
│ 매주 화·목 18:00              │
│ 선수 6/8명                    │
│ 다음 수업 · 9/24 18:00     >  │
├──────────────────────────────┤
│ 홈      선수      수업    리포트 │
└──────────────────────────────┘
```

---

## 6. Class Detail 정보 구조

1. Class Header
2. 클래스 기본 정보
3. 다음/오늘 Session
4. 현재 소속 선수
5. 최근 Session History
6. Class Edit

### Low-Fidelity Wireframe — Class Detail

```text
┌──────────────────────────────┐
│ ‹ 수업                [•••]   │
│                              │
│ 강남 토요일 A반               │
│ 매주 토요일 10:00             │
│ 강남센터 · 정원 10명           │
├──────────────────────────────┤
│ 다음 수업                     │
│ 9월 22일 10:00                │
│ 예정 선수 8명                  │
│        [ 수업 시작 ]           │
├──────────────────────────────┤
│ 현재 선수             8 / 10  │
│                              │
│ 김민준 · 초2                >  │
│ 이서준 · 초4                >  │
│ 박지호 · 7세                >  │
│                        [전체] │
├──────────────────────────────┤
│ 최근 수업                     │
│                              │
│ 9/15 · 완료                   │
│ 출석 7 · 결석 1 · 기록 7/7  >  │
│                              │
│ 9/08 · 완료                   │
│ 출석 8 · 결석 0 · 기록 8/8  >  │
└──────────────────────────────┘
```

---

## 7. Class 데이터 정의

### Class

반복되는 운영 단위.

최소 필드:
- id
- name
- coach_id
- location
- capacity
- status
- created_at

일정 필드 후보:
- weekday
- default_start_time
- default_duration_minutes

복수 요일 Class가 필요하면 별도 Schedule 구조를 고려한다.

### Class status

- `active`
- `inactive`

Class를 inactive로 변경해도 과거 Session을 삭제하지 않는다.

---

## 8. Class Schedule

### CMP-CLASS-001 — Schedule

MVP에서 클래스 기본 반복 일정을 저장할 수 있다.

예:
- 토요일
- 10:00
- 120분

또는:
- 화요일 / 목요일
- 18:00
- 120분

### 일정의 역할

반복 일정은 **향후 Session을 생성하기 위한 기본값**이다.

일정 자체가 실제 수업 기록은 아니다.

### 변경 정책

기본 일정이 변경되어도 이미 완료된 과거 Session의 `scheduled_at`을 변경하지 않는다.

---

## 9. Class Session 정의

Class Session은 특정 날짜에 실제로 열리는 수업이다.

최소 필드:
- id
- class_id
- scheduled_at
- started_at
- ended_at
- status
- coach_id

### Session status

- `scheduled`
- `in_progress`
- `completed`
- `cancelled`

### DATA-CLASS-001

Class 1개는 여러 Class Session을 가질 수 있다.

### DATA-CLASS-002

Class 정보가 수정되어도 과거 Session의 날짜/출결/기록은 유지되어야 한다.

---

## 10. Session 생성 정책

MVP 구현 방식은 두 가지가 가능하다.

### 권장 방식

반복 일정에 따라 필요한 날짜의 Session을 미리 또는 요청 시 생성한다.

### 수업 시작 시

해당 날짜의 scheduled Session이 존재:
- 기존 Session 사용
- status → `in_progress`

Session이 없지만 유효한 수업:
- Session 생성
- status → `in_progress`

### ACT-CLASS-001 — Start Session

1. 해당 Class/date의 기존 활성 Session 확인
2. 중복 Session 방지
3. 예정 선수 Snapshot/출결 목록 준비
4. status를 `in_progress`
5. Class Log로 이동

---

## 11. 현재 소속 선수

### CMP-CLASS-002 — Current Roster

표시:
- 선수명
- 학년/연령
- 상태

Action:
- Player Detail 이동
- 선수 추가/소속 관리

### Class Membership

최소:
- id
- class_id
- player_id
- started_at
- ended_at
- status

상태:
- `active`
- `ended`

### DATA-CLASS-003

현재 Class에서 선수를 제외하더라도 과거 Membership과 과거 Session 기록을 삭제하지 않는다.

### 한 선수의 복수 Class

구조상 허용하는 것을 권장한다.

예:
- 토요일 기본기반
- 화요일 타격반

단, 동일 시간대 중복 등록 검증은 향후 확장 가능.

---

## 12. Session Roster / 출결

Class의 현재 Membership과 Session의 실제 참석자는 동일하지 않을 수 있다.

따라서 Session마다 출결 상태를 별도로 저장한다.

### Attendance

최소:
- id
- session_id
- player_id
- status

상태:
- `expected`
- `present`
- `absent`

향후:
- `late`
- `excused`

MVP에서는 expected / present / absent로 시작한다.

### CMP-CLASS-003 — Pre-session Roster

수업 시작 전:
- 예정 선수 목록
- 참석/결석 상태 선택

수업 중에도 수정 가능.

### DATA-CLASS-004

결석 선수는 Class Log 작성 필수 대상에서 제외한다.

---

## 13. Session Snapshot 원칙

중요한 데이터 설계 원칙.

9월 22일 A반에 김민준이 참여했다면, 이후 김민준이 A반을 퇴원하더라도 9월 22일 Session 기록에는 김민준이 남아 있어야 한다.

따라서:

`현재 Membership`만 보고 과거 Session 참가자를 계산하면 안 된다.

Session Attendance/Participant 데이터가 과거 사실을 보존해야 한다.

---

## 14. Session History

### CMP-CLASS-004 — Session History

각 Session 표시:
- 날짜/시간
- 상태
- 출석 수
- 결석 수
- 기록 완료 수 / 출석 수

예:
`9/15 · 출석 7 · 결석 1 · 기록 7/7`

Action:
- Session Summary / 기존 Class Log 조회

정렬:
`최신 Session 우선`

---

## 15. 기록 완료율

Session 기록 완료율은 출석 선수 기준으로 계산한다.

예:

- 현재 클래스 선수: 10명
- Session 예정: 9명
- 출석: 8명
- 결석: 1명
- Class Log 작성 완료: 6명

표시:
`기록 6 / 8`

결석 선수는 분모에서 제외한다.

### DATA-CLASS-005

`record_completion_rate = 기록 완료 출석 선수 수 / present 선수 수`

Observation 개수 자체가 아니라 **선수별 기록 완료 여부**가 필요하다.

구체적인 완료 기준은 Round 5 Class Log에서 확정한다.

---

## 16. Class Create / Edit

### 신규 클래스 최소 필드

- 클래스명
- 담당 코치
- 장소
- 정원
- 요일
- 시작 시간
- 수업 시간

### ACT-CLASS-002 — Create Class

저장 후:
- Class Detail 이동 권장

### ACT-CLASS-003 — Edit Class

수정:
- 클래스명
- 장소
- 정원
- 기본 일정
- 상태

과거 Session 데이터를 일괄 수정하면 안 된다.

---

## 17. Class 비활성화

### ACT-CLASS-004

`active → inactive`

의미:
- 신규 일반 Session 생성 대상에서 제외
- Class List 기본 목록에서 제외
- 과거 Session History 유지

확인 문구 예:
`이 클래스를 비활성화하시겠습니까? 기존 수업과 선수 기록은 유지됩니다.`

재활성화 가능.

---

## 18. 오늘 수업 상태

Class List에서 오늘 수업은 일반 Class보다 우선적으로 인식 가능해야 한다.

### 상태 예

- `오늘 10:00 · 예정`
- `진행 중 · 기록 6/8`
- `오늘 수업 완료`
- `취소`

### ACT-CLASS-005 — Continue Session

진행 중 Session:
`기록 계속하기`

기존 session_id를 사용해 Class Log로 이동한다.

---

## 19. Empty / Error 상태

### STATE-CLASS-001 — 클래스 없음
`아직 등록된 클래스가 없습니다.`
CTA: `+ 첫 클래스 만들기`

### STATE-CLASS-002 — 현재 선수 없음
`현재 등록된 선수가 없습니다.`
CTA: `선수 추가`

### STATE-CLASS-003 — Session History 없음
`아직 진행한 수업이 없습니다.`

### STATE-CLASS-004 — 오늘 수업 없음
`오늘 예정된 수업이 없습니다.`

### ERR-CLASS-001 — 목록 로드 실패
`수업 정보를 불러오지 못했습니다.`
Action: `다시 시도`

### ERR-CLASS-002 — Session 시작 실패
중복 Session 여부를 다시 확인하고 사용자에게 오류 표시.

---

## 20. 모바일 UX 요구사항

### UX-CLASS-001
오늘/진행 중 Session은 Class List에서 쉽게 발견할 수 있어야 한다.

### UX-CLASS-002
`수업 시작` / `기록 계속하기` CTA는 최소 44px 터치 영역을 권장한다.

### UX-CLASS-003
Class Detail에서 현재 선수와 최근 Session을 과도하게 한 화면에 모두 펼치지 않는다.

### UX-CLASS-004
긴 선수 목록은 일부 미리보기 + 전체 보기 또는 스크롤 구조를 사용한다.

### UX-CLASS-005
Class List와 Detail 모두 페이지 전체 가로 스크롤이 없어야 한다.

---

## 21. 데이터 요구사항

### Class
- id
- name
- coach_id
- location
- capacity
- status
- created_at

### Class Schedule
- id
- class_id
- weekday
- start_time
- duration_minutes
- status

### Class Membership
- id
- class_id
- player_id
- started_at
- ended_at
- status

### Class Session
- id
- class_id
- coach_id
- scheduled_at
- started_at
- ended_at
- status

### Attendance
- id
- session_id
- player_id
- status

### Class Log / Observation
- session_id
- player_id
- completion state
- observations

---

## 22. 데이터 일관성 규칙

### DATA-CLASS-006
동일 Class/date/time에 중복 활성 Session을 만들지 않는다.

### DATA-CLASS-007
과거 Session 참가자는 현재 Membership 변경에 영향을 받지 않는다.

### DATA-CLASS-008
Class 비활성화는 과거 Session을 삭제하지 않는다.

### DATA-CLASS-009
결석 선수에게 Class Log 완료를 강제하지 않는다.

### DATA-CLASS-010
Class Schedule 변경은 과거 Session에 소급 적용하지 않는다.

---

## 23. MVP 포함 / 제외

### MVP 포함
- Class List
- Class Detail
- 클래스 기본 일정
- 현재 선수 Roster
- Class Membership
- Session
- present / absent 출결
- 수업 시작
- 진행 중 수업 재진입
- Session History
- 기록 완료 수
- Class Create/Edit
- active/inactive
- Empty/Error 상태

### MVP 제외
- 복잡한 월간 캘린더
- 예약/대기자
- 보강 자동 스케줄링
- 결제/수강권
- 보호자 출결 알림
- QR 출석
- 자동 지각 판정
- 코치 교대 스케줄
- 시설 대관 관리
- 반복 일정 예외의 고급 규칙
- 여러 지점 운영 분석

---

## 24. Acceptance Criteria

### AC-CLASS-001
Given active Class가 존재할 때,  
When Classes에 진입하면,  
Then active Class 목록을 확인할 수 있어야 한다.

### AC-CLASS-002
Given 오늘 예정된 Session이 있을 때,  
Then Class List에서 오늘 수업임을 확인할 수 있어야 한다.

### AC-CLASS-003
Given Class Card가 표시될 때,  
Then 클래스명, 기본 일정, 현재 선수 수/정원, 다음 Session을 확인할 수 있어야 한다.

### AC-CLASS-004
Given Class Detail에 진입했을 때,  
Then 현재 소속 선수와 최근 Session History를 확인할 수 있어야 한다.

### AC-CLASS-005
Given 수업 시작 Action을 실행할 때,  
Then 동일 수업의 중복 Session이 생성되어서는 안 된다.

### AC-CLASS-006
Given Session이 in_progress일 때,  
Then `기록 계속하기`를 통해 동일 session_id의 Class Log로 이동해야 한다.

### AC-CLASS-007
Given 선수가 해당 Class에서 제외되었을 때,  
Then 과거 Membership과 Session 참가 기록은 유지되어야 한다.

### AC-CLASS-008
Given 선수가 결석 처리되었을 때,  
Then 해당 선수는 Session 기록 완료율의 분모에서 제외되어야 한다.

### AC-CLASS-009
Given 출석 8명 중 6명의 기록이 완료되었을 때,  
Then 기록 상태를 `6 / 8`로 표시할 수 있어야 한다.

### AC-CLASS-010
Given Class Schedule이 변경되었을 때,  
Then 완료된 과거 Session의 scheduled_at이 변경되어서는 안 된다.

### AC-CLASS-011
Given Class를 inactive로 변경했을 때,  
Then 기본 Class List에서는 제외되지만 과거 Session 데이터는 유지되어야 한다.

### AC-CLASS-012
Given 등록 Class가 0개일 때,  
Then 첫 클래스 만들기 CTA가 포함된 Empty State를 표시해야 한다.

### AC-CLASS-013
Given 모바일 환경일 때,  
Then 수업 시작/재진입과 현재 선수·최근 Session 확인을 가로 페이지 스크롤 없이 수행할 수 있어야 한다.

---

## 25. Round 5 연결 메모

Class Log에서 확정:
- Session 시작 후 선수 목록 UX
- 출석 상태 변경 위치
- 선수별 기록 완료 정의
- 한 선수에 여러 Observation
- attempts / successes
- 메모
- Media 첨부
- 저장 & 다음 선수
- 수업 종료
- 미작성 기록 처리

Classes는 `누가 언제 수업하는가`를 관리하고, Class Log는 `그 수업에서 무엇을 관찰했는가`를 관리한다.

---

## 26. Round 4 결정사항 요약

- `Class`와 `Class Session`은 반드시 분리한다.
- Class는 반복되는 반, Session은 특정 날짜의 실제 수업이다.
- 출결은 Session 단위로 저장한다.
- 현재 Membership과 과거 Session 참가자 Snapshot을 구분한다.
- 한 선수의 복수 Class 소속을 구조상 허용한다.
- 기록 완료율은 present 선수 기준으로 계산한다.
- Class/Schedule 변경은 과거 Session에 소급 적용하지 않는다.
- Class 비활성화는 데이터 삭제가 아니다.
- MVP는 코칭 기록 운영에 집중하며 예약·결제·보강·복잡한 캘린더는 제외한다.
