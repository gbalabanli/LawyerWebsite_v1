# SEO Page Creator

A two-model workflow for producing publish-ready, SEO-structured Astro blog pages.

- **Writer**: `gemini-flash-lite-latest` (configurable in `config/models.json`)
- **Judge**: `deepseek-chat` (DeepSeek V3)
- The judge returns a strict JSON verdict (`pass | revise`) with `gaps`,
  `falseClaims`, `requiredEdits`, and an optional `createEnglishVersion` flag.
- The writer revises using that feedback until the judge approves
  (`verdict=pass`, `score >= passThreshold`, no false claims) or `maxRounds` is hit.
- On approval, the flow creates `src/content/posts/<lang>/<slug>.md`, updates
  `public/llms.txt`, runs `npm run build`, and verifies the page output plus
  `dist/sitemap-0.xml`. With `--push` it commits and pushes.

## Usage

```powershell
# 1) Check writer + judge reachability
npm run flow:probe

# 2) Dry run the queue (writes run artifacts, no repo changes)
npm run flow:create
npm run flow:create -- --request cekismeli-bosanma-davasi

# 3) Write file + update llms.txt + verify build (no git)
npm run flow:create -- --request <id> --publish

# 4) Full publish: also commit and push to the current branch
npm run flow:create:push -- --request <id>
```

### Flags

```
--stage probe|create|status
--queue <path>        queue file (default requests/queue.json)
--request <id>        run a single request from the queue
--max-rounds N        override policy.maxRounds
--threshold N         override rubric.passThreshold (0-10)
--auto-en             also produce English versions when the judge requests one
--publish             write content file + update llms.txt + verify build
--push                commit and push (implies publish)
--no-build            skip build/sitemap verification
--force               overwrite an existing slug
--limit N             only the first N queue entries
```

## Adding a page request

Edit `requests/queue.json`:

```json
{
  "requests": [
    {
      "id": "some-slug",
      "lang": "tr",
      "title": "Başlık...",
      "primaryKeyword": "anahtar kelime",
      "serviceTag": "aile-hukuku",
      "slug": "optional-slug",
      "intent": "who is searching and why",
      "notes": "extra editorial direction"
    }
  ]
}
```

`serviceTag` must match a tag in `src/config/services.ts` so the post links to the
right service page.

## Layout

```
src/      index.ts client.ts util.ts seo-metrics.ts writer.ts judger.ts
          pipeline.ts publish.ts request.ts types.ts
config/   models.json rubric.json policy.json
prompts/  writer.{tr,en}.md judger.{tr,en}.md reviser.{tr,en}.md
requests/ queue.json
output/   runs/<timestamp>/{meta,drafts,verdicts,final,result}.json
```

## Safety

- Default is **dry run**: nothing is written to the site and no git commands run.
- Git only runs with `--publish` (write + verify) and `--push` (commit + push).
- Only the new content file(s) and `public/llms.txt` are staged.
- On build/sitemap failure the flow exits non-zero and does not commit.
