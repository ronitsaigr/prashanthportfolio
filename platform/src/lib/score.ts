export const questions = [
['response','How quickly do new leads receive a response?', 'Over 24 hours','Within a day','Within an hour','Within 5 minutes'],
['followup','How consistent are follow-ups?','No process','Manual and irregular','Defined process','Automated and monitored'],
['crm','How is your CRM used?','No CRM','Partial use','Mostly updated','Reliable and enforced'],
['whatsapp','How are WhatsApp enquiries managed?','Untracked','Manual','Centralized','Automated with consent'],
['payment','How are payments reconciled?','Untracked','Manual','Regular checks','Automatic verified reconciliation'],
['reports','How much do you trust reports?','Not at all','Limited','Mostly','Verified against source data'],
['ownership','How clear is lead ownership?','Unclear','Sometimes assigned','Defined','Automatically assigned and audited'],
['dropoff','Can you identify funnel drop-offs?','No','Occasionally','By stage','By stage and source'],
['tools','How well are systems connected?','Disconnected','Manual transfers','Some integrations','Integrated and monitored'],
['quality','Do you audit lead handling?','Never','Ad hoc','Regularly','Measured and actioned']
] as const;
export function scoreAnswers(answers: Record<string,number>, monthlyLeads:number) {
 if (!Number.isInteger(monthlyLeads)||monthlyLeads<0||monthlyLeads>1000000) throw new Error('Invalid lead volume');
 const values=questions.map(q=>answers[q[0]]);
 if(values.some(v=>!Number.isInteger(v)||v<0||v>3)) throw new Error('Complete all questions');
 const score=Math.round(values.reduce((a,b)=>a+b,0)/30*100);
 const band=score<40?'Leaking':score<75?'Patchy':'Tight';
 const risk=Math.round(monthlyLeads*(1-score/100)*0.3);
 const recommendations=questions.map((q,i)=>({topic:q[1],target:q[5],value:values[i]})).sort((a,b)=>a.value-b.value).slice(0,3);
 return {score,band,risk,recommendations};
}
