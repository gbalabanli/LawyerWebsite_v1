# SEO Writer Benchmark

A local, dependency-free benchmark that measures how well LLM models write
SEO-ready legal content, then ranks them. It reuses the site's SEO conventions
from `AGENTS.md`.

Two modes:

- **short** (recommended first pass): 6 short Q&A / short-article / SEO-pack tasks
  with reference points. Fast (~1-2 min for 10 models) and accurate to score.
- **article**: full 800-1500 word blog articles with frontmatter, FAQ and HowTo.
  Slower and better for confirming finalists.

Judging is **blind**: the judge never sees which model wrote an answer.

## Quick start

```powershell
# 1) Check which models are reachable right now (fast)
npm run bench:probe

# 2) Fast screening: 10 models x 6 short tasks
npm run bench:short
#   -> benchmarks/seo-writer/output/runs/<timestamp>/short/SHORT_REPORT.md

# 3) Full articles for finalists (2 titles), after screening
npm run bench -- --stage generate --profile quick --models "gemini-3.5-flash-lite,gemini-flash-lite-latest" --concurrency 10
npm run bench:metrics -- --latest
npm run bench:judge   -- --latest
npm run bench:review  -- --latest    # writes REVIEW.md for your manual/agent pass
npm run bench:report  -- --latest    # writes REPORT.md + scores.csv
```

9router must be running for the free Kilo models (`http://127.0.0.1:20128`).
Other providers use keys from `~/.config/opencode/opencode.json` or env vars.

## Task / title inputs

- `tasks/short.json` - short benchmark tasks. Each has `question`, `primaryKeyword`,
  `minWords`, `maxWords`, `mustInclude` (reference points) and `reference`.
- `titles/quick.json` - 2-title screening set for full articles.
- `titles/titles.json` - full 5-title set.

Add a title: append to a titles file. Add a short task: append to `tasks/short.json`.

## Models

`config/models.json` lists providers and models. `enabled: true` models run by
default. Keys are resolved from, in order: `provider.apiKey`, `apiKeyEnv`, then
`~/.config/opencode/opencode.json`. Never commit secrets here.

Roster (all verified reachable): 5 free Kilo models via 9router
(`laguna-s`, `laguna-xs`, `ling-3.0-flash-{vl,sante,fin}`), `glm-4.5-flash`,
and Gemini `3.6-flash`, `3.5-flash-lite`, `3-flash-preview`, `flash-lite-latest`.
Set `enabled: true` on `deepseek-chat`, `gemini-3.7/3.8-flash`, `kimi-k3`,
`step-3.7-flash-free` once credentials/credits are available.

## Scoring

**Short mode:** `final = 0.6 * judge + 0.4 * deterministic`
- Judge (0-100) is accuracy-weighted: accuracy 45%, completeness 20%, directness 15%,
  SEO 12%, tone 8%.
- Deterministic (0-100): word-limit compliance, keyword presence, direct opening
  (no filler), format compliance (`howto` steps, `seo_pack` JSON + title/meta lengths),
  reference-point coverage, no filler.

**Article mode:** `final = 0.45 * judge + 0.35 * deterministic + 0.20 * agent`.
Weights are renormalized over whichever sources exist. See `config/rubric.json`.

Judges: `config/judges.json`. DeepSeek V3 is the primary judge; Gemini 3.7 Flash is
a second judge that contributes when its free-tier quota allows.

## CLI

```
--stage   probe | short | generate | metrics | judge | review | report | all
--profile quick | full          (titles/quick.json vs titles/titles.json)
--models  enabled | all | id1,id2,...
--titles  path                  (article titles)
--tasks   path                  (short tasks)
--run     name | --latest
--repeats 1 --concurrency 10 --limit N --force --tier free
```

Reruns are cached: completed outputs are skipped unless `--force` is passed.

## Output layout

```
output/runs/<run>/
  REPORT.md, scores.csv, scores.json      # article mode
  REVIEW.md, agent-review.template.json   # manual/agent pass
  articles/<model>/<title>.md
  raw/<model>/<title>.json
  judge/<judge>/<model>__<title>.json
  metrics.json
  short/                                   # short mode
    SHORT_REPORT.md, short-scores.csv, short-scores.json
    answers/<model>/<task>.md|json
    raw/<model>/<task>.json
    judge/<judge>/<model>__<task>.json
```

## Constraints

- Free Kilo models share an upstream pool and occasionally return 429; failures are
  recorded, not fatal.
- `glm-4.5-flash` is a slow reasoning model (30-240s per answer); it is capped by a
  per-model timeout.
- Gemini free-tier keys can hit 429 quota under parallel load; judging runs at
  concurrency 3 to reduce bursts.
