# Release gates (preview first)
- Cloudflare GitHub installation must explicitly authorize ronitsaigr/prashanthportfolio; build branch platform-phase-0, root platform, Worker prashanth-platform-preview.
- Keep public forms disabled until legal review and Turnstile secret configured securely; verify sandbox with synthetic data. Never commit secrets.
- Enable Cloudflare Zero Trust; protect /admin and /api/admin and configure ACCESS_TEAM_DOMAIN, ACCESS_AUD, ADMIN_EMAIL. App already fails closed.
- Configure N8N_WEBHOOK_URL, N8N_SIGNING_SECRET, EMAIL_API_KEY, EMAIL_FROM, NOTIFY_EMAIL and BOOKING_URL in Worker runtime. Resend sender must be verified. Cron retries every minute and digest Monday 08:00 IST.
- Cashfree replaces Razorpay. Sandbox only adapter and schema; checkout, fulfillment, webhook reconciliation, coupons, partner portal, refund and certificate issuance still require full implementation and tests. No real payments enabled.
- Verify all forms, duplicate contacts, CRM operations, emails, weekly digest, retries, mobile Lighthouse and authorization. No DNS changes until current zone and email records inventoried, preview accepted and rollback verified.
