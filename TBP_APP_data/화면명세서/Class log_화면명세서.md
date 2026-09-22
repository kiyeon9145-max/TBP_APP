# PDS Round 5 — Class Log 화면 명세서 v0.1

- 문서 ID: `SCR-CLASS-LOG`
- 제품: PDS (Player Development System)
- 화면: Class Log
- 버전: v0.1
- 우선순위: P0 / Core
- 주요 사용자: 코치
- 설계 기준: Mobile First / Field First
- 핵심 성능 목표: 선수 1명 기록 30초 이내
- 상위 문서: PDS 요구사항 명세서 v0.1 / PDS User Flow v0.1 / Round 1~4 화면 명세서

---

## 1. 화면 목적

Class Log는 실제 수업 현장에서 코치가 **선수별 관찰 내용을 가장 빠르게 남기는 PDS의 핵심 입력 화면**이다.

PDS 전체 가치의 출발점은 이 화면에서 생성되는 Observation이다.

```text
Class Session
    ↓
Player
    ↓
Observation
    ↓
Skill / Media
    ↓
Monthly Report
    ↓
Next Goal
```

### 핵심 질문

1. 오늘 출석한 선수 중 누구를 기록해야 하는가?
2. 어떤 기술을 관찰했는가?
3. 실제로 어떤 행동이 나타났는가?
4. 시도/성공 횟수를 기록할 필요가 있는가?
5. 영상/사진을 연결할 것인가?
6. 누구의 기록이 아직 남았는가?

### 핵심 원칙

- 선수 1명 기록 목표: **30초 이내**
- 필수 입력을 최소화한다.
- 한 선수에게 한 수업에서 여러 Observation을 허용한다.
- 관찰하지 않은 기술은 억지로 입력하지 않는다.
- 모든 Skill을 매 수업 기록하도록 강제하지 않는다.
- 성공/시도 횟수는 필요할 때만 입력한다.
- Skill Level은 Class Log에서 자동 승급하지 않는다.
- 영상은 선택 사항이다.
- 저장 후 다음 선수로 빠르게 이동할 수 있어야 한다.
- 결석 선수는 기록 완료 대상에서 제외한다.

---

## 2. 핵심 사용자 Flow

```text
Class Session 시작
    ↓
출석 선수 확인
    ↓
선수 선택
    ↓
Skill 선택
    ↓
관찰 내용 입력
    ↓
(선택) 시도 / 성공
    ↓
(선택) Media
    ↓
저장
    ↓
다음 Observation 추가 OR 다음 선수
    ↓
미작성 선수 확인
    ↓
수업 종료
```

### 목표 Tap Flow

일반적인 기록은 다음 수준을 목표로 한다.

```text
선수 선택
→ Skill 선택
→ 관찰 입력
→ 저장 & 다음
```

정량 데이터와 영상이 필요하지 않은 경우 4단계 내외로 기록을 완료할 수 있어야 한다.

---

## 3. 진입 경로

- Dashboard → `수업 시작`
- Dashboard → `기록 계속하기`
- Classes → Session → `수업 시작`
- Classes → 진행 중 Session → `기록 계속하기`
- Player Detail → `+ 기록 추가`
- Dashboard → `미작성 기록`

### 필수 Context

Class Log 진입 시 가능하면 아래 Context를 이미 알고 있어야 한다.

- session_id
- class_id
- class_name
- session_date/time
- coach_id
- Attendance

사용자가 Class Log에서 다시 클래스와 날짜를 반복 입력하지 않도록 한다.

---

## 4. 화면 구조

Class Log는 두 단계 UI로 구성한다.

### A. Session Player List

- Session 정보
- 기록 진행률
- 출석 선수 목록
- 선수별 기록 상태
- 수업 종료

### B. Player Quick Log

- 선수 정보
- Current Goal
- Skill 선택
- Observation 입력
- attempts / successes
- Media
- 저장 & 다음 선수

---

## 5. Low-Fidelity Wireframe — Session Player List

