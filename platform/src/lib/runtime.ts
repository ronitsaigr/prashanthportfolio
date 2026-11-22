export interface Statement {bind(...values: (string|number|null)[]):Statement; first<T=Record<string,unknown>>():Promise<T|null>; all<T=Record<string,unknown>>():Promise<{results:T[]}>; run():Promise<unknown>}
export interface Database {prepare(sql:string):Statement;batch(statements:Statement[]):Promise<unknown>}
export interface Env {DB:Database;TURNSTILE_SECRET_KEY?:string;TURNSTILE_SITE_KEY?:string;N8N_WEBHOOK_URL?:string;N8N_SIGNING_SECRET?:string;ACCESS_TEAM_DOMAIN?:string;ACCESS_AUD?:string;ADMIN_EMAIL?:string;BOOKING_URL?:string;EMAIL_API_KEY?:string;EMAIL_FROM?:string;NOTIFY_EMAIL?:string;ENABLE_PUBLIC_FORMS?:string;CASHFREE_CLIENT_ID?:string;CASHFREE_CLIENT_SECRET?:string;CASHFREE_API_VERSION?:string}
export function envOf(locals:unknown):Env {return (locals as {runtime:{env:Env}}).runtime.env;}
export const stages=['new','call_booked','call_done','proposal_sent','won','lost','delivered','retainer'] as const;
export function csvCell(value:unknown){let s=String(value??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
