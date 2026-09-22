# PDS Round 6 — Skill Ladder 화면 명세서 v0.1

- 문서 ID: `SCR-SKILL-LADDER`
- 제품: PDS (Player Development System)
- 화면: Skill Ladder
- 버전: v0.1
- 우선순위: P0 / Core
- 주요 사용자: 코치
- 설계 기준: Mobile First / Behavior Based / History First
- 상위 문서: PDS 요구사항 명세서 v0.1 / PDS User Flow v0.1 / Round 1~5 화면 명세서

---

## 1. 화면 목적

Skill Ladder는 선수의 야구 기본기를 숫자 점수가 아니라 **관찰 가능한 행동 단계**로 관리하는 화면이다.

핵심 Skill:
- 받기
- 던지기
- 치기
- 주루

Skill Ladder는 Class Log에서 누적된 Observation을 참고하여 코치가 현재 단계를 확인하고 변경하는 역할을 한다.

```text
Class Log
→ Observation 누적
→ Skill Ladder에서 근거 확인
→ 코치 판단
→ Level 변경 승인
→ Skill History 저장
→ Monthly Report에 반영
```

### 핵심 원칙

- Skill은 나이보다 실제 수행 수준을 기준으로 본다.
- 점수(72점, 85점)보다 행동 문장을 사용한다.
- Level은 AI나 성공 횟수만으로 자동 변경하지 않는다.
- 코치가 최종 승인한다.
- Level 변경 이력을 절대 덮어쓰지 않는다.
- 한 번 올라간 Level이 영구 고정되는 것은 아니다.
- 단계를 낮출 때도 이유와 History를 남긴다.
- `미평가` 상태를 허용한다.

---

## 2. Skill Ladder의 역할

Skill Ladder는 선수의 우열을 정하는 랭킹 화면이 아니다.

목적:
1. 코치가 현재 수준을 빠르게 파악
2. 다음 수업의 난이도 결정
3. 성장 변화 기록
4. 부모에게 구체적인 변화 설명
5. 여러 코치가 동일한 행동 기준 사용

피해야 할 구조:
- 선수 간 순위
- 종합 점수
- 평균 점수
- 별점
- 나이별 강제 Level
- 자동 승급

---

## 3. 진입 경로

- Player Detail → Skill 탭
- Player Detail → Skill Summary Card
- Class Log → Skill 변경 검토
- Monthly Report → Skill 변화 상세

MVP의 Skill Ladder는 기본적으로 **선수 개인 Context**에서 진입한다.

---

## 4. 화면 구조

1. Player Context Header
2. 4개 Skill Summary
3. 선택 Skill 상세
4. Level Ladder
5. 현재 단계 행동 기준
6. 최근 Observation 근거
7. Level 변경 Action
8. Skill History

---

## 5. Low-Fidelity Wireframe — Skill Summary

```text
┌──────────────────────────────┐
│ ‹ 김민준 선수          Skill  │
│                              │
│ 현재 Skill                   │
├──────────────────────────────┤
│ 받기                         │
│ Level 3                      │
│ 정면으로 오는 공을 잡는다   > │
├──────────────────────────────┤
│ 던지기                       │
│ Level 2                      │
│ 옆으로 서서 던진다         > │
├──────────────────────────────┤
│ 치기                         │
│ Level 3                      │
│ 토스해 준 공을 맞춘다      > │
├──────────────────────────────┤
│ 주루                         │
│ Level 2                      │
│ 1루까지 곧장 뛴다          > │
└──────────────────────────────┘
```

---

## 6. Low-Fidelity Wireframe — Skill Detail

```text
┌──────────────────────────────┐
│ ‹ Skill              받기     │
│                              │
│ 현재 단계                    │
│ LEVEL 3                      │
│ 정면으로 오는 공을 잡는다     │
│ 변경일 · 9월 22일             │
├──────────────────────────────┤
│ Skill Ladder                 │
│                              │
│ ✓ Level 1                    │
│ 공이 오면 피하거나 눈을 감는다 │
│ │                            │
│ ✓ Level 2                    │
│ 눈을 뜨고 글러브를 공 쪽으로 댄다│
│ │                            │
│ ● Level 3  CURRENT           │
│ 정면으로 오는 공을 잡는다     │
│ │                            │
│ ○ Level 4                    │
│ 옆으로 오는 공, 뜬공까지 잡는다│
├──────────────────────────────┤
│ 최근 관찰 근거                │
│ 9/22 · 정면 포구 5/5          │
│ 9/15 · 정면 포구 4/5          │
│ 9/08 · 정면 포구 3/5          │
│                       [전체]  │
├──────────────────────────────┤
│        [ 단계 변경 ]          │
├──────────────────────────────┤
│ History                      │
│ 9/22  L2 → L3                │
│ 9/08  L1 → L2                │
└──────────────────────────────┘
```

