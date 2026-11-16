<script>
  import { base } from '$app/paths';
  import Header from '../../components/Header.svelte';
  import { isoDate, formatDate } from '$lib/dates.js';

  // Every post is a Markdown file at posts/<slug>/+page.md; mdsvex exposes
  // its frontmatter as `metadata`.
  const modules = import.meta.glob('./*/+page.md', { eager: true });

  const posts = Object.entries(modules)
    .map(([path, mod]) => ({
      slug: path.split('/')[1],
      ...mod.metadata
    }))
    // Most recent first. Posts published the same day: later series part first.
    .sort(
      (a, b) =>
        isoDate(b.date).localeCompare(isoDate(a.date)) || (b.part ?? 0) - (a.part ?? 0)
    );
</script>

<svelte:head>
  <title>Posts · Derek Wang</title>
</svelte:head>

<div class="page">
  <Header />
  <h2>All Posts</h2>

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
