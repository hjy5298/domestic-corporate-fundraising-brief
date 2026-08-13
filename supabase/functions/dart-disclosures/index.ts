import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// DART report_nm(공시 제목)은 형식이 정형화되어 있어 키워드 매칭으로 신규 발행(자금조달) 건만 추려낸다.
// "발행결정"/"결정"이 없는 건(자기CB만기전취득·전환청구권행사·전환가액조정·철회 등)은 발행이 아니라
// 상환/회수/취소성 이벤트라서 제외한다. 지분증권 증권신고서는 IPO(신규상장)와 유상증자(일반공모) 둘 다
// 쓰는 서식이라 이 단계에서는 구분하지 않고 IPO로 잠정 분류한 뒤, 사람이 원문을 보고 확정하도록
// verification을 항상 미확인으로 둔다.
function classify(reportName: string) {
  if (reportName.includes("무상증자")) return null;
  if (reportName.includes("철회")) return null;
  if (reportName.includes("취득")) return null; // 자기CB/BW 만기전취득 등 회수성 이벤트

  if (reportName.includes("전환사채") && reportName.includes("발행결정")) {
    return { category: "전환사채", detail: "전환사채(CB)" };
  }
  if (reportName.includes("신주인수권부사채") && reportName.includes("발행결정")) {
    return { category: "신주인수권부사채", detail: "신주인수권부사채(BW)" };
  }
  if (reportName.includes("교환사채") && reportName.includes("발행결정")) {
    return { category: "교환사채", detail: "교환사채(EB)" };
  }
  if (reportName.includes("영구") && (reportName.includes("발행결정") || reportName.includes("증권신고서"))) {
    return { category: "영구채", detail: "영구채" };
  }
  if (reportName.includes("유상증자") && reportName.includes("결정")) {
    return { category: "유상증자 및 IPO", detail: "유상증자" };
  }
  if (reportName.includes("증권신고서")) {
    if (reportName.includes("채무증권")) return { category: "회사채", detail: "회사채(공모, 증권신고서)" };
    if (reportName.includes("지분증권")) return { category: "유상증자 및 IPO", detail: "IPO/유상증자 공모 추정(증권신고서-지분증권, 신규상장인지 기존 상장사 공모인지는 원문 확인 필요)" };
  }
  return null;
}

function fmtDartDate(d: string) {
  return d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6, 8);
}

function fmtDartDateOrNull(d: string | undefined) {
  if (!d) return null;
  if (/^\d{8}$/.test(d)) return fmtDartDate(d);
  // cvbdIsDecsn 등 상세 API는 날짜를 "2026년 08월 12일" 형식의 텍스트로 준다(list.json의 YYYYMMDD와 다름).
  const m = d.match(/(\d{4})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일/);
  if (!m) return null;
  return m[1] + "-" + m[2].padStart(2, "0") + "-" + m[3].padStart(2, "0");
}

function toEok(wonLike: string | number | undefined) {
  var n = Number(String(wonLike ?? "").replace(/,/g, ""));
  if (!isFinite(n) || n <= 0) return null;
  return Math.round(n / 1e8);
}

function toRate(v: string | number | undefined) {
  if (v === undefined || v === null || v === "") return null;
  var n = Number(String(v).replace(/,/g, ""));
  return isFinite(n) ? n : null;
}

// 유상증자결정(piicDecsn)/전환사채·신주인수권부사채·교환사채 발행결정 API가 공통으로 쓰는
// 자금조달목적 필드 — 총액 계산과 조달목적 문구 구성에 함께 쓴다.
var FDPP_LABELS: Record<string, string> = {
  fdpp_fclt: "시설자금", fdpp_bsninh: "영업양수자금", fdpp_op: "운영자금",
  fdpp_dtrp: "채무상환자금", fdpp_ocsa: "타법인증권취득자금", fdpp_etc: "기타자금",
};

function sumFdppWon(m: Record<string, any>) {
  return Object.keys(FDPP_LABELS).reduce(function (acc, k) {
    var v = Number(String(m[k] ?? "0").replace(/,/g, ""));
    return acc + (isFinite(v) ? v : 0);
  }, 0);
}

function buildPurposeFromFdpp(m: Record<string, any>) {
  var parts: string[] = [];
  Object.keys(FDPP_LABELS).forEach(function (k) {
    var v = Number(String(m[k] ?? "0").replace(/,/g, ""));
    if (isFinite(v) && v > 0) {
      var eok = toEok(v);
      parts.push(FDPP_LABELS[k] + (eok !== null ? "(" + eok + "억원)" : ""));
    }
  });
  return parts.length ? parts.join(", ") : null;
}

// 전환사채/신주인수권부사채/교환사채 발행결정 API는 스키마가 동일하다(총액 bd_fta, 만기일 bd_mtd,
// 표면이자율 bd_intr_ex, 만기이자율 bd_intr_sf). "발행일" 개념은 DART 문서에 없어 납입일(pymd)을
// 대용으로 쓴다. 순수 회사채는 이 발행결정 API 자체가 없어(자본시장법상 의무공시 대상이 아님) 대상에서 뺀다.
var BOND_DECISION_APIS: Record<string, string> = {
  "전환사채": "cvbdIsDecsn",
  "신주인수권부사채": "bdwtIsDecsn",
  "교환사채": "exbdIsDecsn",
};