```text
┌──────────────────────────────┐
│ ‹ 수업       강남 A반   [종료] │
│ 9월 22일 · 10:00              │
│                              │
│ 기록 5 / 8명                  │
│ ████████████░░░░░             │
├──────────────────────────────┤
│ 출석 선수                     │
│                              │
│ ✓ 김민준       기록 완료    >  │
│ ✓ 이서준       2개 기록     >  │
│ ○ 박지호       미작성       >  │
│ ○ 최도윤       미작성       >  │
│ ✓ 정우진       기록 완료    >  │
│                              │
│ ──────────────────────────── │
│ 결석                          │
│ — 한지호       결석           │
├──────────────────────────────┤
│ 🔴 미작성 3명                  │
│                              │
│      [ 다음 미작성 선수 ]       │
└──────────────────────────────┘
```

---

## 6. Low-Fidelity Wireframe — Player Quick Log

```text
┌──────────────────────────────┐
│ ‹ 선수 목록         3 / 8     │
│                              │
│ 박지호 선수 · 7세              │
│ 🎯 토스 공을 앞으로 보내기       │
├──────────────────────────────┤
│ 무엇을 관찰했나요?              │
│                              │
│ [받기] [던지기] [치기] [주루]    │
│                              │
│ 선택: 치기                     │
├──────────────────────────────┤
│ 관찰 내용 *                    │
│ ┌──────────────────────────┐ │
│ │ 토스 공을 앞으로 강하게 보냄 │ │
│ └──────────────────────────┘ │
│                              │
│ 빠른 문구                     │
│ [토스 공 맞춤] [정타] [타이밍]   │
├──────────────────────────────┤
│ 시도 / 성공          선택       │
│ [ 10 ] 회 중 [ 6 ] 회          │
├──────────────────────────────┤
│ 📎 사진/영상 추가       선택     │
├──────────────────────────────┤
│ [ + 같은 선수 기록 추가 ]       │
│                              │
│      [ 저장 & 다음 선수 ]        │
└──────────────────────────────┘
```

---

## 7. Session Header

### CMP-LOG-001

표시:
- 클래스명
- 날짜 / 시간
- Session 상태
- 기록 완료 선수 수 / 출석 선수 수
- 수업 종료 Action

예:
`강남 A반 · 9/22 10:00 · 기록 5/8`

### DATA-LOG-001

기록 진행률의 분모는 `present` 선수 수다.

결석 선수는 제외한다.

---

## 8. Player List

### CMP-LOG-002 — Session Player List

출석 선수별 표시:
- 선수명
- 기록 상태
- Observation 개수
- 이동 아이콘

### 기록 상태

#### `not_started`
Observation 0개

표시:
`미작성`

#### `complete`
최소 1개의 유효한 Observation이 저장됨

표시:
`기록 완료` 또는 `2개 기록`

### MVP 기록 완료 정의

**출석 선수에게 최소 1개의 유효한 Observation이 저장되면 해당 선수 기록은 완료로 본다.**

이유:
- 매 수업 모든 기술을 기록하는 것은 현장 부담이 큼.
- PDS의 목적은 의미 있는 관찰 누적이지 체크리스트 채우기가 아님.

### DATA-LOG-002

Observation이 여러 개 있어도 기록 완료 선수 수는 1명으로 계산한다.

---

## 9. 출결 변경

### CMP-LOG-003

Class Log에서도 수업 중 출결을 수정할 수 있어야 한다.

예:
- expected → present
- expected → absent
- absent → present

### 규칙

- absent가 되면 기록 완료 분모에서 제외
- present로 변경하면 기록 대상에 포함
- 이미 Observation이 있는 선수를 absent로 바꾸려는 경우 확인 필요

권장 확인:
`이 선수에게 이미 수업 기록이 있습니다. 결석으로 변경하시겠습니까?`

기존 Observation을 자동 삭제하지 않는다.

---

## 10. Player Quick Log Header

### CMP-LOG-004

표시:
- 선수명
- 학년/연령
- 현재 Goal
- 현재 순서 / 출석 선수 수

예:
`박지호 · 3/8`

Current Goal은 현장에서 코치가 오늘의 코칭 포인트를 바로 떠올릴 수 있도록 표시한다.

Goal이 없으면:
`현재 목표 미설정`

---

## 11. Skill 선택

