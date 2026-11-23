# Engineering rules

- One phase and one review PR at a time; never merge without owner approval.
- Keep the current portfolio running until preview acceptance and DNS cutover review.
- Strict TypeScript, small modules, clear business rules, tests for critical logic.
- Never commit secrets, customer records, private business plans or former-employer data. Use local ignored .dev.vars and Cloudflare secret bindings.
- Do not invent proof, testimonials or case-study results. Mark unknowns as TODO and keep legal drafts unpublished until reviewed.
- Every PR states changes, testing, manual steps, risks and acceptance criteria.
- Review paid infrastructure before enabling it.
