import type {Env} from './runtime';import {deliver} from './outbox';
export async function scheduledJobs(env:Env,cron:string,time:Date){
 if(!env.DB)return;
 const now=time.toISOString();
 if(cron==='30 2 * * MON'&&env.NOTIFY_EMAIL){
 const since=new Date(time.getTime()-7*86400000).toISOString();
 const counts=await env.DB.prepare('SELECT stage,COUNT(*) AS count,SUM(value_paise) AS value_paise FROM deals GROUP BY stage').all();
 const leads=await env.DB.prepare('SELECT COUNT(*) AS count FROM enquiries WHERE created_at>=?').bind(since).first<{count:number}>();
 const due=await env.DB.prepare("SELECT COUNT(*) AS count FROM deals WHERE next_step_date<=? AND stage NOT IN ('won','lost','delivered')").bind(now.slice(0,10)).first<{count:number}>();
 const id='weekly-'+now.slice(0,10);const mail={to:env.NOTIFY_EMAIL,subject:'Weekly business digest',text:'New enquiries in last 7 days: '+(leads?.count??0)+'\nDeals due: '+(due?.count??0)+'\nPipeline (paise, not collected cash): '+JSON.stringify(counts.results)};
 await env.DB.prepare('INSERT OR IGNORE INTO webhook_outbox(id,event,payload,next_attempt_at) VALUES(?,?,?,?)').bind(id,'email.send',JSON.stringify(mail),now).run();
 }
 const enabled:string[]=[];if(env.N8N_WEBHOOK_URL&&env.N8N_SIGNING_SECRET)enabled.push('n8n');if(env.EMAIL_API_KEY&&env.EMAIL_FROM)enabled.push('email');
 for(const type of enabled){const rows=(await env.DB.prepare('SELECT id FROM webhook_outbox WHERE delivered_at IS NULL AND next_attempt_at<=? AND '+(type==='email'?"event='email.send'":"event<>'email.send'")+' ORDER BY next_attempt_at LIMIT 5').bind(now).all<{id:string}>()).results;for(const row of rows)await deliver(env,row.id);}
 await env.DB.prepare('DELETE FROM rate_limits WHERE window<?').bind(Math.floor(time.getTime()/3600000)-48).run();
}
