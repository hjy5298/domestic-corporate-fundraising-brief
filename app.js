(function () {
  // 실데이터 6건 (DART 최근 1주일 자금조달 공시 리서치 결과 반영, 2026-08-05~2026-08-12 / 조사일 2026-08-12 기준)
  // 금융업종(은행·증권·보험·카드·캐피탈·리츠·금융지주 등) 자금조달은 범위에서 제외한다.
  var DATA = [
    {
      id: 'hlb-cb',
      company: 'HLB(에이치엘비)',
      methodCategory: '전환사채',
      methodDetail: '전환사채(CB, 무기명식 무보증 사모, 제44회)',
      sector: '제약·바이오(신약개발)',
      amount: 300,
      amountBasis: '제44회 사모 전환사채 발행총액 300억원(이사회 결의 공시 원문)',
      purpose: { text: '신약 개발 R&D비, 임상자금 및 상업화 비용(운영자금) — 2026년 100억원, 2027년 200억원 집행 계획', confirmed: true },
      disclosureDate: '2026-08-05',
      issueDate: '2026-08-19',
      maturityDate: '2029-08-19',
      couponRate: null,
      yieldRate: null,
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: true, note: '이사회 결의 2026-08-05, 납입일(발행일) 2026-08-19, 만기 2029-08-19, 전환가 33,361원. CBC뉴스·코메디닷컴 교차확인. 표면이자율·만기이자율은 기사에 없어 미확인. 다만 코메디닷컴 기사의 "BNK투자증권 245억원 인수" 표현 등 300억원 중 일부 인수처리 방식이 명확치 않아 진행중으로 표시.' },
      outOfRange: false,
      sourceUrls: [
        { label: 'CBC뉴스 — HLB 300억원 규모 사모 CB 발행', url: 'https://www.cbci.co.kr/news/articleView.html?idxno=594831' },
        { label: '코메디닷컴 — HLB 사모 전환사채 300억원 발행', url: 'https://kormedi.com/2842771/' }
      ]
    },
    {
      id: 'delicious-ipo',
      company: '딜리셔스',
      methodCategory: '유상증자 및 IPO',
      methodDetail: 'IPO(코스닥, 일반공모)',
      sector: '이커머스·플랫폼(패션 B2B 도매 "신상마켓")',
      amount: 154,
      amountBasis: '공모가 7,000원×공모주식수 220만주(기관 165만+일반 55만)=154억원(기사 직접 명시)',
      purpose: { text: '물류자동화 설비투자 약 20억원, 글로벌 마케팅·해외파트너십 등 운영자금 약 43.6억원, 패션 이커머스 SaaS·AI 콘텐츠기업 인수·지분투자 약 86억원', confirmed: true },
      disclosureDate: '2026-08-06~2026-08-12',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: false, note: '주금 납입일(8/6)·코스닥 상장일(8/12)이 조사기간 내. 머니투데이·뉴스핌·이투데이 교차확인. 목적별 세부금액 합(약 149.6억)이 총액 154억과 약 4억원 차이 있어 세부 배분은 근사치.' },
      outOfRange: false,
      sourceUrls: [
        { label: '머니투데이 — 딜리셔스 코스닥 IPO 일반청약 마감', url: 'https://www.mt.co.kr/stock/2026/08/04/2026080417240070007' },
        { label: '뉴스핌 — 딜리셔스 공모가 7,000원 확정', url: 'https://www.newspim.com/news/view/20260731001349' },
        { label: '이투데이 — 딜리셔스 자금사용계획(SaaS·글로벌 확장)', url: 'https://www.etoday.co.kr/news/view/2608823' }
      ]
    },
    {
      id: 'nearthlab-ipo',
      company: '니어스랩',
      methodCategory: '유상증자 및 IPO',
      methodDetail: 'IPO(코스닥, 일반공모)',
      sector: '로봇·드론(산업용 AI 드론)',
      amount: 375,
      amountBasis: '공모가 41,200원(희망밴드 상단) 기준 총 공모금액 약 375억원(기사 직접 명시)',
      purpose: { text: '자가공장 설립을 통한 생산 인프라 내재화(2027~2028 단계적 투자), 생산·품질경영 인력 확충, 기업부설연구소 중심 R&D 및 제품고도화', confirmed: true },
      disclosureDate: '2026-08-07~2026-08-12',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: false, note: '수요예측 국내외 기관 1,795곳·경쟁률 743.5:1, 93.87%가 상단가 제시. 매체별 수요예측 종료일 표기가 8/7·8/11로 엇갈리나 최종 공모가·경쟁률은 두 매체 모두 일치.' },
      outOfRange: false,
      sourceUrls: [
        { label: '뉴스토모토(IB토마토) — 니어스랩 공모가 최상단 확정', url: 'https://www.newstomato.com/ReadNews.aspx?no=1309896' },
        { label: '플래텀 — 니어스랩 공모가 41,200원 확정', url: 'https://platum.kr/archives/292340' }
      ]
    },
    {
      id: 'kns-inc-ipo',
      company: '케이앤에스아이앤씨',
      methodCategory: '유상증자 및 IPO',
      methodDetail: 'IPO(코스닥, 일반공모)',
      sector: '방위산업·통신장비(위성통신 안테나)',
      amount: 264,
      amountBasis: '공모가 11,000원(희망밴드 상단)×공모주식수 240만주=264억원',
      purpose: { text: '군용·ESA 평판 안테나 R&D 인력 확충 및 인프라 고도화, ESA 측정·RF 설계 소프트웨어 도입, RF 통신부품 등 원자재 확보', confirmed: true },
      disclosureDate: '2026-08-04~2026-08-07',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: false, note: '공모가 확정 발표는 8/3(기간 직전)이나 일반청약(8/4~8/5)·납입일(8/7 추정)이 조사기간 내. 한국경제·서울경제로 공모가·경쟁률(기관 938.24:1, 일반 1,079.55:1) 교차확인. 상장일(8/13)은 조사기간 이후.' },
      outOfRange: false,
      sourceUrls: [
        { label: '한국경제 — 케이앤에스아이앤씨 공모가 상단 확정', url: 'https://www.hankyung.com/article/202608032221r' },
        { label: '서울경제 — 케이앤에스아이앤씨 청약 경쟁률 1,079:1', url: 'https://www.sedaily.com/article/20076112' }
      ]
    },
    {
      id: 'kido-ipo',
      company: '기도산업',
      methodCategory: '유상증자 및 IPO',
      methodDetail: 'IPO(코스닥, 일반공모)',
      sector: '섬유·의류(하이테크 아웃도어 OEM)',
      amount: 483,
      amountBasis: '공모가 28,400원(희망밴드 상단)×공모주식수 170만주=482.8억원→483억원(반올림, 기사에도 483억원 명시)',
      purpose: { text: '방글라데시 공장 생산라인 증설 등 시설투자 — 공모가 하단 기준 조달자금 328억원의 71%인 235억원을 증설에 투입(2028년 중반 완료 목표)', confirmed: true },
      disclosureDate: '2026-08-06, 2026-08-11~2026-08-12',
      verification: { amountConfirmed: true, purposeConfirmed: true, inProgress: false, note: '기관 수요예측 7/31~8/6(637개 기관, 경쟁률 213.3:1), 일반청약 8/11~8/12. 이투데이·이데일리 교차확인. 목적별 투입액(235억)은 공모가 하단 기준 328억을 base로 계산돼 최종 확정액(483억, 상단가)과 산정 기준이 달라 절대금액은 참고용.' },
      outOfRange: false,
      sourceUrls: [
        { label: '이투데이 — 기도산업 하이테크 아웃도어 목표', url: 'https://www.etoday.co.kr/news/view/2611801' },
        { label: '이데일리 — 기도산업 일반공모 돌입', url: 'https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=03719526645546336' }
      ]
    },
    {
      id: 'uti-rights-issue',
      company: '유티아이(UTI)',
      methodCategory: '유상증자 및 IPO',
      methodDetail: '유상증자(일반공모)',
      sector: '전자부품·디스플레이소재(강화유리, 반도체 유리기판)',
      amount: 30,
      amountBasis: '확정 발행가 1,684원×발행주식수 177만8,907주=29억9,567만9,388원→약 30억원(반올림)',
      purpose: { text: '미확인(기사에 사용목적 미기재)', confirmed: false },
      disclosureDate: '2026-08-06',
      verification: { amountConfirmed: false, purposeConfirmed: false, inProgress: false, note: '2026-08-06 이사회에서 발행가액 확정(당초 예정가 1,896원→1,684원, 발행주식수 158만주→177.89만주 상향). Investing.com 단일 출처만 확인되어 2개 이상 매체 교차확인에 실패 — 금액·목적 모두 미확인으로 표시.' },
      outOfRange: false,
      sourceUrls: [
        { label: 'Investing.com — 유티아이 유상증자 발행가액 확정', url: 'https://kr.investing.com/news/global-filings/article-93CH-2048283' }
      ]
    }
  ];

  function getInRangeRecords() {
    return DATA.filter(function (r) { return !r.outOfRange; });
  }

  // amount가 null인 건(DART에서 실시간 감지됐지만 원문 확인 전인 건)은 합계에서 제외한다.
  function computeTotal(records) {
    var known = records.filter(function (r) { return typeof r.amount === 'number'; });
    var unknownCount = records.length - known.length;
    var sum = known.reduce(function (acc, r) { return acc + r.amount; }, 0);
    var basisText = known.length === 0
      ? '해당 기간 건 없음 = 0억원'
      : known.map(function (r) { return r.amount.toLocaleString('ko-KR'); }).join('+') + ' = ' + sum.toLocaleString('ko-KR') + '억원';
    if (unknownCount > 0) {
      basisText += ' (금액 미확인 ' + unknownCount + '건 별도, 합계 제외)';
    }
    return { sum: sum, basisText: basisText };
  }

  // 조회 기간 필터: 공시일(disclosureDate) 기준으로 목록/합계/통계를 좁혀서 보여줌
  var DATE_FILTER_KEY = 'fundraisingBrief.dateFilter';

  function fmtDate(d) {
    var y = d.getFullYear(), m = ('0' + (d.getMonth() + 1)).slice(-2), day = ('0' + d.getDate()).slice(-2);
    return y + '-' + m + '-' + day;
  }

  // disclosureDate는 'YYYY-MM-DD', 'YYYY-MM-DD~MM-DD', 'YYYY-MM-DD~YYYY-MM-DD',
  // 'YYYY-MM-DD, YYYY-MM-DD~YYYY-MM-DD' 등 여러 표기를 섞어 쓰므로, 콤마/물결로 나눠 각 조각을
  // 날짜로 복원한 뒤 그 중 최소·최대를 그 건의 날짜 범위로 삼는다.
  function getRecordDateRange(record) {
    var parts = record.disclosureDate.split(/,|~/).map(function (s) { return s.trim(); });
    var year = null, dates = [];
    parts.forEach(function (p) {
      var full = p.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      var partial = p.match(/^(\d{2})-(\d{2})$/);
      if (full) {
        year = full[1];
        dates.push(new Date(Number(full[1]), Number(full[2]) - 1, Number(full[3])));
      } else if (partial && year) {
        dates.push(new Date(Number(year), Number(partial[1]) - 1, Number(partial[2])));
      }
    });
    if (dates.length === 0) return null;
    var times = dates.map(function (d) { return d.getTime(); });
    return { start: new Date(Math.min.apply(null, times)), end: new Date(Math.max.apply(null, times)) };
  }

  function getDateFilter() {
    try {
      var saved = JSON.parse(localStorage.getItem(DATE_FILTER_KEY));
      if (saved && (saved.start || saved.end)) return saved;
    } catch (e) { /* 저장된 값이 없거나 손상된 경우 전체 기간으로 처리 */ }
    return { start: null, end: null };
  }

  function setDateFilter(filter) {
    localStorage.setItem(DATE_FILTER_KEY, JSON.stringify(filter));
  }

  function recordMatchesFilter(record, filter) {
    if (!filter.start && !filter.end) return true;
    var range = getRecordDateRange(record);
    if (!range) return false;
    if (filter.start && range.end < new Date(filter.start + 'T00:00:00')) return false;
    if (filter.end && range.start > new Date(filter.end + 'T23:59:59')) return false;
    return true;
  }

  // 자금조달 방식 필터: 회사채·유상증자 및 IPO·전환사채·신주인수권부사채·교환사채·영구채 중 켜둔 것만 보여줌
  var CATEGORY_FILTER_KEY = 'fundraisingBrief.categoryFilter';
  var ALL_CATEGORIES = ['회사채', '유상증자 및 IPO', '전환사채', '신주인수권부사채', '교환사채', '영구채'];

  // 이전 버전에 저장된 구 카테고리 값을 현재 체계로 이전한다.
  var LEGACY_CATEGORY_MAP = {
    '주요사항보고(메자닌)': ['전환사채', '신주인수권부사채', '교환사채', '영구채'],
    '유상증자': ['유상증자 및 IPO'],
    'IPO': ['유상증자 및 IPO']
  };

  function migrateCategoryList(list) {
    var result = [];
    list.forEach(function (key) {
      var mapped = LEGACY_CATEGORY_MAP[key] || [key];
      mapped.forEach(function (m) { if (result.indexOf(m) === -1) result.push(m); });
    });
    return result;
  }

  function getCategoryFilter() {
    try {
      var saved = JSON.parse(localStorage.getItem(CATEGORY_FILTER_KEY));
      if (Array.isArray(saved)) return migrateCategoryList(saved);
    } catch (e) { /* 저장된 값이 없거나 손상된 경우 전체 선택으로 처리 */ }
    return ALL_CATEGORIES.slice();
  }

  function setCategoryFilter(categories) {
    localStorage.setItem(CATEGORY_FILTER_KEY, JSON.stringify(categories));
  }

  function recordMatchesCategoryFilter(record, categories) {
    return categories.indexOf(record.methodCategory) !== -1;
  }

  // 회사명 검색: 대소문자 구분 없이 부분일치, 공백은 무시
  var COMPANY_SEARCH_KEY = 'fundraisingBrief.companySearch';

  function getCompanySearch() {
    return localStorage.getItem(COMPANY_SEARCH_KEY) || '';
  }

  function setCompanySearch(term) {
    localStorage.setItem(COMPANY_SEARCH_KEY, term);
  }

  function recordMatchesCompanySearch(record, term) {
    if (!term) return true;
    var normalize = function (s) { return String(s).toLowerCase().replace(/\s+/g, ''); };
    return normalize(record.company).indexOf(normalize(term)) !== -1;
  }

  // DART 실시간 조회 결과: 새로고침하면 사라지는 임시 데이터(저장하지 않음)
  var liveRecords = [];
  var liveFetchState = { loading: false, error: null, truncated: false };

  function normalizeCompanyKey(name) {
    return String(name).replace(/\(.*?\)/g, '').replace(/\s+/g, '');
  }

  // 실시간으로 감지된 건이 이미 수동으로 검증해둔 건과 같은 이벤트로 보이면 중복 표시하지 않는다.
  function isDuplicateOfCurated(liveItem) {
    var liveRange = getRecordDateRange(liveItem);
    if (!liveRange) return false;
    return DATA.some(function (r) {
      if (r.outOfRange) return false;
      var a = normalizeCompanyKey(r.company), b = normalizeCompanyKey(liveItem.company);
      if (a.indexOf(b) === -1 && b.indexOf(a) === -1) return false;
      var range = getRecordDateRange(r);
      if (!range) return false;
      return !(liveRange.end < range.start || liveRange.start > range.end);
    });
  }

  function getVisibleRecords() {
    var filter = getDateFilter();
    var categories = getCategoryFilter();
    var searchTerm = getCompanySearch();
    var curated = getInRangeRecords().filter(function (r) {
      return recordMatchesFilter(r, filter) && recordMatchesCategoryFilter(r, categories) && recordMatchesCompanySearch(r, searchTerm);
    });
    var live = liveRecords.filter(function (r) {
      return recordMatchesFilter(r, filter) && recordMatchesCategoryFilter(r, categories) && recordMatchesCompanySearch(r, searchTerm) && !isDuplicateOfCurated(r);
    });
    var merged = curated.concat(live);
    merged.sort(function (a, b) {
      var ra = getRecordDateRange(a), rb = getRecordDateRange(b);
      if (!ra || !rb) return 0;
      return rb.start - ra.start;
    });
    return merged;
  }

  function describeFilter(filter) {
    if (!filter.start && !filter.end) return '전체 기간';
    return (filter.start || '처음') + ' ~ ' + (filter.end || '오늘');
  }

  // 선택한 기간을 DART에 실시간으로 조회한다. 금액·목적은 원문 확인 전이라 항상 미확인으로 채워지고,
  // 새로고침하면 사라지는 임시 데이터라 localStorage에는 저장하지 않는다.
  // CB/BW/EB·유상증자 상세 API까지 함께 조회하느라 20초 이상 걸릴 수 있어, 기본 타임아웃이 짧은
  // sb.functions.invoke() 대신 fetch()를 직접 써서 타임아웃 문제를 피한다.
  function refreshLiveDisclosures(start, end) {
    liveFetchState = { loading: true, error: null, truncated: false };
    renderLiveFetchStatus();
    return fetch(SUPABASE_URL + '/functions/v1/dart-disclosures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ start: start, end: end })
    }).then(function (res) {
      return res.json().then(function (body) {
        if (!res.ok) throw new Error(body.error || ('HTTP ' + res.status));
        return body;
      });
    }).then(function (body) {
      if (body.error) throw new Error(body.error);
      liveRecords = body.results || [];
      liveFetchState = { loading: false, error: null, truncated: !!body.truncated };
      renderLiveFetchStatus();
      renderHome();
      renderStats();
    }).catch(function (err) {
      liveFetchState = { loading: false, error: (err && err.message) || String(err), truncated: false };
      renderLiveFetchStatus();
    });
  }

  function renderLiveFetchStatus() {
    var el = document.getElementById('liveFetchStatus');
    if (!el) return;
    if (liveFetchState.loading) {
      el.textContent = 'DART에서 실시간으로 조회 중...';
      el.className = 'live-fetch-status loading';
    } else if (liveFetchState.error) {
      el.textContent = 'DART 실시간 조회 실패: ' + liveFetchState.error + ' (아래 목록은 수동 검증된 건만 표시됩니다)';
      el.className = 'live-fetch-status error';
    } else if (liveRecords.length > 0 || liveFetchState.truncated) {
      var confirmedCount = liveRecords.filter(function (r) { return typeof r.amount === 'number'; }).length;
      el.textContent = 'DART에서 ' + liveRecords.length + '건 실시간 감지 (그중 금액 확인 ' + confirmedCount + '건, DART 상세 API 직접 확인)' +
        (liveFetchState.truncated ? ' — 건수가 많아 일부만 표시되었습니다.' : '');
      el.className = 'live-fetch-status ok';
    } else {
      el.textContent = '';
      el.className = 'live-fetch-status';
    }
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
    var filter = getDateFilter();
    var visible = getVisibleRecords();
    var total = computeTotal(visible);

    document.getElementById('summaryCard').innerHTML =
      '<p class="summary-label">확인된 자금조달 합계 (' + describeFilter(filter) + ', ' + visible.length + '건)</p>' +
      '<p class="summary-amount">' + total.sum.toLocaleString('ko-KR') + '<span class="unit">억원</span></p>';

    if (visible.length === 0) {
      document.getElementById('fundingList').innerHTML =
        '<li class="mini-empty">선택한 기간·방식·검색어에 해당하는 자금조달 건이 없습니다.</li>';
      return;
    }

    var listHtml = visible.map(function (r) {
      var rangeTag = r.outOfRange ? '<span class="out-range-tag">참고용·기간 외</span>' : '';
      var status = renderStatus(r);
      return '<li class="funding-item' + (r.outOfRange ? ' out-range' : '') + '" data-id="' + r.id + '">' +
        '<div class="funding-main">' +
        '<span class="funding-company">' + r.company + '</span>' +
        '<span class="funding-method">' + r.methodDetail + '</span>' +
        '<span class="funding-date">' + r.disclosureDate + '</span>' +
        '</div>' +
        '<div class="funding-side">' +
        '<span class="funding-amount">' + (typeof r.amount === 'number' ? r.amount.toLocaleString('ko-KR') + '<span class="unit">억원</span>' : '확인 필요') + '</span>' +
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
    return DATA.concat(liveRecords).filter(function (r) { return r.id === id; })[0] || null;
  }

  // 채권형 자금조달(회사채·전환사채·신주인수권부사채·교환사채·영구채)에만 발행일·만기일·이자율을 보여준다.
  var BOND_LIKE_CATEGORIES = ['회사채', '전환사채', '신주인수권부사채', '교환사채', '영구채'];

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

    var bondRowsHtml = '';
    if (BOND_LIKE_CATEGORIES.indexOf(record.methodCategory) !== -1) {
      bondRowsHtml =
        '<p class="detail-row"><strong>발행일:</strong> ' + (record.issueDate || '확인 필요') + '</p>' +
        '<p class="detail-row"><strong>만기일:</strong> ' + (record.maturityDate || '확인 필요') + '</p>' +
        '<p class="detail-row"><strong>표면이자율:</strong> ' + (typeof record.couponRate === 'number' ? record.couponRate + '%' : '확인 필요') + '</p>' +
        '<p class="detail-row"><strong>만기이자율:</strong> ' + (typeof record.yieldRate === 'number' ? record.yieldRate + '%' : '확인 필요') + '</p>';
    }

    container.innerHTML =
      '<button class="back-link" id="backToHomeBtn" type="button">&larr; 목록으로</button>' +
      '<h3>' + record.company + '</h3>' +
      '<p class="detail-method">' + record.methodDetail + ' · ' + record.sector + '</p>' +
      '<p class="detail-row"><strong>금액:</strong> ' + (typeof record.amount === 'number' ? record.amount.toLocaleString('ko-KR') + '억원' : '확인 필요(DART 원문 참고)') + '</p>' +
      '<p class="detail-basis">계산 근거: ' + record.amountBasis + '</p>' +
      '<p class="detail-row"><strong>조달목적:</strong> ' + record.purpose.text + '</p>' +
      '<p class="detail-row"><strong>공시일:</strong> ' + record.disclosureDate + '</p>' +
      bondRowsHtml +
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
      if (typeof r.amount === 'number') groups[key].amountSum += r.amount;
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
    var filter = getDateFilter();
    var visible = getVisibleRecords();
    var total = computeTotal(visible);
    var searchTerm = getCompanySearch();

    document.getElementById('statsFilterNote').textContent = '조회 기간: ' + describeFilter(filter) +
      (searchTerm ? (' · 검색: "' + searchTerm + '"') : '') + ' (' + visible.length + '건 기준)';

    renderStatList('methodStatsList', computeByMethod(visible), total.sum);
    renderStatList('sectorStatsList', computeBySector(visible), total.sum);

    var ratio = computeConfirmedRatio(visible);
    document.getElementById('ratioCard').innerHTML =
      '<h2>확인/미확인 비율</h2>' +
      '<p class="summary-label">금액·목적이 모두 확인된 건의 비율 (진행중 여부와 무관)</p>' +
      '<p class="summary-amount">' + ratio.pct + '<span class="unit">%</span></p>' +
      '<p class="summary-basis">계산: ' + ratio.total + '건 중 ' + ratio.confirmedCount + '건 확인 (' +
      ratio.confirmedCount + '/' + ratio.total + '×100=' + ratio.pct + '%)</p>';
  }

  // DART 실시간 조회(Edge Function 호출)에 쓰는 Supabase 클라이언트
  var SUPABASE_URL = 'https://mgooeyqqlqkioflwrzzi.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nb29leXFxbHFraW9mbHdyenppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MDE2MTksImV4cCI6MjEwMjA3NzYxOX0.LfEddPIq4KEkYxBaOsoxbNrmKllQQwUtDHO340B3nCk';
  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 자금조달 방식 버튼 표시 갱신: 조회 기간 초기화("전체 기간 보기")에서도 재사용하기 위해 상위 스코프에 둔다.
  function isAllCategoriesSelected() {
    var selected = getCategoryFilter();
    return ALL_CATEGORIES.every(function (c) { return selected.indexOf(c) !== -1; });
  }

  function syncCategoryButtonStates() {
    var selected = getCategoryFilter();
    var allSelected = isAllCategoriesSelected();
    document.querySelectorAll('.category-btn').forEach(function (btn) {
      if (btn.dataset.category === 'all') {
        btn.classList.toggle('active', allSelected);
      } else {
        btn.classList.toggle('active', selected.indexOf(btn.dataset.category) !== -1);
      }
    });
  }

  function initDateFilter() {
    var startInput = document.getElementById('filterStartInput');
    var endInput = document.getElementById('filterEndInput');
    var errorEl = document.getElementById('filterError');
    var presetButtons = document.querySelectorAll('.preset-btn');

    function showFilterError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.add('show');
    }

    function clearFilterError() {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }

    function applyAndRerender(filter) {
      clearFilterError();
      setDateFilter(filter);
      startInput.value = filter.start || '';
      endInput.value = filter.end || '';
      liveRecords = [];
      liveFetchState = { loading: false, error: null, truncated: false };
      renderHome();
      renderStats();
      if (filter.start && filter.end) {
        refreshLiveDisclosures(filter.start, filter.end);
      } else {
        renderLiveFetchStatus();
      }
    }

    var initial = getDateFilter();
    startInput.value = initial.start || '';
    endInput.value = initial.end || '';

    document.getElementById('applyFilterBtn').addEventListener('click', function () {
      var start = startInput.value || null;
      var end = endInput.value || null;
      if (start && end && start > end) {
        showFilterError('시작일이 종료일보다 늦을 수 없습니다. 기간을 다시 확인해 주세요.');
        return;
      }
      applyAndRerender({ start: start, end: end });
    });

    document.getElementById('resetFilterBtn').addEventListener('click', function () {
      setCategoryFilter(ALL_CATEGORIES.slice());
      syncCategoryButtonStates();
      applyAndRerender({ start: null, end: null });
    });

    presetButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var days = Number(btn.dataset.preset);
        var end = new Date();
        var start = new Date();
        start.setDate(start.getDate() - (days - 1));
        applyAndRerender({ start: fmtDate(start), end: fmtDate(end) });
      });
    });
  }

  function initCategoryFilter() {
    var buttons = document.querySelectorAll('.category-btn');

    syncCategoryButtonStates();

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.dataset.category;
        if (category === 'all') {
          setCategoryFilter(isAllCategoriesSelected() ? [] : ALL_CATEGORIES.slice());
        } else {
          var selected = getCategoryFilter();
          var idx = selected.indexOf(category);
          if (idx === -1) selected.push(category); else selected.splice(idx, 1);
          setCategoryFilter(selected);
        }
        syncCategoryButtonStates();
        renderHome();
        renderStats();
      });
    });
  }

  function initCompanySearch() {
    var input = document.getElementById('companySearchInput');
    input.value = getCompanySearch();

    input.addEventListener('input', function () {
      setCompanySearch(input.value);
      renderHome();
      renderStats();
    });

    document.getElementById('clearCompanySearchBtn').addEventListener('click', function () {
      input.value = '';
      setCompanySearch('');
      renderHome();
      renderStats();
    });
  }

  renderHome();
  renderDetail();
  renderStats();
  initDateFilter();
  initCategoryFilter();
  initCompanySearch();

  document.getElementById('fundingList').addEventListener('click', function (e) {
    var item = e.target.closest('.funding-item');
    if (!item) return;
    localStorage.setItem(SELECTED_KEY, item.dataset.id);
    renderDetail();
    showScreen('screen-detail');
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
