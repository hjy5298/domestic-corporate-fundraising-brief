-- DART(opendart.fss.or.kr)는 TLS 1.2 + RSA 키교환(PFS 미지원) 구형 암호군만 지원해서
-- Edge Function(Deno/rustls)의 기본 fetch가 handshake 단계에서 거부당한다.
-- libcurl 기반 http 확장은 해당 구형 암호군을 그대로 지원하므로, 이 함수를 릴레이로 사용한다.
create extension if not exists http;

create or replace function public.http_get_text(p_url text)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  resp http_response;
begin
  select * into resp from http_get(p_url);
  return resp.content;
end;
$$;

-- anon/authenticated가 임의 URL을 릴레이시킬 수 없도록(SSRF 방지) service_role에만 실행 권한을 준다.
revoke all on function public.http_get_text(text) from public, anon, authenticated;
grant execute on function public.http_get_text(text) to service_role;
