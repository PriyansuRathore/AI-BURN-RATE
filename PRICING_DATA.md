# PRICING_DATA

Verified: `2026-05-24`

This file records the official pricing sources I used while shaping the audit logic. When a vendor does not publish a public self-serve price for a plan, I mark it as `Custom / contact sales` instead of inventing a number.

Important current-state note:
- This file is now source-backed.
- The app code still contains a few benchmark placeholders that should be fully synchronized to these sources before final submission, especially for API-direct and enterprise/custom scenarios.

## Cursor

Source: https://cursor.com/en-US/pricing

- Hobby: `$0` — verified `2026-05-24`
- Pro / Individual: `$20 / month` — verified `2026-05-24`
- Teams: `$40 / user / month` — verified `2026-05-24`
- Enterprise: `Custom / contact sales` — verified `2026-05-24`

Notes:
- The current Cursor pricing page uses `Individual`, `Teams`, and `Enterprise`.
- The assignment brief says `Hobby / Pro / Business / Enterprise`; for the audit engine, `Business` should be treated as the current `Teams` equivalent unless the evaluator wants the historical label preserved.

## GitHub Copilot

Sources:
- https://github.com/features/copilot/plans
- https://docs.github.com/en/copilot/get-started/plans
- https://docs.github.com/en/copilot/concepts/copilot-billing/about-billing-for-github-copilot-in-your-organization

- Free: `$0` — verified `2026-05-24`
- Pro / Individual: `$10 / user / month` — verified `2026-05-24`
- Pro+: `$39 / user / month` — verified `2026-05-24`
- Business: `$19 / granted seat / month` — verified `2026-05-24`
- Enterprise: `$39 / granted seat / month` — verified `2026-05-24`
- Additional premium requests: `$0.04 / request` for paid org plans — verified `2026-05-24`

Notes:
- The assignment asks for `Individual / Business / Enterprise`. The official current individual self-serve plan is `Pro`, priced at `$10/month`.

## Claude

Sources:
- Individual plans: https://support.claude.com/en/articles/11049762-choose-a-claude-plan
- Team plan: https://support.claude.com/en/articles/9266767-what-is-the-claude-team-plan
- API pricing: https://platform.claude.com/docs/en/about-claude/pricing

- Free: `$0` — verified `2026-05-24`
- Pro: `$20 / month` or `$200 / year` — verified `2026-05-24`
- Max 5x: `$100 / month` — verified `2026-05-24`
- Max 20x: `$200 / month` — verified `2026-05-24`
- Team Standard seat: `$25 / member / month` billed monthly, or `$20 / member / month` billed annually — verified `2026-05-24`
- Team Premium seat: `$125 / member / month` billed monthly, or `$100 / member / month` billed annually — verified `2026-05-24`
- Enterprise: `Custom / contact sales` — verified `2026-05-24`

Claude API direct reference prices:
- Claude Sonnet 4.6: `$3 / MTok input`, `$15 / MTok output` — verified `2026-05-24`
- Claude Haiku 4.5: `$1 / MTok input`, `$5 / MTok output` — verified `2026-05-24`
- Claude Opus 4.7: `$5 / MTok input`, `$25 / MTok output` — verified `2026-05-24`

Notes:
- `MTok` means one million tokens.
- The code currently models a flat monthly benchmark for `API direct`; that should be replaced with an explicit workload-based calculation if this becomes the final submission version.

## ChatGPT

Sources:
- Main pricing page: https://chatgpt.com/pricing/
- Business help article: https://help.openai.com/en/articles/8792828
- Business rename FAQ: https://help.openai.com/en/articles/12111915

- Free: `$0` — verified `2026-05-24`
- Plus: `$20 / month` — verified `2026-05-24`
- Pro: `From $200 / month` — verified `2026-05-24`
- Business: `$25 / user / month` billed monthly, or `$20 / user / month` billed annually, minimum 2 seats — verified `2026-05-24`
- Enterprise: `Custom / contact sales` — verified `2026-05-24`

Notes:
- The assignment brief says `ChatGPT Team / Enterprise / API direct`.
- OpenAI renamed `ChatGPT Team` to `ChatGPT Business`; pricing and functionality are described by OpenAI as unchanged in the rename FAQ.
- For this project, `Team` should be treated as the current `Business` equivalent.

