<script>
	// Marks a spot where an image, video or diagram still needs to be approved
	// and added. Replace with <Figure> once the media is in place.
	export let id = '';
	export let caption = '';
	export let shows = '';
</script>

<figure class="placeholder">
	<div class="box">
		<span class="tag">Media placeholder {id}</span>
		<span class="shows">{shows}</span>
	</div>
	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
	figure {
		margin: 1.5em 0;
	}

	.box {
		border: 2px dashed #b0b0b0;
		border-radius: 6px;
		background: #fafafa;
		padding: 1.5em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		font-size: 15px;
		color: #555;
	}

	.tag {
		font-weight: bold;
		text-transform: uppercase;
		font-size: 12px;
		letter-spacing: 0.05em;
		color: #888;
	}

	figcaption {
		font-size: 15px;
		color: #707070;
		margin-top: 0.5em;
		text-align: center;
	}
</style>
