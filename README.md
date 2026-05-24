# AI Burn Rate

AI Burn Rate is a React + TypeScript web app that helps startup founders and engineering managers audit AI tool spend, spot overspending, and estimate defensible monthly and annual savings. It is designed as a free top-of-funnel product for Credex, with backend-backed audit capture, shareable public report URLs, and lead collection after value is shown.

Deployed URL: `TBD`

Screenshots / demo:
- `TBD - landing page screenshot`
- `TBD - audit results screenshot`
- `TBD - public report screenshot`
- `TBD - 30-second walkthrough link`

## Quick Start

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
npm install --prefix backend
npm run dev --prefix backend
```

Frontend build:

```bash
npm run build
```

Backend build:

```bash
npm run build --prefix backend
```

Tests:

```bash
npm run test
```

## Environment

Create `backend/.env` from `backend/.env.example`.

Required for real Supabase storage:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Optional:

```env
SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

## Decisions

1. I used React + Vite + TypeScript for a fast iteration loop and small deployment surface while keeping the UI code simple and strongly typed.
2. I kept the audit math rule-based instead of model-driven because the assignment explicitly rewards defensible financial logic over AI-generated reasoning.
3. I split AI summary generation into a backend endpoint so Anthropic credentials stay server-side and the frontend still works with a deterministic fallback summary.
4. I added a Supabase-backed storage path with a local JSON fallback so the project satisfies the “real backend” requirement without blocking local development.
5. I used a shareable public report route backed by stored audit results, because the viral sharing loop is part of the product case, not just a UI detail.
