import type {APIRoute} from 'astro';
import {envOf} from '../../../lib/runtime';
import {verifyTurnstile} from '../../../lib/security';
import {cashfreeSandbox} from '../../../lib/cashfree';
export const prerender=false;
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
export const POST:APIRoute=async({request,locals})=>{
 const env=envOf(locals);
 if(env.ENABLE_SANDBOX_CHECKOUT!=='true'||!env.CASHFREE_CLIENT_ID||!env.CASHFREE_CLIENT_SECRET||!env.CASHFREE_API_VERSION)return json({error:'Sandbox checkout is disabled'},503);
 const origin=new URL(request.url).origin;if(request.headers.get('origin')!==origin)return json({error:'Invalid origin'},403);
 if(Number(request.headers.get('content-length')||0)>12000)return json({error:'Too large'},413);
 try{
 const f=await request.formData(),v=(k:string)=>String(f.get(k)||'').trim();
 const name=v('name').slice(0,100),email=v('email').toLowerCase(),phone=v('phone'),company=v('company').slice(0,150),slug=v('slug'),ref=v('ref').toUpperCase();
 if(name.length<2||email.length>180||!/^\S+@\S+\.\S+$/.test(email)||!(/^[6-9]\d{9}$/.test(phone))||!company||v('consent')!=='yes')return json({error:'Complete the test customer details'},400);
 if(!await verifyTurnstile(env,v('cf-turnstile-response'),request.headers.get('CF-Connecting-IP')||''))return json({error:'Verification failed'},400);
 const now=new Date().toISOString();
 const event=await env.DB.prepare("SELECT id,price_paise FROM events WHERE slug=? AND status='published' AND starts_at>?").bind(slug,now).first<{id:string;price_paise:number}>();if(!event)return json({error:'Workshop unavailable'},404);
 const partner=ref?await env.DB.prepare("SELECT id FROM partners WHERE code=? AND status='active'").bind(ref).first<{id:string}>():null;
 const cid=crypto.randomUUID(),id=crypto.randomUUID(),orderId='workshop_'+id;
 // Insert the contact and reserve a seat in one D1 batch. The capacity predicate includes pending orders until reconciliation.
 await env.DB.batch([
 env.DB.prepare("INSERT INTO contacts(id,email,name,phone,company,segment,source,consent_at,policy_version,created_at,updated_at) VALUES(?,?,?,?,?,'other','workshop_sandbox',?,'sandbox-v1',?,?) ON CONFLICT(email) DO NOTHING").bind(cid,email,name,'+91'+phone,company,now,now,now),
 env.DB.prepare("INSERT OR IGNORE INTO registrations(id,event_id,contact_id,amount_paise,partner_id,status,cashfree_order_id,created_at,updated_at) SELECT ?,e.id,c.id,e.price_paise,?,'pending',?,?,? FROM events e,contacts c WHERE e.id=? AND c.email=? AND e.status='published' AND e.starts_at>? AND (SELECT count(*) FROM registrations r WHERE r.event_id=e.id AND r.status IN ('pending','paid'))<e.seats").bind(id,partner?.id??null,orderId,now,now,event.id,email,now)
 ]);
 const reservation=await env.DB.prepare('SELECT amount_paise,contact_id FROM registrations WHERE id=?').bind(id).first<{amount_paise:number;contact_id:string}>();
 if(!reservation)return json({error:'No available seat or duplicate registration. Contact support.'},409);
 // Use the reserved server-side amount and an opaque unique order ID, never browser-supplied prices.
 const order=await cashfreeSandbox(env,'/orders',{order_id:orderId,order_amount:reservation.amount_paise/100,order_currency:'INR',customer_details:{customer_id:reservation.contact_id,customer_name:name,customer_email:email,customer_phone:phone},order_meta:{return_url:origin+'/workshop-confirmation?order_id={order_id}',notify_url:origin+'/api/workshops/webhook'}}) as {payment_session_id?:string};
 if(!order.payment_session_id)return json({error:'Order not ready; contact support'},502);
 return json({payment_session_id:order.payment_session_id});
 }catch{return json({error:'Order creation did not complete; contact support before retrying.'},502);}
};