### CMP-LOG-005

4개 기술:
- 받기
- 던지기
- 치기
- 주루

MVP에서는 Observation 하나당 `skill_area` 1개를 선택한다.

### 필수 여부

Skill Area:
**필수**

### 이유

Monthly Report 및 Skill별 History를 만들기 위해 Observation이 어떤 영역에 속하는지 최소한의 구조화가 필요하다.

### 내부 값 예

- `catching`
- `throwing`
- `hitting`
- `baserunning`

Parent-facing 문구는:
- 받기
- 던지기
- 치기
- 주루

---

## 12. Observation 입력

### CMP-LOG-006

필드:
`관찰 내용`

필수:
**Yes**

### 작성 원칙

평가형 문장보다 행동형 문장을 사용한다.

좋음:
- `정면 공을 끝까지 보고 잡음`
- `반대발을 내디디며 던짐`
- `토스 공을 앞으로 강하게 보냄`

피함:
- `잘했음`
- `많이 늘었음`
- `집중력이 좋았음`

### Validation

- 공백만 입력 금지
- 지나치게 긴 입력은 허용하되 현장 UX에서는 짧은 기록 권장
- AI가 없는 MVP에서도 직접 입력 가능해야 함

---

## 13. Quick Phrase

### CMP-LOG-007

반복 입력 시간을 줄이기 위한 선택 기능.

Skill 선택 후 해당 기술의 자주 쓰는 관찰 문구를 버튼으로 제공할 수 있다.

예 — 치기:
- 토스 공 맞춤
- 정타
- 타이밍 빠름
- 타이밍 늦음
- 앞으로 강하게 보냄

### MVP 정책

Quick Phrase는 있으면 유용하지만, 고정된 평가 기준으로 사용하지 않는다.

버튼 선택 시 Observation 필드에 문구를 입력하거나 추가한다.

향후 코치별 커스텀 Phrase 가능.

---

## 14. Attempts / Successes

### CMP-LOG-008

선택 입력.

예:
`10회 중 6회`

저장:
- attempts = 10
- successes = 6

### Validation

- 0 이상의 정수
- successes ≤ attempts
- attempts가 비어 있으면 successes 단독 입력 불가
- 둘 다 비워도 저장 가능

### 표시 원칙

정량 측정이 의미 있는 훈련에서만 사용한다.

모든 Observation에 강제하지 않는다.

---

## 15. Media 첨부

### CMP-LOG-009

선택:
- 사진 촬영/업로드
- 영상 촬영/업로드

자동 연결:
- player_id
- session_id
- observation_id
- skill_area
- recorded_at

### UX

기록 저장 속도를 방해하지 않아야 한다.

Media 업로드가 느릴 경우:
- Observation 저장과 업로드를 가능한 한 분리
- 업로드 진행 상태 표시
- 업로드 실패가 텍스트 Observation 전체 저장 실패로 이어지지 않도록 설계 권장

### MVP

영상 자동 분석 없음.

---

## 16. 저장 Action

### ACT-LOG-001 — Save & Next

Primary CTA:
`저장 & 다음 선수`

동작:
1. Validation
2. Observation 저장
3. 연결 Media 처리
4. 현재 선수 기록 상태 갱신
5. 다음 `not_started` 출석 선수로 이동

### 다음 선수가 없으면

Session Player List로 이동하며:
`모든 출석 선수의 기록을 작성했습니다.`

### ACT-LOG-002 — Save & Add Another

CTA:
`+ 같은 선수 기록 추가`

동작:
1. 현재 Observation 저장
2. 동일 선수 유지
3. 입력 Form 초기화
4. 새 Observation 작성

---

## 17. 자동 저장 / Draft

### MVP 권장

입력 도중 페이지 이탈 사고를 줄이기 위해 최소한 로컬 Draft 또는 Form 상태 보존을 고려한다.

### UX-LOG-001

작성 중 내용이 있는데 뒤로가기를 누르면 무조건 조용히 폐기하지 않는다.

가능한 방식:
- 자동 Draft
- `작성 중인 내용이 있습니다. 나가시겠습니까?`

