import type {Env} from './runtime';import {cashfreeSandbox,commissionPaise} from './cashfree';
type Payment={cf_payment_id:string|number;payment_status:string;payment_amount:number;payment_currency:string;order_id:string;is_captured?:boolean};
export async function reconcileWorkshop(env:Env,orderId:string){
 if(!/^workshop_[a-f0-9-]{36}$/.test(orderId))return 'unknown';
 const row=await env.DB.prepare('SELECT r.id,r.status,r.amount_paise,r.partner_id,p.commission_bps,e.ends_at FROM registrations r JOIN events e ON e.id=r.event_id LEFT JOIN partners p ON p.id=r.partner_id WHERE r.cashfree_order_id=?').bind(orderId).first<{id:string;status:string;amount_paise:number;partner_id:string|null;commission_bps:number|null;ends_at:string}>();
 if(!row)return 'unknown';if(row.status==='paid'||row.status==='refunded')return row.status;if(row.status!=='pending')return row.status;
 const order=await cashfreeSandbox(env,'/orders/'+orderId) as {order_status:string;order_amount:number;order_currency:string;order_id:string};
 if(order.order_status!=='PAID'||order.order_id!==orderId||order.order_currency!=='INR'||Math.round(order.order_amount*100)!==row.amount_paise)return 'pending';
 const payments=await cashfreeSandbox(env,'/orders/'+orderId+'/payments') as Payment[];
 if(!Array.isArray(payments))return 'pending';const paid=payments.find(p=>p.payment_status==='SUCCESS'&&p.is_captured!==false&&p.order_id===orderId&&p.payment_currency==='INR'&&Math.round(p.payment_amount*100)===row.amount_paise);
 if(!paid)return 'pending';const paymentId=String(paid.cf_payment_id),now=new Date().toISOString(),eid='cashfree-paid-'+paymentId;
 const stmts=[env.DB.prepare("UPDATE registrations SET status='paid',cashfree_payment_id=?,updated_at=? WHERE id=? AND status='pending'").bind(paymentId,now,row.id),
 env.DB.prepare("INSERT OR IGNORE INTO payment_events(id,event_type,created_at) SELECT ?,'payment.paid',? FROM registrations WHERE id=? AND status='paid' AND cashfree_payment_id=?").bind(eid,now,row.id,paymentId),
 env.DB.prepare("INSERT OR IGNORE INTO webhook_outbox(id,event,payload,next_attempt_at) SELECT ?,'registration.paid',?,? FROM registrations WHERE id=? AND status='paid' AND cashfree_payment_id=?").bind(eid,JSON.stringify({event:'registration.paid',id:eid,occurred_at:now,payload:{registration_id:row.id,amount_paise:row.amount_paise}}),now,row.id,paymentId)];
 if(row.partner_id&&row.commission_bps!==null){const amount=commissionPaise(row.amount_paise,0,row.commission_bps);const payable=new Date(new Date(row.ends_at).getTime()+15*86400000).toISOString();stmts.push(env.DB.prepare("INSERT OR IGNORE INTO commissions(id,partner_id,registration_id,amount_paise,payable_at) SELECT ?,?,?,?,? FROM registrations WHERE id=? AND status='paid' AND cashfree_payment_id=?").bind(eid,row.partner_id,row.id,amount,payable,row.id,paymentId));}
 await env.DB.batch(stmts);return 'paid';
}
