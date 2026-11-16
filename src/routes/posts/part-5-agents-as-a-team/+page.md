---
title: "Building shot-loop, Part 5: Working with agents as a team"
date: 2026-11-15
series: Building shot-loop
part: 5
description: An instruction file, a free test suite, several agent sessions with different jobs, and the parts that are still unsolved.
---

<script>
	import MediaPlaceholder from '$lib/MediaPlaceholder.svelte';
</script>

_Part 5 of 5 · Previous: [Prompting images](./part-4-prompting-images)_

The last part of this series is less about video and more about what it's like to build something with coding agents doing most of the typing. Over about four weeks, shot-loop got 17 pull requests.

## One file, ten skills, 45 tests

Everything the agent needs to know lives in one instruction file, `AGENTS.md`, plus ten skills (focused how-to files for things like running a pod or writing an image prompt).

Because the rules are files, they can be tested. There's a free test suite of **45 tests** that needs no network and never pays for a generation. It checks things like:

- the shots files are valid,
- the workflow node ids the runner scripts edit still exist,
- the deploy configs are well-formed,
- and no media or secrets have been committed.

The suite has already caught real mistakes. One example: a workflow node id that moved. Without the test, the runner would have failed silently, and I'd only have found out after paying for a GPU.

## Approval on every scene

Here's an example of the "scene card" the agent shows me before rendering a clip. I approve the exact text before anything is sent, and again, with what changed, before any redo:

```text
Scene 3 of 5, 6 s, 9:16
- Character reference: milo, the golden retriever. One reference per shot.
- Exact video prompt: "A cream-colored golden retriever lying on a beige sofa
  sniffs a cushion, then looks into the camera with a skeptical expression and
  slowly shakes his head. Warm living-room light, shallow depth of field,
  handheld camera. No text, no captions."
- Voice dialogue: voiceover (not on camera), Milo's voice, verbatim:
  "Cushion seven out of ten. Too fluffy to trust."
- Settings: seed 103, 6 s, 1 take, LTX reference workflow on RunPod,
  reference guidance 3, no music, no first frame.
- Cost: about 2.5 min of A40 time at $0.59/hr, about $0.02.
```

_(This card is an example written in the repo's format, not copied from a real run.)_

## Several agents, different jobs

At some point one agent session wasn't enough, so now there are a few, each with one job:

- a **coordinator** that talks to me and keeps track of the plan,
- a **researcher** that reads docs and checks how tools behave,
- and a single **dev** session that makes all the code changes, so two agents never edit the same files.

They coordinate by sending each other messages. The important rule is that **I decide what's approved.** One agent can't approve spending for another, no matter how politely it asks.

<MediaPlaceholder id="P5-a" caption="Who does what." shows="a small diagram with me at the top, and the coordinator, researcher and dev sessions passing messages, with spending approvals only flowing from me." />

## The bottleneck is me

Approving every stage is what keeps costs down. It's also the reason I can't post a video every day. Every stage waits on me, and in the very first run, waiting on me took up about 12 of the 34 minutes.

There's a written proposal in the repo (not adopted yet) to loosen this a bit:

- plan a whole series of videos together,
- render all of a series' clips in one pod session,
- and use a lighter review tier for B-roll that has no face and no speech.

## What's still unknown

Some honest limits, as of this writing:

- **Voice change** (a hosted tool that swaps the speaking voice on a clip) was tested at 1 credit per call, but the jobs hadn't finished when I wrote this, so I don't have results yet.
- **Upscaling** and **Qwen Image Edit** were considered and skipped for now.
- **Square (1:1) video, clips over 10 seconds, and FP8 on the A40** are all untested.

## What I'd tell myself a month ago

- Write the rules down before the second session, not after the fifth.
- Estimate idle time, not just render time.
- Do the cheap stages first and get them right.
- Let the agent do the bookkeeping, and keep the taste for yourself.

Thanks for reading the series. If you're building something similar, I'd love to hear about it on [LinkedIn](https://www.linkedin.com/in/derek-y-wang/).
