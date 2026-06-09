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
- Prefer SEO-safe descriptions (about 140-170 chars).

## 5) SEO and routing constraints

- Base layout owns canonical/meta tags and JSON-LD baseline.
- Blog post page owns `Article` JSON-LD.
- Keep `robots.txt` and sitemap generation active.
- Internal links must remain base-path aware using `src/utils/routing.ts`.

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
