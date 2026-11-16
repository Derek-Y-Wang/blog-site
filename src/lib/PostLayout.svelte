<script>
	// mdsvex passes each post's frontmatter in as props.
	import Header from '../components/Header.svelte';
	import { formatDate } from './dates.js';

	export let title = '';
	export let date = '';
	export let description = '';

	$: displayDate = formatDate(date);
</script>

<svelte:head>
	<title>{title} · Derek Wang</title>
	{#if description}<meta name="description" content={description} />{/if}
</svelte:head>

<div class="page">
	<Header />
	<article>
		<h1>{title}</h1>
		{#if displayDate}<p class="date">{displayDate}</p>{/if}
		<slot />
	</article>
</div>

<style>
	.page {
		max-width: 42rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		margin-left: auto;
		margin-right: auto;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	article {
		font-size: 18px;
		line-height: 1.6;
		color: #303030;
	}

	h1 {
		line-height: 1.25;
		margin-bottom: 0.25em;
	}

	.date {
		color: #707070;
		font-size: 15px;
		margin-top: 0;
	}

	article :global(h2) {
		margin-top: 2em;
	}

	article :global(pre) {
		background: #f5f5f5;
		padding: 1em;
		overflow-x: auto;
		font-size: 14px;
		line-height: 1.5;
		border-radius: 4px;
	}

	article :global(code) {
		font-size: 0.9em;
	}

	article :global(table) {
		border-collapse: collapse;
		width: 100%;
		font-size: 16px;
	}

	article :global(th),
	article :global(td) {
		border-bottom: 1px solid #ddd;
		padding: 0.4em 0.6em;
		text-align: left;
	}

	article :global(img),
	article :global(video) {
		max-width: 100%;
		height: auto;
	}

	article :global(a) {
		color: #303030;
	}
</style>