---

## 7. MVP Skill 기준

### 7.1 받기

#### Level 1
`공이 오면 피하거나 눈을 감는다.`

#### Level 2
`눈을 뜨고 글러브를 공 쪽으로 댄다.`

#### Level 3
`정면으로 오는 공을 잡는다.`

#### Level 4
`옆으로 오는 공과 뜬공까지 잡는다.`

---

### 7.2 던지기

#### Level 1
`팔로만 던지며 몸이 정면을 향한다.`

#### Level 2
`옆으로 서서 던진다.`

#### Level 3
`반대쪽 발을 내디디며 던진다.`

#### Level 4
`목표를 향해 5m 이상 정확하게 던진다.`

---

### 7.3 치기

#### Level 1
`티 위의 공을 자주 헛친다.`

#### Level 2
`티 위의 공을 맞춘다.`

#### Level 3
`토스해 준 공을 맞춘다.`

#### Level 4
`토스해 준 공을 앞으로 강하게 보낸다.`

---

### 7.4 주루

#### Level 1
`치고 나서 어디로 뛰어야 할지 헷갈린다.`

#### Level 2
`1루까지 곧장 뛴다.`

#### Level 3
`베이스를 밟고 멈추지 않고 지나간다.`

#### Level 4
`2루까지 돌면서 멈출지 갈지 스스로 판단한다.`

---

## 8. 기준 문구 정책

### CONTENT-SKILL-001
각 Level 문구는 코치와 부모가 모두 이해할 수 있는 행동 문장이어야 한다.

### CONTENT-SKILL-002
`좋음`, `우수`, `상`, `하` 같은 추상 평가어를 Level 기준으로 사용하지 않는다.

### CONTENT-SKILL-003
한 Level에 너무 많은 행동 조건을 묶지 않는다.

### CONTENT-SKILL-004
현재 v0.1 기준은 MVP 초기 기준이며 실제 수업 사용 후 조정할 수 있다.

### 중요

Level 기준 문구가 수정되어도 기존 선수의 과거 Skill History 자체를 삭제하지 않는다.

향후 기준 버전 관리가 필요할 수 있다.

---

## 9. 나이 기반이 아닌 Level 기반

### RULE-SKILL-001

Skill Level은 선수의 나이/학년으로 자동 결정하지 않는다.

예:
- 야구 경험이 많은 6세 → 치기 Level 4 가능
- 처음 시작한 10세 → 치기 Level 1 가능

학년/연령은 Context일 뿐 Skill Level 결정 규칙이 아니다.

---

## 10. `미평가` 상태

선수를 처음 등록했다고 해서 임의로 Level 1을 부여하지 않는다.

평가하지 못했다면:
`미평가`

### STATE-SKILL-001

미평가 Skill 표시:
- 현재 단계: `미평가`
- CTA: `초기 단계 설정`

### DATA-SKILL-001

`미평가`와 `Level 1`은 서로 다른 상태다.

---

## 11. Skill Summary

### CMP-SKILL-001

4개 Skill 각각 표시:
- Skill name
- Current Level
- 현재 행동 기준
- 최근 변경 여부

예:
`받기 · Level 3 · 정면으로 오는 공을 잡는다.`

선택:
→ 해당 Skill Detail

---

## 12. Skill Detail

### CMP-SKILL-002

표시:
- Skill name
- Current Level
- Current behavior criterion
- 최근 변경일
- 전체 Ladder
- 최근 Observation
- History
- `단계 변경`

현재 Level은 Ladder에서 명확하게 강조한다.

---

## 13. Observation 근거

### CMP-SKILL-003 — Evidence

최근 Class Log Observation을 해당 Skill 기준으로 불러온다.

