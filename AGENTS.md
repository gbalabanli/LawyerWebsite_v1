# AGENTS.md

This file defines project-specific execution and editing guidance for agents working in this repository.

## 1) Project intent

- This is a static Astro website for a law practice.
- Hosting target is GitHub Pages.
- Primary lead channel is WhatsApp (no backend form processing in this version).
- Blog content is Git-based Markdown content under `src/content/posts/`.

## 2) Non-negotiable architecture rules

- Keep output static (`astro build`).
- Do not introduce server runtime dependencies (no database, no API server).
- Preserve route set unless user explicitly asks to change it:
  - `/`
  - `/about`
  - `/contact`
  - `/blog`
  - `/blog/[slug]`
- Keep template switch centralized in `src/config/site.ts`.

## 3) Template system contract

- Templates must be added under `src/templates/<template-name>/` with:
  - `tokens.css`
  - `layout.css`
- Any new template must:
  - be added to `TemplateName` in `src/types/site.ts`
  - work without page-level markup changes
- Design changes should be implemented through CSS variables and shared component classes first.

## 4) Content model contract

- Blog collection is defined in `src/content.config.ts`.
- Post files live in `src/content/posts/*.md` (or `.mdx` if needed later).
- Required frontmatter:
  - `title`
  - `description`
  - `date`
  - `author`
  - `tags`
- Optional frontmatter:
  - `coverImage`
  - `slug`
  - `updated` — set when a post is revised; drives `dateModified` in JSON-LD and meta tags (falls back to `date` if absent)
- Prefer SEO-safe descriptions (about 140-170 chars).

## 5) SEO and routing constraints

- Base layout owns canonical/meta tags and JSON-LD baseline.
- Blog post page owns `Article` JSON-LD.
- Keep `robots.txt` and sitemap generation active.
- Internal links must remain base-path aware using `src/utils/routing.ts`.

### SEO checklist for pages and blog posts

**Title (`title`):**
- Keep 50–60 characters, front-load primary keywords.
- Format: `"Primary Keyword Phrase | Firm Name"` or a natural variation.
- Every page must have a unique, descriptive title.

**Description (`description`):**
- Keep 140–170 characters.
- Include the primary keyword naturally within the first 120 characters.
- Write for the searcher (what will they find on this page?), not as a generic label.
- Every page must have a unique description.

**URL / slug:**
- Use lowercase, kebab-case (`/blog/kira-artis-orani-hesaplama`).
- Keep it short but descriptive; remove stop words (ve, ile, için, bir, etc.) when possible.
- Blog slug is auto-derived from the filename (e.g., `kira-artis-orani-hesaplama-2026-rehber.md` → `/blog/kira-artis-orani-hesaplama-2026-rehber/`).
- Never change a published slug — if you must, add a redirect.

**Hreflang for bilingual posts:**
- A Turkish post at `/blog/uyusmazlik-cozum/` should have a matching English post at `/en/blog/dispute-resolution/` if one exists.
- The BaseLayout auto-generates hreflang links from the `lang` prop and the pathname.
- If only one language exists, the alternate points to the x-default / root, which is acceptable.

**`updated` field:**
- When revising a published post, add or update `updated: YYYY-MM-DD` in the frontmatter.
- This drives `article:modified_time`, `dateModified` JSON-LD, and `<meta name="dateModified">`.
- Without `updated`, `dateModified` falls back to `date` (the original publish date).

**Blog post length:**
- Aim for 800–1500 words per post.
- Below 600 words risks being seen as thin content by search engines.
- Above 2000 words is acceptable for comprehensive guides, but avoid fluff — every section must serve the reader.
- Structure with clear H2 sections (3–6 per post) for readability and featured snippet opportunities.
- Use short paragraphs (2–4 sentences), bullet lists, and bold key phrases naturally.

**LLM-friendly features:**
- Every blog post is automatically listed in `public/llms.txt` — update this file when adding or renaming posts so LLMs can discover them.
- Structured frontmatter (`faq`, `howTo`, `links`) helps LLMs extract Q&A and step-by-step guides directly from the page — always fill these in when the content includes FAQs or instructions.
- Use descriptive H2 headings that work as standalone section summaries (LLMs often pull H2 + first paragraph as snippets).
- The first paragraph should clearly state the problem and what the reader will learn — this is what LLMs use as the page summary.
- Tags and service area links create a semantic graph that LLMs can traverse to understand the firm's expertise areas.

