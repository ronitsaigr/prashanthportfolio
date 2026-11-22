import {sign} from './security';import type {Env} from './runtime';
export async function deliver(env:Env,id:string){
 if(!env.N8N_WEBHOOK_URL||!env.N8N_SIGNING_SECRET)return false;
 const row=await env.DB.prepare('SELECT event,payload,attempts FROM webhook_outbox WHERE id=? AND delivered_at IS NULL').bind(id).first<{event:string;payload:string;attempts:number}>();if(!row)return true;
 const now=new Date().toISOString();try{
 const response=await fetch(env.N8N_WEBHOOK_URL,{method:'POST',headers:{'content-type':'application/json','X-Signature':await sign(env.N8N_SIGNING_SECRET,row.payload),'X-Event-Id':id},body:row.payload,signal:AbortSignal.timeout(8000)});
 if(!response.ok)throw Error('Remote HTTP '+response.status);
 await env.DB.prepare('UPDATE webhook_outbox SET delivered_at=?,attempts=attempts+1 WHERE id=?').bind(now,id).run();return true;
 }catch{await env.DB.prepare('UPDATE webhook_outbox SET attempts=attempts+1,next_attempt_at=?,last_error=? WHERE id=?').bind(new Date(Date.now()+Math.min(3600000,60000*2**Math.min(row.attempts,6))).toISOString(),'Delivery failed',id).run();return false;}
}
