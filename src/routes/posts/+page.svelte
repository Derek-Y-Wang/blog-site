<script>
  import { base } from '$app/paths';
  import Header from '../../components/Header.svelte';
  import { isoDate, formatDate } from '$lib/dates.js';

  // Every post is a Markdown file at posts/<slug>/+page.md; mdsvex exposes
  // its frontmatter as `metadata`.
  const modules = import.meta.glob('./*/+page.md', { eager: true });

  // Sorted most recent first. Posts published the same day: later series part first.
  const newestFirst = Object.entries(modules)
    .map(([path, mod]) => ({
      slug: path.split('/')[1],
      ...mod.metadata
    }))
    .sort(
      (a, b) =>
        isoDate(b.date).localeCompare(isoDate(a.date)) || (b.part ?? 0) - (a.part ?? 0)
    );

  // Sort toggle at the top of the list. Defaults to newest first, which is
  // also what the prerendered page shows before JavaScript loads.
  let order = 'newest';
  $: posts = order === 'newest' ? newestFirst : [...newestFirst].reverse();
</script>

<svelte:head>
  <title>Posts · Derek Wang</title>
</svelte:head>

<div class="page">
  <Header />
  <div class="title-row">
    <h2>All Posts</h2>
    {#if posts.length > 1}
      <label class="sort">
        Sort by date
        <select bind:value={order}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </label>
    {/if}
  </div>

  {#if posts.length === 0}
    <p>Nothing to see here!</p>
  {:else}
    <ul class="posts">
      {#each posts as post}
        <li>
          <a href="{base}/posts/{post.slug}">{post.title}</a>
          <span class="date">{formatDate(post.date)}</span>
          {#if post.description}<p>{post.description}</p>{/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .page {
    max-width: 42rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .title-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }

  .sort {
    font-size: 14px;
    color: #707070;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .sort select {
    font: inherit;
    color: #303030;
    padding: 0.2em 0.4em;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
  }

  .posts {
    list-style: none;
    padding: 0;
  }

  .posts li {
    margin-bottom: 1.5em;
  }

  .posts a {
    font-size: 19px;
    font-weight: bold;
    color: #303030;
  }

  .date {
    display: block;
    color: #707070;
    font-size: 14px;
  }

  .posts p {
    margin: 0.3em 0 0;
    color: #505050;
  }
</style>