예:

```text
9/22 · 강남 A반
정면 공을 끝까지 보고 잡음
5/5

9/15 · 강남 A반
정면 포구
4/5
```

### 기본 표시

최근 3개를 우선 표시.

`전체 보기`:
해당 선수 + 해당 Skill의 Observation Timeline.

### 원칙

Observation은 **판단 근거**이지 자동 승급 공식이 아니다.

---

## 14. 단계 변경 Flow

### ACT-SKILL-001 — Change Level

```text
단계 변경
→ 새 Level 선택
→ 기준 문구 확인
→ 최근 Observation 근거 확인
→ 변경 이유 입력/선택
→ 저장
→ History 생성
```

### 변경 Modal 예

```text
받기 단계 변경

현재
Level 2
눈을 뜨고 글러브를 공 쪽으로 댄다.

변경
Level 3
정면으로 오는 공을 잡는다.

최근 근거
9/22 정면 포구 5/5
9/15 정면 포구 4/5

변경 이유
[ 최근 수업에서 반복 확인 ]

[취소] [Level 3으로 변경]
```

---

## 15. 승급 / 유지 / 하향

### 승급
`Level 2 → Level 3`

### 유지
변경하지 않음.
History를 매 수업 생성하지 않는다.

### 하향
`Level 3 → Level 2`

하향도 허용한다.

예:
- 초기 평가가 잘못됨
- 특정 환경에서 반복 수행이 되지 않음
- 코치가 기준을 재확인함

### RULE-SKILL-002

하향은 실패나 벌점으로 표현하지 않는다.

단순히 현재 관찰 기준에 맞춰 상태를 조정하는 것이다.

---

## 16. Level 건너뛰기

예:
`미평가 → Level 3`
`Level 1 → Level 3`

MVP에서는 허용한다.

이유:
- 처음 평가하는 숙련 선수
- 이전 평가가 오래됨
- 단계가 실제 수준보다 낮게 설정됨

단, 변경 History와 이유를 남긴다.

### RULE-SKILL-003

Skill Ladder는 게임 레벨처럼 1→2→3→4를 반드시 순서대로 통과해야 하는 구조가 아니다.

---

## 17. 변경 이유

### CMP-SKILL-004

Level 변경 시 이유를 남기는 것을 권장한다.

MVP 선택지 예:
- 최근 수업에서 반복 확인
- 초기 평가
- 기준 재평가
- 기타

선택 + 자유 메모 구조 가능.

### 필수 여부

- 초기 평가: 선택
- 기존 Level 변경: 이유 입력 권장

MVP에서 완전 필수로 할지는 구현 시 UX 테스트 가능.

---

## 18. Skill History

### CMP-SKILL-005

History는 최신순.

예:

```text
9/22
Level 2 → Level 3
최근 수업에서 반복 확인

9/08
Level 1 → Level 2
초기 기본기 수업 확인
```

### History 필드

- id
- player_id
- skill_area
- previous_level
- new_level
- changed_at
- changed_by
- reason
- note
- evidence_observation_ids
- criteria_version (향후 고려)

### DATA-SKILL-002

현재 Skill 값만 업데이트하고 과거 History를 삭제하면 안 된다.

---

## 19. 현재 Skill 저장 구조

권장 구조:

### `player_skill_current`
빠른 조회용 현재 상태

- player_id
- skill_area
- current_level
- updated_at

### `skill_progress_history`
변경 History

- id
- player_id
- skill_area
- previous_level
- new_level
- changed_at
- changed_by
- reason

또는 History에서 최신값을 계산할 수도 있다.

실제 DB 구조는 ERD 단계에서 성능/일관성을 고려해 확정한다.

---

## 20. Skill Level과 Monthly Report

Monthly Report에서는 현재 단계뿐 아니라 **이전 월 대비 변화**를 사용할 수 있어야 한다.

예:
`받기 Level 2 → Level 3`

변화가 없다면:
`받기 Level 3 유지`

### DATA-SKILL-003

Report 기준 월의 시작/종료 시점 Skill을 재현할 수 있어야 한다.

따라서 History timestamp가 중요하다.

---

## 21. Parent-facing 표현

코치 내부:
- Skill Ladder
- Level 1~4
- 포구 / 송구 / 타격 / 주루 같은 전문 용어 사용 가능

