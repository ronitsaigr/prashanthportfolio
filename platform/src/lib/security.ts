import type {Env} from './runtime';
const enc=new TextEncoder();
export async function sign(secret:string,body:string){const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,enc.encode(body)))).map(x=>x.toString(16).padStart(2,'0')).join('');}
function decode(s:string){return Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));}
export async function adminIdentity(request:Request,env:Env):Promise<string|null>{
 const token=request.headers.get('Cf-Access-Jwt-Assertion');const domain=env.ACCESS_TEAM_DOMAIN; if(!token||!domain||!env.ACCESS_AUD||!env.ADMIN_EMAIL||!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(domain))return null;
 try{const [h,p,s,...rest]=token.split('.');if(!h||!p||!s||rest.length)return null;
 const header=JSON.parse(new TextDecoder().decode(decode(h)));const payload=JSON.parse(new TextDecoder().decode(decode(p)));
 if(header.alg!=='RS256'||payload.iss!==domain||!Array.isArray(payload.aud)||!payload.aud.includes(env.ACCESS_AUD)||typeof payload.exp!=='number'||payload.exp<=Date.now()/1000|| (payload.nbf&&payload.nbf>Date.now()/1000)||payload.email?.toLowerCase()!==env.ADMIN_EMAIL.toLowerCase())return null;
 const response=await fetch(domain+'/cdn-cgi/access/certs');if(!response.ok)return null;
 const keys=(await response.json()) as {keys:(JsonWebKey&{kid?:string})[]};const jwk=keys.keys.find(k=>k.kid===header.kid);if(!jwk)return null;
 const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
 return await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decode(s),enc.encode(h+'.'+p))?payload.email:null;
 }catch{return null;}
}
export async function verifyTurnstile(env:Env,token:string,ip:string){if(!env.TURNSTILE_SECRET_KEY||!token)return false;const r=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:ip})});return r.ok&&((await r.json()) as {success:boolean}).success===true;}
