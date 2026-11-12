import adapter from 'svelte-adapter-github';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: null,
			precompress: false,
			domain: '',
			jekyll: false
		}),
		// The site is served from https://<user>.github.io/blog-site, so every
		// route and asset URL needs this prefix. Use `base` from `$app/paths`
		// when writing links.
		paths: {
			base: '/blog-site'
		}
	}
};

export default config;