부모 리포트:
- 받기
- 던지기
- 치기
- 달리기/주루
- 행동 문장 중심

MVP 화면에서는 코치용이므로 `Level` 표시를 사용한다.

Report에서는 부모가 이해하기 쉬운 표현으로 변환한다.

---

## 22. Starter / Basic / Advanced 확장

초기에는 4단계 Ladder로 시작한다.

향후 선수 수준이 넓어지면 다음과 같이 확장 가능:

```text
Starter
  L1~L4

Basic
  L1~L4

Advanced
  L1~L4
```

또는 Skill별 더 세분화된 Curriculum을 둘 수 있다.

### MVP 결정

**Starter / Basic / Advanced 구분은 데이터 확장 가능성만 열어두고 UI에는 넣지 않는다.**

이유:
- 초기부터 12단계 체계는 복잡함
- 실제 코칭 데이터를 먼저 쌓아야 적절한 기준을 설계할 수 있음

---

## 23. AI 추천 확장

향후 AI가 최근 Observation을 분석해 다음과 같이 제안할 수 있다.

```text
받기 Level 변경 검토

현재 Level 2

최근 3회:
9/08 3/5
9/15 4/5
9/22 5/5

Level 3 기준:
정면으로 오는 공을 잡는다.

[근거 보기] [검토하기]
```

### AI 원칙

- `추천`만 가능
- 자동 변경 금지
- 근거 Observation 표시
- 근거 부족 시 추천하지 않음
- 코치가 최종 승인

MVP에서는 제외 가능.

---

## 24. Empty / Error 상태

### STATE-SKILL-002 — Observation 없음

`아직 이 기술에 대한 수업 기록이 없습니다.`

Observation 없이도 초기 Skill 설정은 가능하되 코치 판단임을 명확히 한다.

### STATE-SKILL-003 — History 없음

`아직 단계 변경 이력이 없습니다.`

### ERR-SKILL-001 — 저장 실패

`단계 변경을 저장하지 못했습니다.`

- 선택한 Level 유지
- 이유 입력값 유지
- 재시도 가능

### ERR-SKILL-002 — 동시 수정

향후 다중 코치 환경에서 최신 Skill이 이미 변경되었다면 충돌 처리 필요.

MVP 1인 코치에서는 낮은 우선순위.

---

## 25. 모바일 UX 요구사항

### UX-SKILL-001
현재 Level과 행동 기준은 화면 상단에서 즉시 확인 가능해야 한다.

### UX-SKILL-002
Level 1~4의 차이를 세로 흐름으로 쉽게 읽을 수 있어야 한다.

### UX-SKILL-003
현재 Level을 색상만으로 구분하지 않는다.
`CURRENT`, 아이콘, 굵기 등 추가 표식을 사용한다.

### UX-SKILL-004
Observation 근거를 단계 변경 화면 안에서 확인할 수 있어야 한다.

### UX-SKILL-005
단계 변경은 실수 방지를 위해 최종 확인 Action이 있어야 한다.

### UX-SKILL-006
페이지 전체 가로 스크롤을 사용하지 않는다.

---

## 26. 데이터 일관성 규칙

### DATA-SKILL-004
Player + Skill Area 조합의 Current Level은 하나만 존재한다.

### DATA-SKILL-005
Level 변경 시 History record를 생성한다.

### DATA-SKILL-006
History의 changed_at을 보존한다.

### DATA-SKILL-007
Observation 삭제가 과거 Skill History를 자동 삭제하지 않는다.

필요 시 근거 Observation이 삭제되었음을 표시할 수 있다.

### DATA-SKILL-008
Class Log 저장이 Current Level을 직접 수정하면 안 된다.

### DATA-SKILL-009
Level 값은 `unassessed / 1 / 2 / 3 / 4`를 지원한다.

---

## 27. MVP 포함 / 제외

### MVP 포함
- 선수별 Skill Summary
- 받기/던지기/치기/주루
- Level 1~4
- 미평가
- 행동 기반 기준 문구
- Skill Detail
- 최근 Observation 근거
- 수동 Level 변경
- 승급/하향/건너뛰기
- 변경 History
- 변경 이유
- Monthly Report에서 변화 조회 가능한 데이터 구조
- Empty/Error 상태

