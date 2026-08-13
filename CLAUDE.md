# 작업 규칙

- 표는 마크다운 표 형식으로 작성한다.
- 금액은 억원 단위로 표기한다 (예: 1,234억원).
- 결론을 먼저 제시하고, 이후에 근거와 상세 설명을 작성한다.
- 수치를 제시할 때는 계산 근거(수식, 출처, 가정)를 함께 표시한다.
- 한 번에 한 태스크만 진행한다.
- 변경 후에는 반드시 브라우저에서 직접 확인한다.

# 기술 규칙

- 순수 HTML/CSS/JS로 구현한다 (프레임워크·빌드도구 사용 안 함).
- 파일은 index.html, style.css, app.js 3개로 유지한다 (파일 추가/분할 금지).
- 데이터는 기본적으로 localStorage에 저장한다(선택 항목, 조회 기간·방식 필터 등).
- 예외: 조회 기간 선택("적용") 시 DART 공시를 실시간으로 조회하기 위해 Supabase Edge Function(`dart-disclosures`)을 둔다. index.html에서 supabase-js를 CDN `<script>` 태그로 불러와 이 Edge Function만 호출하고, 별도 빌드 도구·자체 백엔드 서버는 두지 않는다. DART_API_KEY는 Edge Function Secret으로만 보관하고 클라이언트에 노출하지 않는다. DART(opendart.fss.or.kr)는 TLS 1.2 RSA 키교환(PFS 미지원)만 지원해 Deno 기본 fetch(rustls)가 거부되므로, Postgres `http` 확장(`public.http_get_text`, service_role 전용)을 통해 우회 호출한다. 실시간 조회 결과는 금액·목적이 항상 미확인 상태이며 localStorage/DB에 저장하지 않는다(새로고침 시 초기화).
- 예외: GitHub 저장소 ↔ Supabase 프로젝트 연동(마이그레이션 자동 배포)을 위해 저장소 루트에 `supabase/`(config.toml, migrations/, functions/)를 인프라 관리용으로 둔다. 앱 소스 파일(index.html, style.css, app.js)은 여전히 3개로 유지한다.

# 참조

- 제품 요구사항: @PRD.md