MVP 구현 난이도에 따라 선택하되 데이터 유실 방지가 필요하다.

---

## 18. 한 선수 여러 Observation

한 수업에서 한 선수에게 여러 Observation을 허용한다.

예:

```text
김민준 / 9월 22일

Observation 1
받기
정면 포구 5/5

Observation 2
던지기
반대발 사용 4/5

Observation 3
치기
토스 정타 6/10
```

DB에서 하나의 거대한 Class Log text로 합치지 않는다.

### DATA-LOG-003

관계:
`Session 1 → Player 1 → Observation N`

---

## 19. Skill Level과 Class Log 관계

Class Log에는 현재 Skill Level을 참고 정보로 보여줄 수 있다.

그러나 Observation 저장만으로 Skill Level을 자동 변경하지 않는다.

### 금지

```text
5/5 성공
→ 자동 Level 3 승급
```

### 허용

```text
최근 Observation이 Level 3 기준과 일치
→ Skill 변경 검토 표시
→ 코치가 Round 6 Skill Ladder에서 승인
```

AI 추천은 향후 기능.

---

## 20. Voice Memo / AI 확장

MVP 이후 우선 확장 후보.

### Flow

```text
음성 기록
→ Speech-to-Text
→ AI 구조화
→ Skill / Observation / attempts / successes 제안
→ 코치 확인
→ 저장
```

예:

입력:
`서준이 오늘 던지기 할 때 반대발을 잘 사용했고 다섯 번 중 네 번 정도 됐음.`

제안:
- Skill: 던지기
- Observation: 반대발을 내디디며 던짐
- attempts: 5
- successes: 4

### AI 원칙

- 자동 저장 금지
- 없는 횟수 생성 금지
- 코치 확인 필수
- 불확실한 필드는 비워둠

MVP 1차 구현에서는 제외 가능.

---

## 21. 수업 종료

### ACT-LOG-003 — End Session

선택 시 Summary 표시:

```text
수업 종료

출석 8명
기록 완료 6명
미작성 2명

[미작성 계속하기]
[그래도 수업 종료]
```

### 정책

미작성 선수가 있어도 Session 종료를 허용한다.

이유:
- 실제 다음 수업이 바로 시작될 수 있음
- 현장에서 기록을 나중에 보완할 수 있음

### 종료 후

Session:
`in_progress → completed`

미작성 기록:
Dashboard에 계속 노출

### DATA-LOG-004

Session completed가 Observation 추가 불가를 의미하지 않는다.

MVP에서는 완료된 당일/과거 Session의 기록 보완을 허용한다.

권한/수정 기간 제한은 향후 확장.

---

## 22. 미작성 기록 보완

### Flow

```text
Dashboard
→ 미작성 기록
→ Session
→ 미작성 선수
→ Quick Log
→ 저장
```

기존 Session을 재사용한다.

새 Session을 만들지 않는다.

### ACT-LOG-004 — Next Incomplete Player

Session Player List의:
`다음 미작성 선수`

선택 시 첫 번째 not_started + present 선수로 이동한다.

---

## 23. 기록 수정 / 삭제

### ACT-LOG-005 — Edit Observation

수정 가능:
- skill_area
- observation_text
- attempts
- successes
- coach_note
- Media 연결

### 삭제

실수 기록 삭제 기능 필요.

권장:
`soft delete`

삭제 후 해당 선수의 유효 Observation이 0개가 되면:
`complete → not_started`

### DATA-LOG-005

삭제된 Observation은 Monthly Report 생성 데이터에서 제외한다.

---

## 24. Empty / Error 상태

### STATE-LOG-001 — 출석 선수 0명
`출석 처리된 선수가 없습니다.`
Action: `출결 확인`

### STATE-LOG-002 — 모든 기록 완료
`모든 출석 선수의 기록을 작성했습니다.`

### STATE-LOG-003 — Current Goal 없음
`현재 목표 미설정`

기록은 정상적으로 가능.

### ERR-LOG-001 — Observation 저장 실패
`기록을 저장하지 못했습니다.`
Action: `다시 저장`

입력 내용을 유지해야 한다.

### ERR-LOG-002 — Media 업로드 실패
`영상 업로드에 실패했습니다.`