// DART(opendart.fss.or.kr)는 TLS 1.2 + RSA 키교환(PFS 미지원)만 지원해서 Deno의 기본 fetch(rustls)가
// handshake 단계에서 거부당한다. libcurl 기반 Postgres http 확장을 릴레이로 써서 우회한다.
// 동시 호출이 많을 때 커넥션 풀 경합 등으로 가끔 실패하므로 짧은 대기 후 재시도한다.
async function fetchDartList(admin: ReturnType<typeof createClient>, url: string, retries = 2) {
  for (let attempt = 0; ; attempt++) {
    try {
      const { data, error } = await admin.rpc("http_get_text", { p_url: url });
      if (error) throw error;
      return JSON.parse(data as string);
    } catch (e) {
      if (attempt >= retries) throw e;
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
    }
  }
}

// 건별 발행결정 상세 API를 한꺼번에 다 병렬로 쏘면(수십 건) DART 쪽 rate limit이나 Postgres http
// 확장의 동시 연결 한도에 걸려 일부가 조용히 실패한다. 동시 실행 수를 제한해 안정적으로 처리한다.
async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const { start, end } = await req.json();
    if (!start || !end || !/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
      return new Response(JSON.stringify({ error: "start, end 날짜(YYYY-MM-DD)가 필요합니다." }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const key = Deno.env.get("DART_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "서버에 DART_API_KEY가 설정되어 있지 않습니다." }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const bgnDe = start.replace(/-/g, "");
    const endDe = end.replace(/-/g, "");
    // 발행결정 상세 API는 rcept_dt가 아니라 이사회결의일 등 내부 날짜로 필터링되는 것으로 보여, 정정 공시처럼
    // 원 결의일이 조회 기간보다 앞서면 좁은 창으로는 못 찾는다. 3년 전부터 넉넉히 조회해 rcept_no로 정확히 매칭한다.
    const detailBgnDe = String(Number(end.slice(0, 4)) - 3) + "0101";
    const MAX_PAGES = 4; // 유형별 최대 400건까지만 조회 (넓은 기간 선택 시 응답 지연 방지)
    const reportTypes = ["B", "C"]; // B: 주요사항보고, C: 발행공시(증권신고서)

    const rawItems: any[] = [];
    let truncated = false;

    for (const ty of reportTypes) {
      let pageNo = 1;
      while (pageNo <= MAX_PAGES) {
        const url = "https://opendart.fss.or.kr/api/list.json?crtfc_key=" + key +
          "&bgn_de=" + bgnDe + "&end_de=" + endDe + "&pblntf_ty=" + ty +
          "&page_no=" + pageNo + "&page_count=100";
        const data = await fetchDartList(admin, url);
        if (data.status !== "000") break; // "013" 등: 해당 유형 조회 결과 없음
        rawItems.push(...(data.list || []));
        const totalPage = Number(data.total_page) || 1;
        if (pageNo >= totalPage) break;
        if (pageNo >= MAX_PAGES) { truncated = true; break; }
        pageNo++;
      }
    }

    // "[기재정정]", "[첨부정정]", "[발행조건확정]" 등은 같은 사건에 대한 정정·후속 공시라서
    // 회사명+원제목(태그 제거)으로 묶어 접수일자·접수번호가 가장 최신인 건 하나만 남긴다.
    function baseReportName(name: string) {
      return name.replace(/^(\[[^\]]+\]\s*)+/, "").trim();
    }
    function isNewer(a: any, b: any) {
      if (a.rcept_dt !== b.rcept_dt) return a.rcept_dt > b.rcept_dt;
      return a.rcept_no > b.rcept_no;
    }

    // 금융업종(은행·증권·보험·카드·캐피탈·리츠·금융지주 등) 자금조달은 범위에서 제외한다.
    const FINANCIAL_KEYWORDS = [
      "금융지주", "금융그룹", "증권", "캐피탈", "리츠", "부동산투자회사",
      "카드", "보험", "저축은행", "종합금융", "종금", "은행", "자산운용",
    ];
    function isFinancialCompany(name: string) {
      return FINANCIAL_KEYWORDS.some((k) => name.includes(k));
    }

    const seen = new Set<string>();
    const groups = new Map<string, { item: any; cls: { category: string; detail: string }; count: number }>();
    for (const it of rawItems) {
      if (seen.has(it.rcept_no)) continue;
      seen.add(it.rcept_no);
      if (isFinancialCompany(it.corp_name || "")) continue;
      const cls = classify(it.report_nm || "");
      if (!cls) continue;
      const key = it.corp_name + "|" + baseReportName(it.report_nm || "");
      const g = groups.get(key);
      if (!g) {
        groups.set(key, { item: it, cls, count: 1 });
      } else {
        g.count += 1;
        if (isNewer(it, g.item)) { g.item = it; g.cls = cls; }
      }
    }

    // 전환사채/신주인수권부사채/교환사채/유상증자결정은 DART가 건별 구조화 데이터(총액·만기일·이자율 등)를
    // 제공하는 "발행결정" API가 있어, 목록조회로 감지된 건마다 그 상세 API를 병렬로 호출해 실제 금액·조건을
    // 채운다(추정하지 않고 DART 원문 필드값 그대로). 순수 회사채·IPO성 지분증권 증권신고서는 이런 건별
    // 발행결정 API가 없어(자본시장법상 의무공시 항목이 아니거나 다른 서식) 그대로 미확인으로 남는다.
    const detailTargets: { rcept_no: string; slug: string; corp_code: string }[] = [];
    for (const g of groups.values()) {
      const slug = BOND_DECISION_APIS[g.cls.category] || (g.cls.category === "유상증자 및 IPO" ? "piicDecsn" : null);
      if (slug && g.item.corp_code) {
        detailTargets.push({ rcept_no: g.item.rcept_no, slug, corp_code: g.item.corp_code });
      }
    }

    const detailByRcept = new Map<string, { slug: string; match: any }>();
    await mapWithConcurrency(detailTargets, 10, async (t) => {
      try {
        const url = "https://opendart.fss.or.kr/api/" + t.slug + ".json?crtfc_key=" + key +
          "&corp_code=" + t.corp_code + "&bgn_de=" + detailBgnDe + "&end_de=" + endDe;
        const data = await fetchDartList(admin, url);
        if (data.status !== "000") return;
        const match = (data.list || []).find((x: any) => x.rcept_no === t.rcept_no);
        if (match) detailByRcept.set(t.rcept_no, { slug: t.slug, match });
      } catch (e) {
        // 상세 조회 실패는 무시하고 미확인 상태로 둔다.
      }
    });

    const results = [];
    for (const g of groups.values()) {
      const it = g.item;
      const cls = g.cls;
      const revisionNote = g.count > 1 ? (" 관련 정정·후속 공시 " + g.count + "건 중 최신 1건만 표시.") : "";

      let amount: number | null = null;
      let amountBasis = "금액 미확인(DART 원문 확인 필요)";
      let purposeText = "미확인(원문 확인 필요)";
      let purposeConfirmed = false;
      let issueDate: string | null = null;
      let maturityDate: string | null = null;
      let couponRate: number | null = null;
      let yieldRate: number | null = null;
      let detailNote = "";

      const detail = detailByRcept.get(it.rcept_no);
      if (detail && detail.match) {
        const m = detail.match;
        const purposeFromFdpp = buildPurposeFromFdpp(m);
        if (detail.slug === "piicDecsn") {
          const eok = toEok(sumFdppWon(m));
          if (eok !== null) {
            amount = eok;
            amountBasis = "자금조달목적별 금액 합계 ÷ 1억 ≈ " + eok + "억원 (DART 유상증자결정 API, rcptNo " + it.rcept_no + ")";
            detailNote = " 금액은 DART 유상증자결정 API의 자금조달목적별 금액 합계로 계산.";
          }
        } else {
          const eok = toEok(m.bd_fta);
          if (eok !== null) {
            amount = eok;
            amountBasis = "사채의 권면(전자등록)총액 " + m.bd_fta + "원 ÷ 1억 = " + eok + "억원 (DART " + detail.slug + " API, rcptNo " + it.rcept_no + ")";
            detailNote = " 금액·발행일·만기일·이자율은 DART " + detail.slug + " API 원문 필드값.";
          }
          maturityDate = fmtDartDateOrNull(m.bd_mtd);
          issueDate = fmtDartDateOrNull(m.pymd) || fmtDartDateOrNull(m.sbd) || fmtDartDateOrNull(m.bddd);
          couponRate = toRate(m.bd_intr_ex);
          yieldRate = toRate(m.bd_intr_sf);
        }
        if (purposeFromFdpp) {
          purposeText = purposeFromFdpp;
          purposeConfirmed = true;
        }
      }

      results.push({
        id: "dart-" + it.rcept_no,
        company: it.corp_name,
        methodCategory: cls.category,
        methodDetail: cls.detail + " — " + it.report_nm,
        sector: "미확인",
        amount: amount,
        amountBasis: amountBasis,
        purpose: { text: purposeText, confirmed: purposeConfirmed },
        disclosureDate: fmtDartDate(it.rcept_dt),
        issueDate: issueDate,
        maturityDate: maturityDate,
        couponRate: couponRate,
        yieldRate: yieldRate,
        verification: {
          amountConfirmed: amount !== null,
          purposeConfirmed: purposeConfirmed,
          inProgress: false,
          note: "DART 목록 API로 실시간 감지된 공시입니다." + detailNote +
            (amount === null ? " 금액·목적은 원문 확인 전이라 미확인 상태입니다." : "") + revisionNote,
        },
        outOfRange: false,
        sourceUrls: [
          { label: "DART 원문 (" + it.report_nm + ")", url: "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=" + it.rcept_no },
        ],
      });
    }

    return new Response(JSON.stringify({ results, truncated }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
