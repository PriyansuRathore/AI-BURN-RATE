# PROMPTS

## Summary Prompt

The backend currently sends this prompt to Anthropic:

> Write a concise 90-120 word founder-facing summary of this AI spend audit. Emphasize defensible savings, not hype. Audit JSON: ...

## Why I Wrote It This Way

- I wanted the summary to sound like a practical operator’s note, not marketing copy.
- The prompt explicitly emphasizes defensible savings because the assignment prioritizes finance-literate reasoning.
- Passing the audit JSON directly keeps the prompt simple and ensures the model sees the recommendation and totals context.

## Fallback Behavior

If Anthropic is unavailable or returns an error, the backend falls back to a templated summary. This prevents the AI feature from blocking the main user flow.

## What I Would Improve

- Add more structured prompt fields instead of raw JSON.
- Separate low-savings and high-savings tone more intentionally.
- Add a system prompt that constrains overclaiming and duplicate phrasing.