텍스트 Observation이 저장되었다면 이를 취소하지 않는다.

Action:
`다시 업로드`

### ERR-LOG-003 — Session 없음
`수업 정보를 찾을 수 없습니다.`
Action: `수업 목록으로`

---

## 25. 모바일 / 현장 UX 요구사항

### UX-LOG-002
한 손 사용을 고려해 Primary CTA를 화면 하단에서 쉽게 누를 수 있어야 한다.

### UX-LOG-003
Skill 선택 버튼은 최소 44px 수준의 터치 영역을 권장한다.

### UX-LOG-004
숫자 입력 시 모바일 numeric keypad를 사용할 수 있어야 한다.

### UX-LOG-005
선수 전환 시 현재 선수 이름이 명확하게 보여야 한다.

### UX-LOG-006
저장 완료 후 불필요한 확인 Modal을 매번 띄우지 않는다.

### UX-LOG-007
네트워크가 느려도 사용자가 저장 여부를 알 수 있어야 한다.

### UX-LOG-008
페이지 전체 가로 스크롤을 사용하지 않는다.

### UX-LOG-009
현장 햇빛/이동 상황을 고려해 작은 텍스트와 지나치게 촘촘한 버튼을 피한다.

---

## 26. 데이터 요구사항

### Class Session
- id
- class_id
- scheduled_at
- status

### Attendance
- session_id
- player_id
- status

### Player Context
- player_id
- name
- grade/age
- current_goal
- current_skill_levels

### Observation
- id
- session_id
- player_id
- coach_id
- skill_area
- observation_text
- attempts
- successes
- coach_note
- observed_at
- created_at
- updated_at
- deleted_at (soft delete 고려)

### Media
- id
- observation_id
- session_id
- player_id
- skill_area
- media_type
- file_url
- upload_status
- recorded_at

---

## 27. 데이터 일관성 규칙

### DATA-LOG-006
Observation은 반드시 player_id와 session_id를 가져야 한다.

### DATA-LOG-007
해당 Session에 참가하지 않은 선수를 기록하려면 명시적 추가 절차가 필요하다.

### DATA-LOG-008
successes는 attempts보다 클 수 없다.

### DATA-LOG-009
결석 선수는 기록 완료율 분모에서 제외한다.

### DATA-LOG-010
한 선수의 Observation N개를 허용한다.

### DATA-LOG-011
Observation 수정/삭제 후 기록 완료 상태를 재계산한다.

### DATA-LOG-012
Media 업로드 실패가 Observation 텍스트 저장을 롤백하지 않도록 설계하는 것을 권장한다.

---

## 28. 성능 목표

### PERF-LOG-001
일반적인 Observation 1개를 선수 선택 이후 30초 안에 기록할 수 있어야 한다.

### PERF-LOG-002
저장 후 다음 선수 전환에 불필요한 전체 페이지 새로고침을 피한다.

### PERF-LOG-003
Session Player List의 기록 상태가 저장 후 즉시 갱신되어야 한다.

### PERF-LOG-004
Media가 없는 일반 텍스트 기록은 네트워크가 정상일 때 즉각적인 저장 피드백을 제공해야 한다.

---

## 29. MVP 포함 / 제외

### MVP 포함
- Session Player List
- present / absent
- 기록 진행률
- 선수별 기록 상태
- Player Quick Log
- Skill 4개 선택
- Observation 필수 입력
- attempts / successes 선택 입력
- Media 첨부
- Save & Next
- 같은 선수 기록 추가
- 여러 Observation
- 수업 종료
- 미작성 기록 보완
- Observation 수정/삭제
- Empty/Error 상태

### MVP 제외
- AI 자동 평가
- 자동 Skill 승급
- 음성 → AI 구조화
- AI 영상 분석
- 모든 기술 기록 강제
- 복잡한 훈련 템플릿
- 팀 전체 일괄 Observation
- 자동 코칭 피드백
- 보호자 실시간 공유
- 선수 자기평가

---

## 30. Acceptance Criteria

### AC-LOG-001
Given Session에 present 선수가 존재할 때,  
Then 출석 선수 목록과 기록 상태를 확인할 수 있어야 한다.

