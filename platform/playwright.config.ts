import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./e2e',use:{baseURL:'http://127.0.0.1:8787'},webServer:{command:'npx wrangler dev --ip 127.0.0.1 --port 8787 --local',url:'http://127.0.0.1:8787/api/health',reuseExistingServer:false,timeout:120000}});
