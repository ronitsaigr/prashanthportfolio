# Decisions

- Reuse existing repository as explicitly requested; use isolated platform/ directory for new Astro app to preserve current GitHub Pages deploy.
- Repository is public: only publish technical-safe documentation and source code. Keep internal strategy and private settings out of GitHub.
- Astro 5 / Cloudflare adapter 12 compatible release lines initially; upgrade to newer stable release after checking adapter compatibility and CI. Node 22.
- Separate preview and production D1 databases, no credentials in repo.
- Cloudflare account/domain inventory not complete. No DNS changes permitted.
- Full source specification remains the owner-supplied PDF; technical milestones in PLATFORM_SPEC.md are a nonconfidential summary.
