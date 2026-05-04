# Lawyer Website (Astro + GitHub Pages)

Static Astro website for a law practice with:

- Landing page (`/`)
- About page (`/about`)
- Contact page (`/contact`)
- Blog listing (`/blog`)
- Blog post detail (`/blog/[slug]`)

## Stack

- Astro (static output)
- Astro Content Collections (Markdown blog posts)
- `@astrojs/sitemap`
- GitHub Actions deployment to GitHub Pages

## Template System (Easy UI Swaps)

Template selection is controlled in `src/config/site.ts`:

```ts
template: 'classic-legal'
```

Available templates:

- `classic-legal`
- `modern-minimal`

Each template lives in:

- `src/templates/<template>/tokens.css`
- `src/templates/<template>/layout.css`

To add a new design:

1. Create a new `src/templates/<new-template>/tokens.css`
2. Create `src/templates/<new-template>/layout.css`
3. Add the template name to `TemplateName` in `src/types/site.ts`
4. Switch `template` in `src/config/site.ts`

## Content Editing (Git-based)

Blog posts are in `src/content/posts/*.md`.
Frontmatter fields:

- `title`
- `description`
- `date`
- `author`
- `tags`
- optional `coverImage`
- optional `slug`

## SEO

- Per-page title, description, canonical, OG tags
- Site JSON-LD (`LegalService`)
- Blog JSON-LD (`Article`)
- `robots.txt` endpoint
- Sitemap generated at build

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment

Workflow file: `.github/workflows/deploy-pages.yml`

Workflow automatically resolves:

- `BASE_PATH` (supports both `username.github.io` and project pages)
- `PUBLIC_SITE_URL` (used for canonical links, sitemap, and robots)

Before first production deploy, update these values:

- contact and brand details in `src/config/site.ts`
- optional custom domain URL via repository variable `PUBLIC_SITE_URL` in GitHub Actions
