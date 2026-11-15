# Personal site — Eleonora Slabun

Next.js site with four sections: home/about, Projects, Writing (Markdown blog),
and CAIS.

## Running it locally

First time only, install the dependencies:

```
npm install
```

Then, every time you want to work on it:

```
npm run dev
```

Open http://localhost:3000 in your browser. Edits appear instantly — no restart.

Press Ctrl+C in the terminal to stop it.

## Writing a post

Add a `.md` file to the `posts/` folder. That's the entire process — no React,
no rebuilding, no config.

The file must start with a front-matter block between `---` lines:

```markdown
---
title: "Solving for implied volatility"
date: "2026-08-20"
summary: "One sentence that shows up in the post list."
tags: ["options", "python"]
---

Your writing starts here. Normal Markdown.

## A heading

A paragraph with **bold** and `inline code`.

```python
def black_scholes(S, K, T, r, sigma, option_type):
    ...
```

![A caption for the image](/smile.png)
```

The filename becomes the URL, so `2026-08-20-implied-vol.md` lives at
`/writing/2026-08-20-implied-vol`. Dating filenames keeps them sorted; the `date`
field is what actually controls ordering on the site.

## Images and screenshots

Put image files in `public/`. Reference them with a leading slash:

```markdown
![Volatility smile](/smile.png)
```

So `public/smile.png` becomes `/smile.png`. Screenshots, charts saved by
matplotlib, anything.

## Editing the pages

| File | What it is |
|---|---|
| `app/page.jsx` | Homepage and bio |
| `app/projects/page.jsx` | Projects |
| `app/cais/page.jsx` | CAIS |
| `app/writing/page.jsx` | Post list |
| `app/writing/[slug]/page.jsx` | Individual post layout |
| `app/globals.css` | All styling, including dark mode |
| `components/Nav.jsx` | Navigation bar |
| `lib/posts.js` | Reads and renders the Markdown |

These are JSX — HTML with `{}` for values. Editing the text between tags is
safe. Note `className` instead of `class`, and apostrophes inside text need to
be written `&apos;`.

## Deploying

1. Push this folder to its own GitHub repository
2. Go to vercel.com, sign in with GitHub, click **Add New → Project**
3. Select the repo, accept the defaults, click **Deploy**

You get a live URL in about a minute. After that, every `git push` redeploys
automatically.

Free tier is plenty for this.

## Before publishing

- Replace the GitHub links in `app/layout.jsx` and `app/projects/page.jsx`
- Check the CAIS page says what you want it to say publicly
- Add a real screenshot of the volatility smile to `public/` and reference it
