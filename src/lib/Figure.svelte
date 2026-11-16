<script>
	// An image or a short video with a caption.
	// Usage in a post:  <Figure src={milo} alt="..." caption="..." />
	// For video:        <Figure src={clip} video caption="..." />
	export let src;
	export let alt = '';
	export let caption = '';
	export let video = false;
</script>

<figure>
	{#if video}
		<video {src} controls muted loop playsinline preload="metadata" />
	{:else}
		<img {src} {alt} loading="lazy" />
	{/if}
	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
	figure {
		margin: 1.5em 0;
	}

	img,
	video {
		display: block;
		max-width: 100%;
		height: auto;
		margin: 0 auto;
		border-radius: 4px;
	}

	figcaption {
		font-size: 15px;
		color: #707070;
		margin-top: 0.5em;
		text-align: center;
	}
</style>
