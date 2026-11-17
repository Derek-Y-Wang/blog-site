<script>
	// An image or a short video with a caption.
	// Usage in a post:  <Figure src={milo} alt="..." caption="..." />
	// For video:        <Figure src={clip} video caption="..." />
	export let src;
	export let alt = '';
	export let caption = '';
	export let video = false;
	// Optional cap on display width, e.g. '22rem' for tall portrait stills.
	export let maxWidth = '';
	// Optional cap on the image/video height, e.g. '30rem'. Width shrinks to keep the shape.
	export let maxHeight = '';
	// Video only: a still shown before playback, and whether it starts muted and loops.
	// Set muted={false} loop={false} for clips with narration.
	export let poster = '';
	export let muted = true;
	export let loop = true;
</script>

<figure style={maxWidth ? `max-width: ${maxWidth}; margin-left: auto; margin-right: auto;` : ''}>
	{#if video}
		<video {src} {poster} {muted} {loop} controls playsinline preload="metadata" style={maxHeight ? `max-height: ${maxHeight}; width: auto;` : ''} />
	{:else}
		<img {src} {alt} loading="lazy" style={maxHeight ? `max-height: ${maxHeight}; width: auto;` : ''} />
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
