# Workflows

Agent-driven content workflows that operate on this repository. These are Node.js
dev tools only — they are **not** part of the Astro build and are never imported by
`src/`.

## Flows

- **`seo-page-creator/`** — writer (Gemini Flash Lite Latest) ↔ judger (DeepSeek V3)
  loop that drafts a blog page, reviews it against an SEO rubric, revises until the
  judge approves, then creates the content file, updates `public/llms.txt`, verifies
  the generated sitemap, and (with `--push`) commits and pushes.

Runs are cached under each flow's `output/runs/<timestamp>/`.

## Conventions

- Requests live in an editor-written `requests/queue.json`.
- Model keys are resolved from `config/models.json` and, if absent, from
  `~/.config/opencode/opencode.json`. Never commit secrets.
- All writes are UTF-8 (Turkish characters must stay intact).
