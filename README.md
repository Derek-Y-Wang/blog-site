# blog-site

Derek Wang's personal blog, a place to write up things I've learned or built in my free time.

**Live site:** https://derek-y-wang.github.io/blog-site/

Built with [SvelteKit](https://kit.svelte.dev/) and hosted on GitHub Pages as a fully static, prerendered site.

## Project layout

```
src/
  components/Header.svelte   # site header and nav (Posts, About)
  routes/
    +layout.js               # prerender = true for every page
    +page.svelte             # home
    posts/+page.svelte       # post list
    about/+page.svelte       # about me
static/                      # files copied as-is (favicon, etc.)
docs/                        # build output served by GitHub Pages (committed)
```

## Developing

```bash
npm install
npm run dev
```

The site is served under the `/blog-site` base path (set in `svelte.config.js`), so the dev server is at http://localhost:5173/blog-site/.

When writing internal links, prefix them with `base` so they work both locally and on GitHub Pages:

```svelte
<script>
  import { base } from '$app/paths';
</script>

<a href="{base}/about">About</a>
```

Leave off trailing slashes (`{base}/about`, not `{base}/about/`). Each page is built to a file like `about.html`, and GitHub Pages only serves that file at the address without a slash.

## Building and deploying

```bash
npm run build
```

This prerenders every page into `docs/` using `svelte-adapter-github`. To preview the production build locally, run `npm run preview` and open http://localhost:4173/blog-site/.

To deploy, commit the updated `docs/` folder and push to `main`. GitHub Pages is set to **Deploy from a branch → `main` / `/docs`** and republishes within a minute or two.

## Other scripts

| Command          | What it does                       |
| ---------------- | ---------------------------------- |
| `npm run check`  | Type-check with `svelte-check`     |
| `npm run lint`   | Check formatting and lint          |
| `npm run format` | Auto-format with Prettier          |
