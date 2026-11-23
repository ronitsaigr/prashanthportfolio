import { App } from 'astro/app';
import { handle } from '@astrojs/cloudflare/handler';
import { scheduledJobs } from './lib/jobs';
export function createExports(manifest){
 const app=new App(manifest);
 return {default:{fetch(request,env,ctx){return handle(manifest,app,request,env,ctx);},async scheduled(controller,env){await scheduledJobs(env,controller.cron,new Date(controller.scheduledTime));}}};
}
