(function () {
  // 실데이터 7건 (국내_주요기업_자금조달_뉴스_요약.html 리서치 결과 그대로 반영, 2026-08-12 기준)
  var DATA = [
    {
      id: 'sk-hynix',
      company: 'SK하이닉스',
      methodCategory: '유상증자',
      methodDetail: '유상증자(제3자배정·해외DR/나스닥 ADR)',
      sector: '반도체',
      amount: 454534,
      amountBasis: '신주 1,779만주 × 참고발행가 255만5,000원 ≈ 454,534억원',
      purpose: { text: '용인 반도체클러스터 1기 팹 건설, 청주 P&T7 어드밴스드패키징 팹·EUV 스캐너 등 시설투자', confirmed: true },
      disclosureDate: '2026-06-24',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: false, note: 'DART 접수사실 직접 확인, 세부 수치는 3개 경제지 교차확인.' },
      outOfRange: false,
      sourceUrls: [
        { label: 'DART 주요사항보고서(rcpNo 20260624000420)', url: 'https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260624000420' },
        { label: '머니투데이 — SK하이닉스 45.5조 규모 신주 DR 발행', url: 'https://www.mt.co.kr/industry/2026/06/24/2026062416513319330' },
        { label: '전자신문 — SK하이닉스 나스닥 ADR 발행 확정', url: 'https://www.etnews.com/20260624000425' }
      ]
    },
    {
      id: 'daehan-air',
      company: '대한항공',
      methodCategory: '회사채',
      methodDetail: '회사채(공모)',
      sector: '항공',
      amount: 2000,
      amountBasis: '2년물 800억+3년물 1,200억=모집 2,000억(최대 4,000억 검토)',
      purpose: { text: '미확인(기사에 목적 미기재)', confirmed: false },
      disclosureDate: '2026-06-01',
      verification: { amountConfirmed: true, purposeConfirmed: false, inProgress: false, note: '모집액·수요배수(1조1,140억 주문, 5.57배)는 확인. 목적·최종 증액 여부는 미확인.' },
      outOfRange: false,
      sourceUrls: [
        { label: '이데일리 — 대한항공 회사채 수요예측 흥행', url: 'https://www.edaily.co.kr/News/Read?newsId=04749446645477456&mediaCodeNo=257' },
        { label: '마켓인(이데일리) — 6월 회사채 발행 재개', url: 'https://marketin.edaily.co.kr/News/Read?newsId=01338246645454496' }
      ]
    },
    {
      id: 'lotte-shopping',
      company: '롯데쇼핑',
      methodCategory: '회사채',
      methodDetail: '회사채(공모)',
      sector: '유통',
      amount: 2000,
      amountBasis: '2년물 800억+3년물 1,200억=모집 2,000억(최대 4,000억 검토), 신용등급 AA-',
      purpose: { text: '미확인(기사에 목적 미기재)', confirmed: false },
      disclosureDate: '2026-06-01',
      verification: { amountConfirmed: true, purposeConfirmed: false, inProgress: false, note: '모집액은 확인. 목적·최종 증액 여부·실제 수요배수는 후속기사로 교차확인하지 못함.' },
      outOfRange: false,
      sourceUrls: [
        { label: '마켓인(이데일리) — 롯데쇼핑·대한항공 수요예측', url: 'https://marketin.edaily.co.kr/News/Read?newsId=01338246645454496' },
        { label: '다음뉴스(제휴) — 롯데쇼핑 회사채 관련 보도', url: 'https://v.daum.net/v/20260531120316949?f=p' }
      ]
    },
    {
      id: 'gs-entec',
      company: 'GS엔텍',
      methodCategory: '회사채',
      methodDetail: '회사채(공모, GS글로벌 지급보증)',
      sector: '조선·해양플랜트',
      amount: 350,
      amountBasis: '2년물 200억+3년물 150억=모집 350억, 940억 주문(2.7배)',
      purpose: { text: '2년물(200억) 운영자금, 3년물(150억) 해상풍력 하부구조물 제조 설비투자', confirmed: true },
      disclosureDate: '2026-07-08~07-16',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: false, note: '신용등급 A0(안정적), 모회사 GS글로벌 지급보증부.' },
      outOfRange: false,
      sourceUrls: [
        { label: '이데일리 — GS엔텍 회사채 수요예측서 940억 주문', url: 'https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=04916726645512552' },
        { label: '파이낸셜뉴스 — GS엔텍, 최대주주 신용 지원으로 공모채 도전', url: 'https://www.fnnews.com/news/202606251351134347' }
      ]
    },
    {
      id: 'shinsegae-const',
      company: '신세계건설(이마트 제3자배정)',
      methodCategory: '유상증자',
      methodDetail: '유상증자(제3자배정, 최대주주 전량 인수)',
      sector: '건설',
      amount: 5000,
      amountBasis: '보통주 1,000만주×5만원=5,000억(현금 2,400억+현물 2,600억)',
      purpose: { text: '재무구조 개선 및 운영자금 확보(이마트 명일점 토지·건물 현물출자 포함)', confirmed: true },
      disclosureDate: '2026-05-14',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: true, note: '현금분(2,400억) 6/25 납입 완료, 현물분(2,600억)은 법원 인가 후 8/24 출자 예정 — 진행중.' },
      outOfRange: false,
      sourceUrls: [
        { label: '유스데일리 — 이마트, 신세계건설에 5천억 유상증자', url: 'https://www.youthdaily.co.kr/news/article.html?no=219186' },
        { label: '블로터 — 신세계건설, 모회사 자산 출자로 재무구조 개선', url: 'https://www.bloter.net/news/articleView.html?idxno=663277' }
      ]
    },
    {
      id: 'sk-dnd',
      company: 'SK디앤디',
      methodCategory: '유상증자',
      methodDetail: '유상증자(주주배정)',
      sector: '신재생·부동산개발',
      amount: 1367,
      amountBasis: '신주 4,468만1,000주×예정발행가 3,060원=1,367.2386억원(반올림 1,367억)',
      purpose: { text: '하반기 만기 차입금 상환 및 군포 트리아츠 사업 추가자금 대응(전액 채무상환)', confirmed: true },
      disclosureDate: '2026-07-28',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: true, note: '2026-08-06 금융감독원이 정정신고서 제출을 요구해 증권신고서 효력이 정지된 상태 — 진행중.' },
      outOfRange: false,
      sourceUrls: [
        { label: '한국경제 — SK디앤디 1367억 유상증자', url: 'https://www.hankyung.com/article/202607293392i' },
        { label: '아주경제 — SK디앤디, 조달 자금 전액 채무상환', url: 'https://www.ajunews.com/view/20260728202730873' }
      ]
    },
    {
      id: 'samsung-fn-reit',
      company: '삼성FN리츠',
      methodCategory: '회사채',
      methodDetail: '회사채(공모)',
      sector: '리츠',
      amount: 2000,
      amountBasis: '1.5년물 900억(3.97%)+2년물 1,100억(4.23%)=2,000억',
      purpose: { text: '삼성생명 잠실빌딩 자산 편입 대금(전액 자산 매입 대금 충당, 자사자금 130억 추가 투입)', confirmed: true },
      disclosureDate: '2026-03-17',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: false, note: '날짜가 조사 기간(6~8월)보다 이름 — 참고용으로만 포함, 합계·통계에서는 제외.' },
      outOfRange: true,
      sourceUrls: [
        { label: '다음뉴스 — 삼성FN리츠, 유상증자 대신 회사채 선택', url: 'https://v.daum.net/v/20260309143301129' },
        { label: '딜사이트 — 삼성FN리츠, 잠실빌딩 편입에 자산 1조 돌파', url: 'https://dealsite.co.kr/articles/162660' }
      ]
    }
  ];

  function getInRangeRecords() {
    return DATA.filter(function (r) { return !r.outOfRange; });
  }

  function computeTotal(records) {
    var sum = records.reduce(function (acc, r) { return acc + r.amount; }, 0);
    var basisText = records.map(function (r) { return r.amount.toLocaleString('ko-KR'); }).join('+') +
      ' = ' + sum.toLocaleString('ko-KR') + '억원';
    return { sum: sum, basisText: basisText };
  }

  // 공용 상태 판정 헬퍼 — 홈 배지와 상세 화면이 동일한 기준을 공유
  function renderStatus(record) {
    var v = record.verification;
    var level, label;
    if (v.amountConfirmed && v.purposeConfirmed) {
      if (v.inProgress) { level = 'confirmed-progress'; label = '확인(진행중)'; }
      else { level = 'confirmed'; label = '확인'; }
    } else if (v.amountConfirmed && !v.purposeConfirmed) {
      level = 'partial'; label = '부분확인(목적 미확인)';
    } else if (!v.amountConfirmed && v.purposeConfirmed) {
      level = 'partial'; label = '부분확인(금액 미확인)';
    } else {
      level = 'unconfirmed'; label = '미확인';
    }
    return { level: level, label: label, progressText: v.inProgress ? v.note : null, note: v.note };
  }

  function renderHome() {
    var inRange = getInRangeRecords();
    var total = computeTotal(inRange);

    document.getElementById('summaryCard').innerHTML =
      '<p class="summary-label">확인된 자금조달 합계 (2026년 6~8월, ' + inRange.length + '건 — 기간 외 참고건 제외)</p>' +
      '<p class="summary-amount">' + total.sum.toLocaleString('ko-KR') + '<span class="unit">억원</span></p>' +
      '<p class="summary-basis">' + total.basisText + '</p>';

    var listHtml = DATA.map(function (r) {
      var rangeTag = r.outOfRange ? '<span class="out-range-tag">참고용·기간 외</span>' : '';
      var status = renderStatus(r);
      return '<li class="funding-item' + (r.outOfRange ? ' out-range' : '') + '" data-id="' + r.id + '">' +
        '<div class="funding-main">' +
        '<span class="funding-company">' + r.company + '</span>' +
        '<span class="funding-method">' + r.methodDetail + '</span>' +
        '<span class="funding-date">' + r.disclosureDate + '</span>' +
        '</div>' +
        '<div class="funding-side">' +
        '<span class="funding-amount">' + r.amount.toLocaleString('ko-KR') + '<span class="unit">억원</span></span>' +
        '<span class="status-badge ' + status.level + '">' + status.label + '</span>' +
        rangeTag +
        '</div>' +
        '</li>';
    }).join('');
    document.getElementById('fundingList').innerHTML = listHtml;
  }

  // 건별 상세: 선택 상태는 localStorage에 저장(마지막 선택 유지)
  var SELECTED_KEY = 'fundraisingBrief.selectedRecordId';

  function getSelectedRecord() {
    var id = localStorage.getItem(SELECTED_KEY);
    return DATA.filter(function (r) { return r.id === id; })[0] || null;
  }

  function renderDetail() {
    var record = getSelectedRecord();
    var container = document.getElementById('detailContent');
    if (!record) {
      container.innerHTML =
        '<p class="desc">선택된 항목이 없습니다. 홈 화면에서 항목을 클릭해 주세요.</p>' +
        '<button class="save-btn" id="goHomeBtn" type="button">홈으로 가기</button>';
      document.getElementById('goHomeBtn').addEventListener('click', function () { showScreen('screen-home'); });
      return;
    }
    var status = renderStatus(record);
    var sourcesHtml = record.sourceUrls.map(function (s) {
      return '<li><a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + '</a></li>';
    }).join('');
    container.innerHTML =
      '<button class="back-link" id="backToHomeBtn" type="button">&larr; 목록으로</button>' +
      '<h3>' + record.company + '</h3>' +
      '<p class="detail-method">' + record.methodDetail + ' · ' + record.sector + '</p>' +
      '<p class="detail-row"><strong>금액:</strong> ' + record.amount.toLocaleString('ko-KR') + '억원</p>' +
      '<p class="detail-basis">계산 근거: ' + record.amountBasis + '</p>' +
      '<p class="detail-row"><strong>조달목적:</strong> ' + record.purpose.text + '</p>' +
      '<p class="detail-row"><strong>공시일:</strong> ' + record.disclosureDate + '</p>' +
      '<p class="detail-status ' + status.level + '">상태: ' + status.label + '</p>' +
      (status.note ? '<p class="detail-note">' + status.note + '</p>' : '') +
      '<p class="detail-row"><strong>출처</strong></p>' +
      '<ul class="source-list">' + sourcesHtml + '</ul>';
    document.getElementById('backToHomeBtn').addEventListener('click', function () { showScreen('screen-home'); });
  }

  // 통계/분포: DATA에서 파생 계산 (하드코딩 없음)
  function groupBy(records, keyFn) {
    var groups = {};
    var order = [];
    records.forEach(function (r) {
      var key = keyFn(r);
      if (!groups[key]) { groups[key] = { label: key, count: 0, amountSum: 0 }; order.push(key); }
      groups[key].count += 1;
      groups[key].amountSum += r.amount;
    });
    return order.map(function (key) { return groups[key]; });
  }

  function computeByMethod(records) {
    return groupBy(records, function (r) { return r.methodCategory; });
  }

  function computeBySector(records) {
    return groupBy(records, function (r) { return r.sector; });
  }

  function computeConfirmedRatio(records) {
    var confirmedCount = records.filter(function (r) {
      return r.verification.amountConfirmed && r.verification.purposeConfirmed;
    }).length;
    var total = records.length;
    var pct = total === 0 ? 0 : Math.round((confirmedCount / total) * 1000) / 10;
    return { confirmedCount: confirmedCount, total: total, pct: pct };
  }

  function renderStatList(containerId, groups, totalSum) {
    var html = groups.map(function (g) {
      var share = totalSum === 0 ? 0 : Math.round((g.amountSum / totalSum) * 1000) / 10;
      return '<li class="stat-item">' +
        '<div class="stat-head">' +
        '<span class="stat-label">' + g.label + '</span>' +
        '<span class="stat-value">' + g.amountSum.toLocaleString('ko-KR') + '<span class="unit">억원 · ' + g.count + '건</span></span>' +
        '</div>' +
        '<div class="stat-bar-track"><div class="stat-bar-fill" style="width:' + share + '%"></div></div>' +
        '<span class="stat-share">전체의 ' + share + '% (' + g.amountSum.toLocaleString('ko-KR') + ' / ' + totalSum.toLocaleString('ko-KR') + ')</span>' +
        '</li>';
    }).join('');
    document.getElementById(containerId).innerHTML = html;
  }

  function renderStats() {
    var inRange = getInRangeRecords();
    var total = computeTotal(inRange);

    renderStatList('methodStatsList', computeByMethod(inRange), total.sum);
    renderStatList('sectorStatsList', computeBySector(inRange), total.sum);

    var ratio = computeConfirmedRatio(inRange);
    document.getElementById('ratioCard').innerHTML =
      '<h2>확인/미확인 비율</h2>' +
      '<p class="summary-label">금액·목적이 모두 확인된 건의 비율 (진행중 여부와 무관)</p>' +
      '<p class="summary-amount">' + ratio.pct + '<span class="unit">%</span></p>' +
      '<p class="summary-basis">계산: ' + ratio.total + '건 중 ' + ratio.confirmedCount + '건 확인 (' +
      ratio.confirmedCount + '/' + ratio.total + '×100=' + ratio.pct + '%)</p>';
  }

  // 관심기업 알림설정: Supabase(watchlist_items 테이블)에 저장 (실제 발송 없음)
  var SUPABASE_URL = 'https://mgooeyqqlqkioflwrzzi.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nb29leXFxbHFraW9mbHdyenppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MDE2MTksImV4cCI6MjEwMjA3NzYxOX0.LfEddPIq4KEkYxBaOsoxbNrmKllQQwUtDHO340B3nCk';
  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function setWatchlistSyncNote(text) {
    var note = document.getElementById('watchlistSyncNote');
    if (!note) return;
    note.textContent = text;
    note.style.display = text ? '' : 'none';
  }

  function showWatchSavedMsg() {
    var msg = document.getElementById('watchSavedMsg');
    msg.classList.add('show');
    setTimeout(function () { msg.classList.remove('show'); }, 2500);
  }

  async function loadWatchlist() {
    var res = await sb.from('watchlist_items').select('id, type, value').order('created_at', { ascending: true });
    if (res.error) {
      setWatchlistSyncNote('불러오기 실패: Supabase에 연결할 수 없습니다. (' + res.error.message + ')');
      return { companies: [], keywords: [] };
    }
    setWatchlistSyncNote('');
    var rows = res.data || [];
    return {
      companies: rows.filter(function (r) { return r.type === 'company'; }),
      keywords: rows.filter(function (r) { return r.type === 'keyword'; })
    };
  }

  async function addWatchlistItem(type, value) {
    var res = await sb.from('watchlist_items').insert({ type: type, value: value });
    if (res.error) {
      setWatchlistSyncNote('저장 실패: ' + res.error.message);
      return;
    }
    showWatchSavedMsg();
  }

  async function removeWatchlistItem(id) {
    var res = await sb.from('watchlist_items').delete().eq('id', id);
    if (res.error) {
      setWatchlistSyncNote('삭제 실패: ' + res.error.message);
      return;
    }
    showWatchSavedMsg();
  }

  function renderChips(containerId, items) {
    document.getElementById(containerId).innerHTML = items.map(function (item) {
      return '<li class="chip">' + escapeHtml(item.value) +
        '<button class="chip-remove" data-id="' + item.id + '" type="button">×</button>' +
        '</li>';
    }).join('');
    document.querySelectorAll('#' + containerId + ' .chip-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeWatchlistItem(btn.dataset.id).then(renderWatchlist);
      });
    });
  }

  async function renderWatchlist() {
    var wl = await loadWatchlist();
    renderChips('companyChips', wl.companies);
    renderChips('keywordChips', wl.keywords);
  }

  function initWatchlist() {
    setWatchlistSyncNote('불러오는 중...');
    renderWatchlist();

    document.getElementById('addCompanyBtn').addEventListener('click', async function () {
      var input = document.getElementById('companyInput');
      var value = input.value.trim();
      if (!value) return;
      await addWatchlistItem('company', value);
      input.value = '';
      renderWatchlist();
    });

    document.getElementById('addKeywordBtn').addEventListener('click', async function () {
      var input = document.getElementById('keywordInput');
      var value = input.value.trim();
      if (!value) return;
      await addWatchlistItem('keyword', value);
      input.value = '';
      renderWatchlist();
    });
  }

  // 메모: localStorage에 배열로 저장 (watchlist와 동일한 load/save/render 패턴)
  var NOTES_KEY = 'fundraisingBrief.notes';

  function loadNotes() {
    var raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveNotes(notes) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }

  function renderNotes() {
    var notes = loadNotes();
    var list = document.getElementById('noteList');
    if (notes.length === 0) {
      list.innerHTML = '<li class="mini-empty">아직 메모가 없습니다.</li>';
      return;
    }
    list.innerHTML = notes.map(function (n, i) {
      return '<li class="mini-item">' +
        '<div class="mini-text">' + n.text + '<div class="mini-meta">' + n.createdAt + '</div></div>' +
        '<button class="chip-remove" data-index="' + i + '" type="button">×</button>' +
        '</li>';
    }).join('');
    document.querySelectorAll('#noteList .chip-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var notes = loadNotes();
        notes.splice(Number(btn.dataset.index), 1);
        saveNotes(notes);
        renderNotes();
      });
    });
  }

  function initNotes() {
    renderNotes();
    document.getElementById('addNoteBtn').addEventListener('click', function () {
      var input = document.getElementById('noteInput');
      var value = input.value.trim();
      if (!value) return;
      var notes = loadNotes();
      notes.push({ text: value, createdAt: new Date().toLocaleString('ko-KR') });
      saveNotes(notes);
      input.value = '';
      renderNotes();
    });
  }

  // 체크리스트: localStorage에 배열로 저장, 토글완료는 chip-remove와 동일한 data-index 위임 패턴
  var CHECKLIST_KEY = 'fundraisingBrief.checklist';

  function loadChecklist() {
    var raw = localStorage.getItem(CHECKLIST_KEY);
    if (!raw) return [];
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveChecklist(items) {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(items));
  }

  function renderChecklist() {
    var items = loadChecklist();
    var list = document.getElementById('checklistList');
    if (items.length === 0) {
      list.innerHTML = '<li class="mini-empty">체크리스트가 비어 있습니다.</li>';
      return;
    }
    list.innerHTML = items.map(function (item, i) {
      return '<li class="mini-item check-item' + (item.done ? ' done' : '') + '">' +
        '<input type="checkbox" data-index="' + i + '"' + (item.done ? ' checked' : '') + '>' +
        '<label class="check-label" data-index="' + i + '">' + item.text + '</label>' +
        '<button class="chip-remove" data-index="' + i + '" type="button">×</button>' +
        '</li>';
    }).join('');

    function toggleDone(index) {
      var items = loadChecklist();
      items[index].done = !items[index].done;
      saveChecklist(items);
      renderChecklist();
    }

    document.querySelectorAll('#checklistList input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () { toggleDone(Number(cb.dataset.index)); });
    });
    document.querySelectorAll('#checklistList .check-label').forEach(function (label) {
      label.addEventListener('click', function () { toggleDone(Number(label.dataset.index)); });
    });
    document.querySelectorAll('#checklistList .chip-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var items = loadChecklist();
        items.splice(Number(btn.dataset.index), 1);
        saveChecklist(items);
        renderChecklist();
      });
    });
  }

  function initChecklist() {
    renderChecklist();
    document.getElementById('addChecklistBtn').addEventListener('click', function () {
      var input = document.getElementById('checklistInput');
      var value = input.value.trim();
      if (!value) return;
      var items = loadChecklist();
      items.push({ text: value, done: false });
      saveChecklist(items);
      input.value = '';
      renderChecklist();
    });
  }

  renderHome();
  renderDetail();
  renderStats();
  initWatchlist();
  initNotes();
  initChecklist();

  document.getElementById('fundingList').addEventListener('click', function (e) {
    var item = e.target.closest('.funding-item');
    if (!item) return;
    localStorage.setItem(SELECTED_KEY, item.dataset.id);
    renderDetail();
    showScreen('screen-detail');
  });

  // 테마 토글: localStorage에 저장된 값으로 로드 시 복원
  var THEME_KEY = 'fundraisingBrief.theme';
  var themeBtn = document.getElementById('themeBtn');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtn.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
  }

  var savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  // 탭 네비게이션: 화면 전환만 담당 (데이터 렌더링은 다음 태스크에서 추가)
  var tabButtons = document.querySelectorAll('.tab-btn');
  var screens = document.querySelectorAll('.screen');

  function showScreen(targetId) {
    screens.forEach(function (s) { s.classList.toggle('active', s.id === targetId); });
    tabButtons.forEach(function (b) { b.classList.toggle('active', b.dataset.target === targetId); });
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { showScreen(btn.dataset.target); });
  });

  showScreen('screen-home');
})();
