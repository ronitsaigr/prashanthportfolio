import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({workerEntryPoint:{path:'src/worker.mjs',namedExports:[]}}),
  vite: { plugins: [tailwindcss()] },
});
