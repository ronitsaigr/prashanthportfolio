# Webhooks

Phase 1 will define and test the signed event envelope (event, id, occurred_at, payload). Use HMAC-SHA256 over the exact request bytes; X-Signature and X-Event-Id headers; idempotent outbox delivery with retries. Do not send unnecessary personal data. Payment and booking webhook verification will be added in their relevant phases. No live endpoint is implemented yet.
