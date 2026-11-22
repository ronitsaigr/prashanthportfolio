import type {APIRoute} from 'astro';import {envOf} from '../../lib/runtime';import {verifyTurnstile} from '../../lib/security';import {questions,scoreAnswers} from '../../lib/score';import {deliver} from '../../lib/outbox';
export const prerender=false;
const reply=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
export const POST:APIRoute=async({request,locals})=>{
 const env=envOf(locals);if(!env.DB||!env.TURNSTILE_SECRET_KEY)return reply({error:'Enquiries are not configured yet.'},503);
 if(request.headers.get('origin')!==new URL(request.url).origin)return reply({error:'Invalid origin'},403);
 if(Number(request.headers.get('content-length')||0)>20000)return reply({error:'Too large'},413);
 try{const form=await request.formData();const val=(k:string)=>String(form.get(k)||'').trim().slice(0,1000);
 const name=val('name'),email=val('email').toLowerCase(),phone=val('phone'),company=val('company'),kind=val('kind'),segment=val('segment');
 if(val('website')||val('consent')!=='yes'||name.length<2||!/^\S+@\S+\.\S+$/.test(email)||!/^\+?[\d\s-]{7,20}$/.test(phone)||!company||!['contact','college','company','leak_check'].includes(kind))return reply({error:'Please complete all required fields.'},400);
 const ip=request.headers.get('CF-Connecting-IP')||'unknown';const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip));const key=Array.from(new Uint8Array(hash)).map(x=>x.toString(16).padStart(2,'0')).join('');
 const window=Math.floor(Date.now()/3600000);const rate=await env.DB.prepare('INSERT INTO rate_limits(key,window,count) VALUES(?,?,1) ON CONFLICT(key,window) DO UPDATE SET count=count+1 RETURNING count').bind(key,window).first<{count:number}>();if((rate?.count||0)>12)return reply({error:'Try again later'},429);
 if(!await verifyTurnstile(env,val('cf-turnstile-response'),ip))return reply({error:'Verification failed'},400);
 const answers=Object.fromEntries(questions.map(q=>[q[0],Number(val(q[0])||-1)]));const scored=kind==='leak_check'?scoreAnswers(answers,Number(val('monthlyLeads'))):null;
 const now=new Date().toISOString(),cid=crypto.randomUUID(),did=crypto.randomUUID(),eid=crypto.randomUUID();
 const utm=JSON.stringify(Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map(k=>[k,val(k)])));
 const payload={name,email,phone,company,kind,segment,message:val('message'),audience:val('audience'),dates:val('dates'),budget:val('budget'),score:scored};
 const event=kind==='leak_check'?'leak_check.submitted':'enquiry.created';
 const stmts=[env.DB.prepare('INSERT INTO contacts(id,email,name,phone,company,segment,source,utm,ref_code,landing_page,referrer,consent_at,policy_version,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET name=excluded.name,phone=excluded.phone,company=excluded.company,updated_at=excluded.updated_at,consent_at=excluded.consent_at,policy_version=excluded.policy_version').bind(cid,email,name,phone,company,segment,kind,utm,val('ref'),val('landing'),val('referrer'),now,'draft-preview-v1',now,now),
 env.DB.prepare('INSERT INTO deals(id,contact_id,type,created_at,updated_at) VALUES(?,(SELECT id FROM contacts WHERE email=?),?,?,?)').bind(did,email,kind==='college'?'training_college':kind==='company'?'training_company':'service',now,now),
 env.DB.prepare('INSERT INTO enquiries(id,contact_id,kind,payload,created_at) VALUES(?,(SELECT id FROM contacts WHERE email=?),?,?,?)').bind(eid,email,kind,JSON.stringify(payload),now),
 env.DB.prepare('INSERT INTO webhook_outbox(id,event,payload,next_attempt_at) VALUES(?,?,?,?)').bind(eid,event,JSON.stringify({event,id:eid,occurred_at:now,payload}),now)];
 if(scored)stmts.push(env.DB.prepare('INSERT INTO leak_checks(id,contact_id,answers,score,band,leads_at_risk,created_at) VALUES(?,(SELECT id FROM contacts WHERE email=?),?,?,?,?,?)').bind(eid,email,JSON.stringify(answers),scored.score,scored.band,scored.risk,now));
 await env.DB.batch(stmts);await deliver(env,eid).catch(()=>false);
 return reply({ok:true,result:scored});
 }catch{return reply({error:'Unable to process submission. Check answers or try again.'},400);}
};