### MVP 제외
- 선수 간 Skill Ranking
- 종합 Skill Score
- AI 자동 승급
- AI Skill 추천
- Starter / Basic / Advanced UI
- 12단계 Curriculum
- 나이별 자동 기준
- 레이더 차트
- 팀 평균 비교
- 부모가 직접 Level 변경
- 자동 성장 예측

---

## 28. Acceptance Criteria

### AC-SKILL-001
Given Player Skill 화면에 진입했을 때,  
Then 받기/던지기/치기/주루 4개 영역의 현재 상태를 확인할 수 있어야 한다.

### AC-SKILL-002
Given 평가되지 않은 Skill이 있을 때,  
Then Level 1이 아니라 `미평가`로 표시되어야 한다.

### AC-SKILL-003
Given Skill Detail에 진입했을 때,  
Then Level 1~4 행동 기준과 Current Level을 동시에 확인할 수 있어야 한다.

### AC-SKILL-004
Given Current Level이 존재할 때,  
Then 색상 외에도 CURRENT 등의 표시로 현재 단계를 구분해야 한다.

### AC-SKILL-005
Given 해당 Skill Observation이 존재할 때,  
Then 최근 Observation 근거를 확인할 수 있어야 한다.

### AC-SKILL-006
Given Level 변경을 실행할 때,  
Then 새 Level과 행동 기준을 확인한 후 최종 저장해야 한다.

### AC-SKILL-007
Given Level 2 → Level 3 변경이 저장되었을 때,  
Then Current Level은 3이 되고 History에는 2→3 기록이 남아야 한다.

### AC-SKILL-008
Given Level 3 → Level 2로 변경할 때,  
Then 시스템은 하향 변경을 허용하고 History를 남겨야 한다.

### AC-SKILL-009
Given 미평가 선수를 처음 평가할 때,  
Then 미평가 → Level 3과 같은 건너뛰기 설정을 허용해야 한다.

### AC-SKILL-010
Given Class Log Observation이 새로 저장되었을 때,  
Then Current Skill Level이 자동 변경되어서는 안 된다.

### AC-SKILL-011
Given 과거 Skill History가 존재할 때,  
Then 최신 Level 변경으로 이전 History가 덮어써져서는 안 된다.

### AC-SKILL-012
Given Monthly Report가 특정 월의 Skill 변화를 요청할 때,  
Then History를 이용해 해당 기간의 이전/현재 상태를 조회할 수 있어야 한다.

### AC-SKILL-013
Given 모바일 환경일 때,  
Then Ladder와 Observation 근거, 단계 변경을 가로 페이지 스크롤 없이 사용할 수 있어야 한다.

### AC-SKILL-014
Given 단계 변경 저장이 실패했을 때,  
Then 선택 Level과 입력 이유를 유지한 상태로 재시도할 수 있어야 한다.

---

## 29. Round 7 연결 메모

Monthly Report에서 사용할 Skill 데이터:
- 월 시작 시 Level
- 월 종료 시 Level
- 변화 여부
- 해당 Skill의 대표 Observation
- Before/After Media
- 다음 Goal

예:

```text
받기
Level 2 → Level 3

이번 달 발견
9월 22일, 정면으로 오는 공을 5번 중 5번 잡았습니다.
```

Monthly Report는 Skill Ladder 숫자만 보여주는 것이 아니라 Observation 근거와 함께 부모가 이해할 수 있는 변화로 표현한다.

---

## 30. Round 6 결정사항 요약

- Skill Ladder는 점수가 아니라 행동 단계다.
- Skill은 받기/던지기/치기/주루 4개로 시작한다.
- MVP는 각 Skill Level 1~4다.
- 나이/학년으로 Level을 자동 결정하지 않는다.
- `미평가`는 Level 1과 다르다.
- Observation은 근거이며 자동 승급 공식이 아니다.
- Level 변경은 코치가 승인한다.
- 승급뿐 아니라 하향/건너뛰기도 허용한다.
- 모든 변경은 History에 남긴다.
- Starter / Basic / Advanced는 실제 데이터가 쌓인 뒤 확장한다.
- Round 7 Monthly Report는 Skill History + Observation + Media를 부모용 변화 설명으로 변환한다.
