const icons={
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9 21v-6h6v6"/></svg>',
 players:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.7-4.4 3.1-6.5 7.5-6.5s6.8 2.1 7.5 6.5"/></svg>',
 classes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>',
 reports:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h5M8 13h8M8 17h6"/></svg>'
};
const navs=[['dashboard','홈','home'],['players','선수','players'],['classes','수업','classes'],['reports','리포트','reports']];
function navHTML(mobile=false){return navs.map(([r,l,i])=>`<button data-route="${r}" class="${routeGroup(route)==r?'active':''}">${icons[i]}${mobile?l:`<span>${l}</span>`}</button>`).join('')}
function routeGroup(r){if(['player','skill'].includes(r))return'players';if(['classDetail','classLog'].includes(r))return'classes';if(r==='report')return'reports';return r}
function bindNav(){document.getElementById('sideNav').innerHTML=navHTML();document.getElementById('mobileNav').innerHTML=navHTML(true);document.querySelectorAll('[data-route]').forEach(x=>x.onclick=()=>go(x.dataset.route))}
function go(r){location.hash=r}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove('show'),1800)}
function modal(title,body,ok='확인',fn='closeModal()'){document.getElementById('modalBox').innerHTML=`<h3>${title}</h3><p>${body}</p><div class="modal-actions"><button class="secondary" onclick="closeModal()">취소</button><button class="primary" onclick="${fn}">${ok}</button></div>`;document.getElementById('modal').classList.add('show')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
function confirmEnd(){modal('수업을 종료할까요?','미작성 선수가 있어도 종료할 수 있으며 이후 Dashboard에서 후속 기록이 가능합니다.','수업 종료',"go('dashboard');closeModal()")}
function confirmSkill(){modal('Skill 단계를 변경할까요?','최근 Observation은 판단 근거이며 최종 변경은 코치가 승인합니다. 변경 이력은 History에 보존됩니다.','변경 승인',"toast('Skill 변경이 승인되었습니다.');closeModal()")}
function confirmReport(){modal('리포트를 승인할까요?','승인본은 Snapshot으로 보존됩니다. 다음 달 목표를 Current Goal로 연결할 수 있습니다.','승인하기',"toast('9월 리포트가 승인되었습니다.');closeModal()")}
function actions(html=''){document.getElementById('actions').innerHTML=html?`<div class="bottom-actions">${html}</div>`:''}
function header(kicker,title,desc,button=''){return `<section class="hero-copy"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${desc}</p></div>${button}</section>`}
function clickRow(title,meta,goal,to,badge=''){return `<div class="row" onclick="go('${to}')" style="cursor:pointer"><div class="row-main"><div class="title">${title}</div><div class="meta">${meta}</div>${goal?`<div class="goal">${goal}</div>`:''}</div>${badge||'<span class="chev">›</span>'}</div>`}
const screens={
dashboard(){
 actions('');
 return header('PLAYER DEVELOPMENT SYSTEM','선수의 성장을<br>기록하는 코칭 시스템.','오늘의 수업과 기록해야 할 성장 포인트를 한곳에서 확인하세요.')+`
 <div class="grid"><div class="stack">
 <section class="card next"><div class="eyebrow">NEXT CLASS · 10:00</div><h2>강남 토요일 A반</h2><p>오늘 가장 먼저 진행할 수업입니다.</p><div class="next-meta"><div><span>예정 선수</span><b>8명</b></div><div><span>수업 시간</span><b>120분</b></div><div><span>상태</span><b>예정</b></div></div><button class="primary" onclick="go('classLog')">수업 시작 →</button></section>
 <section class="card"><div class="card-head"><h2>오늘 수업</h2><button class="ghost" onclick="go('classes')">전체 보기</button></div>${clickRow('강남 토요일 A반','10:00–12:00 · 예정 8명','', 'classDetail','<span class="badge blue">예정</span>')}${clickRow('강남 토요일 B반','12:30–14:30 · 예정 7명','', 'classDetail','<span class="badge blue">예정</span>')}</section>
 </div><div class="stack">
 <section class="card"><div class="card-head"><h2>오늘 현황</h2></div><div class="metric-grid"><div class="metric"><span>수업</span><b>2</b></div><div class="metric"><span>미작성</span><b>4</b></div><div class="metric"><span>리포트</span><b>80%</b></div></div></section>
 <section class="card click" onclick="go('classLog')" style="cursor:pointer"><div class="card-head"><h2>미작성 기록</h2><span class="badge warn">4명</span></div><div class="goal">수업은 끝났지만 Observation이 아직 없는 선수가 있습니다.</div></section>
 <section class="card click" onclick="go('report')" style="cursor:pointer"><div class="card-head"><h2>9월 Monthly Report</h2><b style="color:var(--blue-600)">16 / 20</b></div><div class="progress"><i style="width:80%"></i></div><div class="meta">승인 완료 · 80%</div></section>
 </div></div>`},
players(){
 actions('');
 return header('PLAYERS','선수 관리','현재 목표와 최근 기록을 중심으로 선수의 성장 상태를 확인합니다.','<button class="primary" onclick="toast(\'선수 등록 폼을 엽니다.\')">＋ 선수 등록</button>')+`
 <div class="search">⌕ &nbsp; 선수 이름 검색</div><div class="filters"><button class="chip active">전체 클래스</button><button class="chip">활동 중</button><button class="chip">최근 기록순</button></div>
 <section class="card"><div class="card-head"><h2>활동 선수 20명</h2><span class="meta">이름순</span></div>
 ${clickRow('김민준 선수','초2 · 강남 토요일 A반','현재 목표 · 반대발을 내디디며 던지기','player')}
 ${clickRow('이서준 선수','초4 · 강남 토요일 A반','현재 목표 · 좌우 이동 후 포구','player')}
 ${clickRow('박지호 선수','7세 · 강남 토요일 A반','현재 목표 · 토스 공 앞으로 보내기','player')}
 ${clickRow('최도윤 선수','초3 · 강남 토요일 B반','현재 목표 · 1루까지 곧장 뛰기','player')}</section>`},
player(){
 actions('<button class="secondary" onclick="go(\'players\')">목록으로</button><button class="primary" onclick="go(\'classLog\')">＋ 기록 추가</button>');
 return header('PLAYER PROFILE','김민준 선수','초2 · 우투우타 · 강남 토요일 A반 · 활동 중')+`
 <div class="tabs"><button class="tab active">Overview</button><button class="tab">수업기록</button><button class="tab" onclick="go('skill')">Skill</button><button class="tab">영상</button><button class="tab" onclick="go('report')">Report</button></div>
 <div class="grid"><div class="stack"><section class="goal-card"><small>CURRENT GOAL</small><h2>반대발을 내디디며 던지기</h2><p>2026.09.01 시작 · 대표 목표 1개</p></section>
 <section class="card"><div class="card-head"><h2>최근 관찰</h2><button class="link" onclick="go('classLog')">기록 추가</button></div>${clickRow('던지기','9월 22일 · 강남 토요일 A반','5번 중 4번 반대발을 내디디며 던짐','classLog')}${clickRow('받기','9월 15일 · 강남 토요일 A반','정면 공을 끝까지 보고 포구','skill')}</section></div>
 <div class="stack"><section class="card click" onclick="go('skill')" style="cursor:pointer"><div class="card-head"><h2>현재 Skill</h2><span class="link">자세히 ›</span></div><div class="skill-grid"><div class="skill"><span>받기</span><b>L3</b></div><div class="skill"><span>던지기</span><b>L2</b></div><div class="skill"><span>치기</span><b>L3</b></div><div class="skill"><span>주루</span><b>L2</b></div></div></section>
 <section class="card click" onclick="go('report')" style="cursor:pointer"><div class="card-head"><h2>9월 Monthly Report</h2><span class="badge ok">승인 완료</span></div><div class="goal">이번 달 변화와 다음 목표를 확인합니다.</div></section></div></div>`},
classes(){
 actions('');
 return header('CLASSES','수업 관리','반복 Class와 실제 날짜별 Session을 분리해 관리합니다.','<button class="primary" onclick="toast(\'새 클래스 생성 폼을 엽니다.\')">＋ 수업 등록</button>')+`
 <section class="card next"><div class="eyebrow">NEXT CLASS · 10:00</div><h2>강남 토요일 A반</h2><p>예정 선수 8명 · 120분 수업</p><button class="primary" onclick="go('classLog')">수업 시작 →</button></section>
 <section class="card"><div class="card-head"><h2>전체 클래스</h2><span class="meta">운영 중 4개</span></div>${clickRow('강남 토요일 A반','토요일 10:00–12:00 · 8/10명','다음 Session · 오늘 10:00','classDetail','<span class="badge blue">오늘</span>')}${clickRow('강남 토요일 B반','토요일 12:30–14:30 · 7/10명','다음 Session · 오늘 12:30','classDetail','<span class="badge blue">오늘</span>')}${clickRow('강남 수요일 A반','수요일 17:00–19:00 · 9/10명','다음 Session · 9/23 17:00','classDetail')}${clickRow('엘리트 금요일반','금요일 18:00–20:00 · 6/8명','다음 Session · 9/25 18:00','classDetail')}</section>`},
classDetail(){
 actions('<button class="secondary" onclick="go(\'classes\')">목록으로</button><button class="primary" onclick="go(\'classLog\')">수업 시작</button>');
 return header('CLASS DETAIL','강남 토요일 A반','매주 토요일 · 10:00–12:00 · 운영 중')+`
 <div class="grid"><div class="stack"><section class="card next"><div class="eyebrow">NEXT SESSION</div><h2>9월 22일 · 10:00</h2><p>예정 선수 8명 · 출석 확인 후 기록을 시작합니다.</p><button class="primary" onclick="go('classLog')">수업 시작 →</button></section>
 <section class="card"><div class="card-head"><h2>현재 선수</h2><span class="link">8 / 10명</span></div>${clickRow('김민준 선수','초2','현재 목표 · 반대발 내딛고 던지기','player')}${clickRow('이서준 선수','초4','현재 목표 · 좌우 이동 후 포구','player')}${clickRow('박지호 선수','7세','현재 목표 · 토스 공 앞으로 보내기','player')}</section></div>
 <section class="card"><div class="card-head"><h2>최근 Session</h2></div>${clickRow('9월 15일 · 10:00','출석 7/8 · 기록 7/7','','classLog','<span class="badge ok">완료</span>')}${clickRow('9월 8일 · 10:00','출석 8/8 · 기록 8/8','','classLog','<span class="badge ok">완료</span>')}${clickRow('9월 1일 · 10:00','출석 6/8 · 기록 6/6','','classLog','<span class="badge ok">완료</span>')}</section></div>`},
classLog(){
 actions('<button class="secondary" onclick="toast(\'임시 저장되었습니다.\')">임시 저장</button><button class="primary" onclick="toast(\'김민준 기록 저장 완료 · 다음 선수로 이동\')">저장 & 다음 선수</button>');
 return header('CLASS LOG','강남 토요일 A반','9월 22일 · 10:00–12:00 · 출석 7명 / 결석 1명','<button class="secondary" onclick="confirmEnd()">수업 종료</button>')+`
 <section class="card"><div class="card-head"><h2>기록 진행</h2><b style="font-size:11px;color:var(--blue-600)">4 / 7</b></div><div class="progress"><i style="width:57%"></i></div><div class="player-strip" style="margin-top:14px"><div class="mini-player done"><div class="mini-avatar">이</div><small>이서준</small></div><div class="mini-player done"><div class="mini-avatar">박</div><small>박지호</small></div><div class="mini-player done"><div class="mini-avatar">최</div><small>최도윤</small></div><div class="mini-player active"><div class="mini-avatar">김</div><small>김민준</small></div><div class="mini-player"><div class="mini-avatar">정</div><small>정시우</small></div><div class="mini-player"><div class="mini-avatar">한</div><small>한유준</small></div></div></section>
 <div class="grid"><div class="stack"><section class="goal-card"><small>김민준 · CURRENT GOAL</small><h2>반대발을 내디디며 던지기</h2><p>초2 · 현재 선수 4 / 7</p></section>
 <section class="card"><div class="form-label">오늘 관찰한 Skill *</div><div class="skill-choices"><button class="skill-choice">받기</button><button class="skill-choice active">던지기</button><button class="skill-choice">치기</button><button class="skill-choice">주루</button></div></section></div>
 <section class="card"><div class="form-label">관찰 기록 *</div><div class="quick"><button onclick="appendText('목표 행동 확인')">목표 행동 확인</button><button onclick="appendText('반복 성공')">반복 성공</button><button onclick="appendText('도움 필요')">도움 필요</button><button onclick="appendText('다음 단계 시도')">다음 단계 시도</button></div><textarea id="obs">5번 중 4번 반대발을 내디디며 던짐</textarea><div style="display:flex;gap:8px;margin-top:10px"><button class="secondary" onclick="toast('Media 업로드 UI')">＋ 사진 · 영상</button><button class="secondary" onclick="toast('같은 선수 Observation 추가')">＋ 관찰 추가</button></div></section></div>`},
skill(){
 actions('<button class="secondary" onclick="go(\'player\')">선수 상세</button><button class="primary" onclick="confirmSkill()">단계 변경</button>');
 return header('SKILL LADDER','김민준 · 받기','행동 기준과 최근 Observation을 근거로 현재 단계를 판단합니다.')+`
 <div class="grid"><div class="stack"><section class="goal-card"><small>CURRENT LEVEL</small><h2>LEVEL 3</h2><p>정면으로 오는 공을 잡는다. · 변경일 9월 22일</p></section>
 <section class="card"><h2 style="margin-bottom:16px">Skill Ladder</h2><div class="ladder"><div class="step done"><div class="dot">✓</div><div><b>Level 1</b><p>공이 오면 피하거나 눈을 감는다.</p></div></div><div class="step done"><div class="dot">✓</div><div><b>Level 2</b><p>눈을 뜨고 글러브를 공 쪽으로 댄다.</p></div></div><div class="step now"><div class="dot">●</div><div><b>Level 3 · CURRENT</b><p>정면으로 오는 공을 잡는다.</p></div></div><div class="step"><div class="dot"></div><div><b>Level 4</b><p>옆으로 오는 공과 뜬공까지 잡는다.</p></div></div></div></section></div>
 <div class="stack"><section class="card"><div class="card-head"><h2>최근 관찰 근거</h2><span class="link">전체 보기</span></div>${clickRow('9월 22일','강남 토요일 A반','정면 공을 끝까지 보고 잡음 · 5/5','classLog')}${clickRow('9월 15일','강남 토요일 A반','정면으로 오는 공 포구 · 4/5','classLog')}${clickRow('9월 8일','강남 토요일 A반','글러브 위치가 안정됨 · 3/5','classLog')}</section><section class="card"><h2>Skill History</h2><div class="row"><div><div class="title">L2 → L3</div><div class="meta">9월 22일 · 최근 수업 반복 확인</div></div><span class="badge ok">승인</span></div><div class="row"><div><div class="title">L1 → L2</div><div class="meta">9월 8일 · 초기 기본기 확인</div></div><span class="badge ok">승인</span></div></section></div></div>`},
reports(){actions('');return header('MONTHLY REPORTS','월간 리포트','선수별 작성 상태를 확인하고 승인된 리포트를 관리합니다.')+`<section class="card"><div class="card-head"><h2>2026년 9월</h2><b style="color:var(--blue-600)">16 / 20 승인</b></div><div class="progress"><i style="width:80%"></i></div><div style="margin-top:16px">${clickRow('김민준 선수','초2 · 강남 토요일 A반','9월 리포트 초안 작성 중','report','<span class="badge warn">초안</span>')}${clickRow('이서준 선수','초4 · 강남 토요일 A반','9월 리포트','report','<span class="badge ok">승인</span>')}${clickRow('박지호 선수','7세 · 강남 토요일 A반','9월 리포트','report','<span class="badge ok">승인</span>')}</div></section>`},
report(){
 actions('<button class="secondary" onclick="toast(\'미리보기 모드입니다.\')">미리보기</button><button class="primary" onclick="confirmReport()">검토 후 승인</button>');
 return header('MONTHLY REPORT','김민준 · 2026년 9월','Observation · Skill History · Media · Goal을 근거로 작성된 코치 검토용 초안입니다.')+`
 <div class="grid"><div class="stack"><button class="secondary" onclick="toast('Evidence 기반 AI 초안을 생성했습니다.')">✦ AI 초안 만들기</button>
 <section class="card"><div class="card-head"><h2>이번 달 발견</h2><span class="badge blue">근거 3개</span></div><div class="goal">정면으로 오는 공을 끝까지 보며 포구하는 모습이 반복해서 관찰되었습니다.</div><button class="ghost" onclick="toast('연결된 Observation 3개를 표시합니다.')">근거 확인 →</button></section>
 <section class="card"><div class="card-head"><h2>지금 연습하고 있어요</h2><span class="badge blue">근거 2개</span></div><div class="goal">던질 때 몸을 옆으로 세운 뒤 반대발을 내딛는 동작을 반복하고 있습니다.</div></section>
 <section class="goal-card"><small>NEXT GOAL</small><h2>반대발을 내디디며 정확하게 던지기</h2><p>승인 후 다음 Current Goal로 연결 가능</p></section></div>
 <article class="report-paper"><div class="brandline">TBP BASEBALL · PDS</div><h2>9월 성장 리포트</h2><div class="meta">김민준 선수 · 강남 토요일 A반</div><div class="report-section"><h3>이번 달, 이렇게 달라졌어요</h3><span class="badge blue">받기 L2 → L3</span><p style="margin-top:8px">정면으로 오는 공을 끝까지 보며 포구하는 모습이 반복해서 관찰되었습니다.</p></div><div class="report-section"><h3>지금 연습하고 있어요</h3><p>던질 때 몸을 옆으로 세운 뒤 반대발을 내딛는 동작을 반복하고 있습니다.</p></div><div class="report-section next-goal"><small>NEXT GOAL</small><b>반대발을 내디디며 정확하게 던지기</b></div><div class="report-section"><h3>가족과 5분 야구</h3><p>5m 거리에서 캐치볼하며 반대발을 내딛는 동작을 5번씩 확인해 주세요.</p></div><div class="report-section"><h3>코치 한마디</h3><p>민준이가 공을 끝까지 보는 습관이 좋아지고 있습니다. 다음 달에는 안정된 포구를 던지기 동작까지 연결해보겠습니다.</p></div></article></div>`}
};
function appendText(t){const el=document.getElementById('obs');if(el)el.value=(el.value?el.value+' · ':'')+t}
function render(){route=(location.hash||'#dashboard').slice(1);if(!screens[route])route='dashboard';document.getElementById('view').innerHTML=screens[route]();document.getElementById('crumb').textContent={dashboard:'Dashboard',players:'Players',player:'Players / 김민준',classes:'Classes',classDetail:'Classes / 강남 토요일 A반',classLog:'Class Log',skill:'Players / 김민준 / Skill',reports:'Reports',report:'Reports / 김민준 / 2026.09'}[route];bindNav();window.scrollTo(0,0)}
let route='dashboard';window.addEventListener('hashchange',render);render();
