# TBP PDS Hi-Fi — 분리형 프론트엔드 패키지

## 구조
- `index.html` — HTML 마크업
- `css/styles.css` — 전체 스타일
- `js/app.js` — 화면 인터랙션 및 상태 로직
- `img/` — 기존 HTML에 Base64로 포함되어 있던 이미지 리소스

## 실행
`index.html`을 브라우저에서 열면 됩니다. 정적 HTML/CSS/JS 구조라 별도 빌드 과정은 없습니다.

원본 단일 HTML의 화면/동작을 유지하면서 리소스만 역할별로 분리했습니다.
