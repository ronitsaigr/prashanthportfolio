# Business platform — Phase 0

The existing root React/Vite portfolio deploys to GitHub Pages. This sibling application is isolated until a reviewed cutover. Do not point the domain here yet.

## Local setup
Node 22+, from repository root:

```sh
cd platform
npm install
npm run check
npm run lint
npm test
npm run build
npm run dev
````

Test / and /api/health. The latter returns only a status, not credentials or internal details.

## Preview deployment
Connect the existing GitHub repo in Cloudflare Workers & Pages, set root directory to platform, use Node 22, build command npm run build and deploy command npx wrangler deploy. Target an isolated preview Worker. Do not attach the custom domain. Commit a reviewed package lock after the first successful install; subsequent CI should use npm ci.

## D1
Create prashanth-platform-preview and prashanth-platform-production separately with Wrangler or the Cloudflare dashboard. Add DB bindings with the actual database IDs only after confirming the account. Do not create production records during preview testing.

## Rollback
No root portfolio or DNS changes in this phase. Before any future domain cutover, export DNS and verify email records, active subdomains, current hosting, and rollback instructions. Restore the previous website route and deployment if validation fails.

## Status
Scaffold only. No actual D1 binding, remote deployment, live lead capture, or production release is claimed. The full internal business spec is intentionally not committed to this public repository.
