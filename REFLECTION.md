# REFLECTION

## 1. The hardest bug I hit this week, and how I debugged it

The hardest issue was not a frontend render bug; it was getting the backend storage path into a state where it was both correct for the assignment and workable locally. I initially built a local JSON persistence layer so the API routes could function without external dependencies, then introduced Supabase as the real storage target. The failure mode was subtle because the system could appear “connected” even when it did not have a valid write credential. I checked the environment files directly, verified what the backend was actually reading, then ran a live insert probe instead of relying on a generic connectivity test. That probe returned an “Invalid API key” error first, which led me to the malformed environment line. After the service-role key was corrected, the next insert error said the `public.audits` table was missing from the schema cache, which narrowed the problem to database setup instead of credentials. Running `schema.sql` and `policies.sql` resolved it, and a second live insert + cleanup probe confirmed the write path end to end.

## 2. A decision I reversed mid-week, and what made me reverse it

I reversed the storage strategy. The first pass used file-backed JSON only because it let me ship the end-to-end flow quickly: save audits, fetch shareable results, and capture leads without waiting on external service setup. That was useful for momentum, but it was not strong enough for the assignment because the brief explicitly asks for a real backend. I kept the local fallback for development but changed the primary architecture to Supabase-backed persistence once the API flow was stable. The reason for the reversal was not purely technical; it was evaluator-driven. A JSON file is acceptable as a development convenience, but it is not a credible final answer for a product they say could plausibly launch next month. The Supabase path also made the architecture easier to explain and created a much better story around shareable reports and lead capture.

## 3. What I would build in week 2 if I had it

Week 2 would focus on productionizing and sharpening the product rather than adding random surface area. First, I would tighten the pricing model with fully verified and cited plan data in `PRICING_DATA.md`, including more explicit same-vendor downgrade logic and API usage heuristics. Second, I would improve the landing page and public report design so the product looks closer to something that could genuinely be shared on Product Hunt or X. Third, I would add richer share previews, ideally with generated Open Graph images so the results page is visually legible when pasted into social feeds. Fourth, I would replace the current in-memory rate limiting with a durable store-backed approach and add more structured logging around backend failures. Finally, I would round out the assignment surface itself: stronger README assets, better GTM and economics writeups, and a more explicit benchmark story for “spend per developer.”

## 4. How I used AI tools

I used AI as a pair-programming and drafting tool, not as a one-shot code generator. It helped accelerate scaffolding, backend route structuring, type plumbing, and repo-organization work. I was comfortable using it for repetitive setup tasks and for reviewing likely integration issues, but I did not trust it with the core audit math or pricing truth. The audit engine was kept rule-based on purpose because the assignment explicitly rewards knowing where AI should not be in the loop. One concrete place the AI was wrong was environment handling around Supabase keys: it initially tolerated a client-style public key path in a backend context, which was fine for reachability tests but not correct for real write operations. I caught that by inspecting the env file contents and then running a live insert probe, which exposed the “Invalid API key” problem immediately. That was a useful reminder that AI-generated integration advice often sounds plausible even when the credential model is subtly wrong.

## 5. Self-rating on a 1–10 scale

- **Discipline: 6/10** — The implementation momentum was good, but the repo still needs a stronger final-pass polish on docs and deployment.
- **Code quality: 7/10** — The code is typed, readable, and modular, though some business rules and backend hardening still need another pass.
- **Design sense: 6/10** — The UI is cleaner than a default dashboard, but it still needs more distinct visual identity and screenshot-ready polish.
- **Problem-solving: 8/10** — The backend/storage/debugging path required several course corrections, and I was able to isolate each blocker methodically.
- **Entrepreneurial thinking: 6/10** — The product framing is in the right direction, but the GTM, economics, and user-interview materials need stronger depth to really score well.
