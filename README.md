# Lawyer Website v0.0.1 (Astro + GitHub Pages)

Static law-firm website with:

- Landing page
- About page
- Contact page (WhatsApp-first)
- Blog index and post detail pages
- Swappable UI templates controlled by one config value

## 1) Tech Stack

- Astro 6 (`static` output)
- Astro Content Collections for blog posts
- `@astrojs/sitemap` for sitemap generation
- GitHub Actions for deployment to GitHub Pages

## 2) Routes

- `/` Landing
- `/about` About Me
- `/contact` Contact Me
- `/blog` Blog Main
- `/blog/[slug]` Blog Post
- `/robots.txt` robots rules

## 3) Quick Start

```bash
npm install
npm run dev
```

Open:

- `http://localhost:4321/`

Production build:

```bash
npm run build
```

## 4) Configuration

Main site configuration is in:

- `src/config/site.ts`

Important fields:

- `template`: active design template (`classic-legal` or `modern-minimal`)
- `version`: footer version text (currently `v.0.0.1`)
- `brand`: firm identity content
- `seo`: site metadata and canonical base URL
- `contact`: phone/email/address/WhatsApp

## 5) Template System (Design Swap)

To switch UI design, edit one value:

```ts
template: 'classic-legal'
```

Template files:

- `src/templates/classic-legal/tokens.css`
- `src/templates/classic-legal/layout.css`
- `src/templates/modern-minimal/tokens.css`
- `src/templates/modern-minimal/layout.css`

To add a new template:

1. Create `src/templates/<new-template>/tokens.css`
2. Create `src/templates/<new-template>/layout.css`
3. Add template name to `TemplateName` in `src/types/site.ts`
4. Set `siteConfig.template` to the new template

## 6) Blog Content Editing

Blog posts are Git-based files in:

- `src/content/posts/*.md`

Frontmatter schema (from `src/content.config.ts`):

- Required: `title`, `description`, `date`, `author`, `tags`
- Optional: `coverImage`
- Optional (supported in content files): `slug`

Current sample posts:

- `contract-review-basics.md`
- `legal-risk-checklist-for-smbs.md`
- `pre-litigation-strategy.md`

## 7) SEO Setup

Implemented:

- Per-page `<title>`, description, canonical
- Open Graph and Twitter meta tags
- `LegalService` JSON-LD in base layout
- `Article` JSON-LD on blog detail pages
- `robots.txt` endpoint (`src/pages/robots.txt.ts`)
- Sitemap generation via `@astrojs/sitemap`

## 8) Deploy (GitHub Pages)

Workflow:

- `.github/workflows/deploy-pages.yml`

Build behavior:

- Workflow auto-detects user/org pages vs project pages
- Sets:
  - `BASE_PATH`
  - `PUBLIC_SITE_URL`

Astro config reads env values from:

- `astro.config.mjs`

For custom domains:

- Set repository variable `PUBLIC_SITE_URL` in GitHub Actions settings

## 9) Detailed File Map

### Root files

- `AGENTS.md`: Agent-specific architecture and editing rules for this repo
- `README.md`: Project documentation and operations guide
- `package.json`: scripts and dependency declarations
- `astro.config.mjs`: Astro site/base/output/integrations
- `tsconfig.json`: TypeScript config used by Astro

### CI/CD

- `.github/workflows/deploy-pages.yml`: build and deploy pipeline to GitHub Pages

### Public assets

- `public/favicon.svg`: site icon
- `public/favicon.ico`: fallback icon

### Source: shared logic

- `src/config/site.ts`: central site config (template, version, brand, contact, seo)
- `src/types/site.ts`: `SiteConfig`, `TemplateName`, and blog-related types
- `src/utils/routing.ts`: `withBase()` helper for base-path-safe links
- `src/content.config.ts`: Astro content collection schema for blog posts

### Source: layout and components

- `src/layouts/BaseLayout.astro`: global shell, nav, footer, meta tags, JSON-LD, template loading
- `src/components/Hero.astro`: reusable hero section
- `src/components/Section.astro`: section wrapper with heading and lead
- `src/components/Card.astro`: reusable content card
- `src/components/CTA.astro`: call-to-action block
- `src/components/BlogCard.astro`: blog listing card UI

### Source: pages

- `src/pages/index.astro`: landing page
- `src/pages/about.astro`: about page
- `src/pages/contact.astro`: contact page
- `src/pages/blog/index.astro`: blog listing with client-side search and tag filter
- `src/pages/blog/[slug].astro`: blog detail page with related posts and article schema
- `src/pages/robots.txt.ts`: generated robots file endpoint

### Source: style system

- `src/styles/base.css`: global layout and component style primitives
- `src/templates/classic-legal/tokens.css`: classic template design tokens
- `src/templates/classic-legal/layout.css`: classic template look overrides
- `src/templates/modern-minimal/tokens.css`: modern template design tokens
- `src/templates/modern-minimal/layout.css`: modern template look overrides

### Source: content

- `src/content/posts/*.md`: markdown blog post sources

## 10) Common Maintenance Tasks

Update footer version:

1. Edit `siteConfig.version` in `src/config/site.ts`

Update law-office contact info:

1. Edit `siteConfig.contact` in `src/config/site.ts`

Add a blog article:

1. Create a markdown file in `src/content/posts/`
2. Fill valid frontmatter
3. Run `npm run build` to validate

Switch design template:

1. Change `siteConfig.template`
2. Run `npm run dev` and verify all pages

## 11) Current Status

- Version: `v.0.0.1`
- Branch expected for deploy: `main`
- Deployment target: GitHub Pages static hosting