### AC-LOG-002
Given present 선수에게 유효 Observation이 0개일 때,  
Then 해당 선수는 `미작성`으로 표시되어야 한다.

### AC-LOG-003
Given present 선수에게 최소 1개 유효 Observation이 저장되었을 때,  
Then 해당 선수는 기록 완료로 계산되어야 한다.

### AC-LOG-004
Given 한 선수에게 Observation을 추가 저장할 때,  
Then 기존 Observation을 덮어쓰지 않고 별도 기록으로 저장해야 한다.

### AC-LOG-005
Given Observation 작성 시,  
Then skill_area와 observation_text는 필수여야 한다.

### AC-LOG-006
Given attempts/successes를 입력하지 않았을 때,  
Then Observation을 정상 저장할 수 있어야 한다.

### AC-LOG-007
Given successes가 attempts보다 클 때,  
Then 저장을 막고 명확한 Validation을 표시해야 한다.

### AC-LOG-008
Given `저장 & 다음 선수`를 실행했을 때,  
Then 저장 후 다음 not_started present 선수로 이동해야 한다.

### AC-LOG-009
Given 다음 미작성 선수가 없을 때,  
Then 모든 출석 선수 기록 완료 상태를 표시해야 한다.

### AC-LOG-010
Given 선수가 absent일 때,  
Then 기록 완료율 분모에 포함하지 않아야 한다.

### AC-LOG-011
Given Session 종료 시 미작성 선수가 있을 때,  
Then 미작성 수를 알려주고 계속 작성 또는 종료를 선택할 수 있어야 한다.

### AC-LOG-012
Given 미작성 상태로 Session을 종료했을 때,  
Then 해당 미작성 업무가 Dashboard에서 다시 확인 가능해야 한다.

### AC-LOG-013
Given Media 업로드가 실패했지만 Observation 텍스트 저장이 성공했을 때,  
Then 저장된 Observation을 잃지 않아야 한다.

### AC-LOG-014
Given Observation을 삭제하여 해당 선수의 유효 Observation이 0개가 되었을 때,  
Then 기록 상태는 다시 `미작성`으로 계산되어야 한다.

### AC-LOG-015
Given Current Goal이 없는 선수일 때,  
Then Class Log 기록 기능은 정상 작동해야 한다.

### AC-LOG-016
Given 모바일 환경일 때,  
Then 주요 기록 Flow를 페이지 가로 스크롤 없이 수행할 수 있어야 한다.

### AC-LOG-017
Given Observation 저장이 실패했을 때,  
Then 사용자가 입력한 내용을 유지한 상태로 재시도할 수 있어야 한다.

### AC-LOG-018
Given Observation이 저장되었을 때,  
Then Skill Level은 자동으로 변경되어서는 안 된다.

---

## 31. Round 6 연결 메모

Skill Ladder에서 확정:
- 받기/던지기/치기/주루 Level 기준
- 단계별 행동 문장
- Level 변경 승인
- 근거 Observation 연결
- Skill History
- Starter / Basic / Advanced 구조 확장 여부

Class Log는 `관찰 사실`을 저장한다.

Skill Ladder는 누적된 관찰을 바탕으로 `현재 단계`를 코치가 판단/승인하는 화면이다.

---

## 32. Round 5 결정사항 요약

- Class Log는 PDS의 가장 중요한 데이터 입력 화면이다.
- 목표는 선수 1명당 30초 이내 기록이다.
- 출석 선수에게 유효 Observation 1개 이상이면 기록 완료로 본다.
- 모든 기술을 매 수업 기록하도록 강제하지 않는다.
- Observation 1개는 Skill Area 1개에 연결한다.
- 한 선수에게 한 Session에서 여러 Observation을 허용한다.
- attempts / successes와 Media는 선택 사항이다.
- `저장 & 다음 선수`를 Primary Action으로 사용한다.
- 미작성 상태로도 수업 종료를 허용하고 Dashboard에서 보완한다.
- Observation은 Skill Level을 자동 변경하지 않는다.
- AI/Voice는 코치 확인형 보조 기능으로 추후 확장한다.