## OpenAI API Direct

Source: https://openai.com/api/pricing/

Reference API prices used for benchmarking:
- GPT-5.5: `$5.00 / 1M input tokens`, `$30.00 / 1M output tokens` — verified `2026-05-24`
- GPT-5.4: `$2.50 / 1M input tokens`, `$15.00 / 1M output tokens` — verified `2026-05-24`
- GPT-5.4 mini: `$0.75 / 1M input tokens`, `$4.50 / 1M output tokens` — verified `2026-05-24`

Notes:
- OpenAI states that API usage is billed separately from ChatGPT subscriptions.
- If the final audit engine keeps a single `OpenAI API direct` benchmark plan, it should document the exact model and assumed monthly token volume behind that benchmark.

## Anthropic API Direct

Source: https://platform.claude.com/docs/en/about-claude/pricing

Reference API prices used for benchmarking:
- Claude Sonnet 4.6: `$3 / MTok input`, `$15 / MTok output` — verified `2026-05-24`
- Claude Haiku 4.5: `$1 / MTok input`, `$5 / MTok output` — verified `2026-05-24`
- Claude Opus 4.7: `$5 / MTok input`, `$25 / MTok output` — verified `2026-05-24`

Notes:
- Anthropic also publishes prompt-caching, batch, and tool-use pricing on the same official page.
- As with OpenAI API direct, the current app should make the benchmark workload explicit before final submission.

## Gemini

Sources:
- Google AI consumer plans: https://one.google.com/intl/fa/about/google-ai-plans/
- Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing
- Gemini API billing: https://ai.google.dev/gemini-api/docs/billing/

Consumer plans:
- Google AI Pro: public plan exists; pricing is region-dependent on Google One and was not cleanly exposed in the crawled HTML for this session — re-check directly in the live pricing UI before final submission
- Google AI Ultra: public plan exists; pricing is region-dependent on Google One and was not cleanly exposed in the crawled HTML for this session — re-check directly in the live pricing UI before final submission

Gemini API reference prices:
- Gemini 2.5 Flash: `$0.30 / 1M input tokens` and `$2.50 / 1M output tokens` on the paid tier — verified `2026-05-24`
- Gemini 2.5 Flash-Lite: `$0.10 / 1M input tokens` and `$0.40 / 1M output tokens` on the paid tier — verified `2026-05-24`
- Gemini 3 Flash Preview: `$0.50 / 1M input tokens` and `$3.00 / 1M output tokens` on the paid tier — verified `2026-05-24`

Notes:
- The assignment only requires `Gemini (Pro / Ultra / API)`.
- The consumer-plan names are clear, but the exact public price numbers were not exposed reliably in this crawl, so they should be manually verified in the live Google One UI before final submission.

## Windsurf

Sources:
- Plans and usage docs: https://docs.windsurf.com/windsurf/accounts/usage
- Quota docs: https://docs.windsurf.com/windsurf/accounts/quota

What is clearly official right now:
- Windsurf offers `Free`, `Pro`, `Max`, `Teams`, and `Enterprise` plans — verified `2026-05-24`
- Teams / Enterprise add-on credits are documented at `$120 for 1000 pooled credits` in legacy credit-based billing docs — verified `2026-05-24`

What still needs a cleaner source capture before final submission:
- Current self-serve monthly price for `Pro`
- Current self-serve monthly price for `Teams`
- Whether `Enterprise` is purely custom/contract pricing in the current model

Notes:
- Windsurf changed from credit-based to quota-based pricing for self-serve customers in March 2026.
- Because the current official docs emphasize usage mechanics more than a stable public price table, this section should be revisited in the live Windsurf pricing UI before final submission.

## Gaps To Resolve Before Submission

- Sync `src/data/pricing.ts` and any plan labels to the verified pricing data above.
- Replace flat placeholder monthly numbers for API-direct plans with explicit benchmark formulas tied to official token pricing.
- Re-check Google AI Pro / Ultra consumer prices directly in the live Google One UI.
- Re-check Windsurf’s current self-serve monthly prices directly in the live Windsurf pricing UI.
