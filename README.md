# Elia's Notebook

A blog for notes on coding, math, and trading. Built with [Astro](https://astro.build),
hosted free on GitHub Pages, with LaTeX math and syntax-highlighted code.

**You do not need Node, npm, or a terminal to post.** A GitHub Action builds the site in the
cloud every time you commit. Adding a post is: create a `.md` file on github.com, click commit,
wait about a minute.

---

## First-time setup (do this once)

### 1. Put these files in your repo

Go to `github.com/ellia-codes/ellia-codes.github.io` → **Add file → Upload files**.

Drag in everything from this folder **except** `node_modules/` and `dist/` (they aren't here —
they get rebuilt automatically). Commit.

> **Two files are hidden** and won't show up when you drag from Finder: `.gitignore` and
> `.github/workflows/deploy.yml`. Either press `Cmd + Shift + .` in Finder to reveal hidden
> files first, or create them by hand: **Add file → Create new file**, type the full path
> including the folders (typing `.github/workflows/deploy.yml` creates the folders for you),
> paste the contents, commit.

### 2. Point Pages at the Action

Repo **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.

> This is different from the "Deploy from a branch" option. The Action builds your Markdown
> into HTML; a plain branch deploy would just serve raw files.

### 3. Watch it build

Go to the **Actions** tab. You'll see "Deploy site" running. When the checkmark turns green,
open **https://ellia-codes.github.io** — you're live.

If the Action fails, click into it and read the red step. It's almost always a typo in a post's
front matter (the block between `---` lines at the top of a `.md` file).

---

## Writing a post

1. On github.com, open `src/content/posts/`
2. **Add file → Create new file**
3. Name it something like `ito-lemma.md` — lowercase, hyphens, no spaces. **This filename
   becomes the URL**, so `ito-lemma.md` lives at `/posts/ito-lemma/`.
4. Paste this at the very top:

```markdown
---
title: "Your title here"
description: "One sentence. Shows on the homepage and in RSS."
date: 2026-09-20
tags: ["math", "python"]
draft: false
---

Write here.
```

5. Write. Commit. Wait ~60 seconds. It's live.

`draft: true` keeps a post off the site — use it to save something half-finished.

`src/content/posts/template.md` is a draft with every formatting trick in it. Copy that file
rather than starting from blank.

### Math

Inline, between single dollar signs: `$\mu S_t\,dt$`

On its own line, between double dollar signs:

```markdown
$$
dS_t = \mu S_t\,dt + \sigma S_t\,dW_t
$$
```

This is real LaTeX (KaTeX). [Supported functions →](https://katex.org/docs/supported.html)

### Code

Put the language name after the opening backticks so it gets colored:

````markdown
```python
sharpe = returns.mean() / returns.std() * (252 ** 0.5)
```
````

### Images

Drop the file into `public/`, then link it as `![caption](/chart.png)` — note the leading slash
and no `public` in the path.

---

## Changing things

| What | Where |
| --- | --- |
| Your name, tagline, intro paragraph | `src/site.config.ts` |
| "What I'm learning now" / "On the shelf" boxes | `src/site.config.ts` |
| Which color each tag gets | `src/site.config.ts` → `tagColors` |
| Nav links, footer links | `src/site.config.ts` |
| **All colors** | `src/styles/global.css` → the `:root` block at the top |
| Fonts | `src/layouts/BaseLayout.astro` → the Google Fonts `<link>` |
| The About page text | `src/pages/about.astro` |
| Code block color theme | `astro.config.mjs` → `shikiConfig.theme` |

Colors are defined once as variables at the top of `global.css` and used everywhere, so
changing `--rose` changes every pink thing on the site at once. The dark-mode block right
below it does the same for readers whose computer is set to dark.

---

## Running it on your own computer (optional)

Only needed if you want live preview while you edit the design. Requires
[Node 18+](https://nodejs.org).

```bash
git clone https://github.com/ellia-codes/ellia-codes.github.io.git
cd ellia-codes.github.io
npm install
npm run dev          # → http://localhost:4321, reloads as you save
```

`npm run build` produces the same output the Action does, into `dist/`. Useful for catching a
broken post before you commit it.

---

## Attaching a custom domain later

Nothing breaks and no links change on the GitHub address.

1. Buy the domain (Namecheap, Cloudflare, Porkbun — around $12/year for a `.com`)
2. At your registrar, add four `A` records for the root pointing to `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` pointing to
   `ellia-codes.github.io`
3. Repo **Settings → Pages → Custom domain**, type it, save, and tick **Enforce HTTPS**
4. Change the `site:` line in `astro.config.mjs` to the new address so RSS links stay correct

---

## Project layout

```
.github/workflows/deploy.yml   builds + deploys on every commit
astro.config.mjs               site URL, math plugins, code theme
src/
  site.config.ts               ← your name, bio, sidebar, tag colors
  content.config.ts            what fields a post must have
  content/posts/*.md           ← your posts
  layouts/BaseLayout.astro     header, footer, <head> tags
  components/Tag.astro         a colored tag pill
  pages/
    index.astro                homepage
    about.astro                about page
    posts/[...slug].astro      the template every post renders into
    rss.xml.js                 the RSS feed
    404.astro
  styles/global.css            ← all colors and typography
public/                        favicon, images — served as-is
```