**HowTo posts:**
- Posts with step-by-step instructions must include the `howTo` frontmatter array.
- Each step requires `name` (short title) and `text` (explanation).
- Steps are rendered as a numbered, visually distinct section on the page using an `<ol>`.
- Every `howTo` step must also appear in the markdown body with matching H2 headings for full content depth.

**Internal linking:**
- Every new blog post should link to at least one related service page via `links:` in frontmatter.
- Every service page auto-links to matching blog posts (filtered by `tags` that match the service area's `tag`).
- Use `links:` to cross-reference other blog posts when topically relevant.
- Avoid orphan pages: every page must be reachable from the nav, footer, or a blog index.

**JSON-LD:**
- Blog posts automatically get `Article` + optional `FAQPage` + optional `HowTo` schema from the frontmatter.
- When adding FAQ or HowTo data to a post, fill in the `faq` or `howTo` frontmatter fields — schema is generated automatically.
- Regular pages get `LegalService` schema from the BaseLayout — no manual action needed.

**OG image:**
- Default OG image is `public/images/og-default.jpg` (54 KB).
- To override on a specific page, pass an `ogImage` prop to BaseLayout.
- Recommended OG image size: 1200×630 px.

**Tags:**
- Tags serve two purposes: (1) client-side blog filtering, (2) connecting posts to service areas.
- To make a post appear on a service page's "related posts" section, include that service area's `tag` value (defined in `src/config/services.ts`) in the post's `tags`.
- Tags are NOT rendered as separate archive/tag pages, so no URL bloat risk.

**Language prefix:**
- Turkish posts must be in `src/content/posts/tr/`.
- English posts must be in `src/content/posts/en/`.
- The `lang` field in frontmatter must match the directory (`tr` or `en`).
- Turkish pages live at `/` (no prefix), English at `/en/`.

**Canonical URL:**
- Auto-generated from `pathname` prop + `siteConfig.seo.siteUrl`.
- No manual canonical tag needed unless the page is intentionally a duplicate (avoid this).
- The 404 pages now use `robots="noindex, nofollow"` and are excluded from the sitemap.

## 6) Deploy and environment assumptions

- GitHub Actions workflow: `.github/workflows/deploy-pages.yml`.
- Build expects environment variables:
  - `BASE_PATH`
  - `PUBLIC_SITE_URL`
- Workflow currently auto-resolves these for:
  - user/organization pages (`https://<user>.github.io`)
  - project pages (`https://<user>.github.io/<repo>`)

## 7) Turkish character encoding (common pitfall)

- **NEVER use `\uXXXX` escape sequences in `.astro` HTML templates.** These only work in JavaScript/frontmatter context. In the HTML template (outside `---` blocks), `\u0131` prints as literal `\u0131`, not `ı`.
- **Always write actual UTF-8 characters** directly in `.astro` files (e.g., `ı`, `ş`, `ü`, `ğ`, `ö`, `ç`, `İ`, `Ş`, `Ü`, `Ğ`, `Ö`, `Ç`).
- In frontmatter JS strings, `\uXXXX` escapes DO work, but prefer writing actual characters for consistency so that text can be moved between frontmatter and template without breakage.
- **PowerShell encoding trap**: PowerShell's `Set-Content` defaults to non-UTF8 encoding and corrupts Turkish characters. Use `[System.IO.File]::WriteAllText(path, content, [System.Text.Encoding]::UTF8)` or Node.js `fs.writeFileSync(path, content, 'utf8')` instead.
- **How to check**: After writing Turkish text, verify the source file bytes with `[System.IO.File]::ReadAllBytes(path)` — a correct `ı` is `C4 B1`, `ş` is `C5 9F`, `ü` is `C3 BC`. If you see `5C 75 30 31 33 31` (`\u0131` as literal ASCII), it's broken.

## 8) Editing guidelines for agents

- Prefer modifying shared components/layout before page-specific duplication.
- Keep copy professional and legally neutral (no guarantees, no legal outcomes promised).
- Keep code ASCII unless file already requires Unicode.
- If adding a new page section, use existing component vocabulary first:
  - `Hero`, `Section`, `Card`, `CTA`, `BlogCard`
- After structural changes, run:
  - `npm run build`

## 9) Quick change playbooks

- Change active template:
  - update `siteConfig.template` in `src/config/site.ts`
- Update footer version:
  - update `siteConfig.version` in `src/config/site.ts`
- Add a blog post:
  - create new markdown file in `src/content/posts/`
- Update firm metadata:
  - edit `siteConfig.brand`, `siteConfig.contact`, `siteConfig.seo` in `src/config/site.ts`
