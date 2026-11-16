---
title: "Building shot-loop, Part 1: Letting a coding agent run a video pipeline"
date: 2026-11-16
series: Building shot-loop
part: 1
description: Why I built an AI video pipeline that a coding agent runs, how it's laid out, and what the first video cost.
---

<script>
	import MediaPlaceholder from '$lib/MediaPlaceholder.svelte';
</script>

_Part 1 of 5 · Next: [Idle pods are the real bill](./part-2-idle-pods)_

For the last month I've been building something I call **shot-loop**: a pipeline for making short vertical videos (9:16, 720p, 24 fps, up to 45 seconds) for social media, where the thing actually driving the work is a coding agent. I've used both Claude Code and Codex for it. I talk to the agent, it plans the video with me, and then it goes off and runs the tools.

This series is my write-up of what I learned along the way: what it costs, what broke, what the models refuse to do, and what it's like to work with a few agents at once. All the numbers come from my own experiment logs from November 2026, so take them as "about" figures for that moment in time.

## The idea

Making a 30-second video with AI tools isn't hard anymore. The hard part is doing it _repeatably_ without lighting money on fire. Video generation is the expensive step, and it's very easy to burn through a GPU hour re-rendering a clip because the script was wrong in the first place.

So the whole design is about doing the cheap things first and only spending money once the earlier, cheaper decisions are locked in.

## Seven stages, one at a time

Every video goes through the same seven stages, and I approve each one before the agent moves on to the next:

1. **Script**: the treatment, a beat sheet, a continuity sheet, and how the audio will work. Costs nothing.
2. **Scene**: a shot list with direction and a base prompt per scene, reference images, and one still per scene as a storyboard. A few cents each.
3. **Dialogue**: the actual lines, who says them, and whether they're spoken on camera or as a voiceover. Free again.
4. **Video**: first a prompt review, then the clips themselves, rendered on a rented GPU.
5. **Stitching**: join the approved clips into one picture, level the speech, cover up any text the model burned in.
6. **Sound + music**: voiceover, ambience, effects, music and captions, mixed over the cut.
7. **Cleanup**: quick checks, I watch the result and sign off, raw files get deleted, the GPU is confirmed gone, and the seeds and prompts get written back so the video can be re-rendered later.

<MediaPlaceholder id="P1-a" caption="The seven stages." shows="a simple left-to-right diagram of the seven stages, with the paid ones (Scene, Video, Sound + music) highlighted." />

The order is the point: words, then stills, then video, then the cut, then sound. By the time anything touches a GPU, I've already agreed on the script, the look, and every line of dialogue.

The agent also has to say which stage it's in at the start of every reply, it never skips or reorders stages without asking, and it shows me the cost as a bullet list before spending anything.

## Who does what

The tools are split by what each one is good (and cheap) at:

- **Video, including on-camera speech:** the open LTX-2.5 model in ComfyUI, on a GPU I rent by the hour from RunPod.
- **Images, voiceover, music and sound effects:** Higgsfield, a hosted service that charges in credits.
- **The cut:** good old ffmpeg.

Hosted video models are still an option, but as an opt-in "premium" choice per shot, for reasons I'll get into in Part 2.

The repo itself holds docs, configs, ComfyUI workflows and scripts, and **never media**. Renders live on my machine and stay out of git.

## Why the rules live in a file

The most useful decision I made early on was to put all the rules in one instruction file, `AGENTS.md`, plus a set of "skills" (smaller how-to files for specific jobs). Every agent session reads the same file, so it behaves the same way every time, whether it's Claude Code or Codex, today or next week.

That also means the rules can be _tested_. More on that in Part 5.

## The first run: Milo reviews a sofa

The first end-to-end test was a 31-second video of Milo, a (completely made up) golden retriever, reviewing a sofa.

<MediaPlaceholder id="P1-b" caption="Milo, our test subject. He isn't real." shows="the AI-generated golden retriever reference image." />

From the first message to the finished video took **34 minutes** and cost **about $0.40 all-in**:

- RunPod A40 GPU, about 23.5 minutes at $0.59/hr: about $0.24
- Pod disk: under $0.05
- Higgsfield reference image: 0.25 credits
- Higgsfield voiceover, 5 lines at 0.30 each: 1.50 credits
- Higgsfield total: 1.85 credits, roughly $0.10 to $0.16 at my top-up prices

No hosted video model was used at all. Every clip came out of LTX on the rented GPU.

<MediaPlaceholder id="P1-c" caption="'Milo Reviews the Sofa', the first video out of the pipeline." shows="one still from the video (or a short compressed clip, since the full 31 s file is heavy for GitHub Pages)." />

Where those 34 minutes went is a little humbling: about 4 minutes on script, image and voice, about **12 minutes waiting on me**, about 8 minutes on pod boot, failed downloads and a restart, about 14 minutes actually rendering five clips, and about 2 minutes on review and stitching.

## The trailing-space bug

Those failed downloads deserve their own story.

The LTX models are gated on Hugging Face, so the GPU needs a token to download them. The agent couldn't read the token from my environment, so I created it as a RunPod secret instead. My first secret had a **trailing space** in it. Every gated download then failed with `Illegal header value`, because a token with a space on the end isn't a valid HTTP header.

Once I fixed the secret and restarted the pod, everything worked, but I lost about 5 minutes of idle GPU time to a space character.

Two rules went into the repo because of this:

- A pod only reads its secrets **at boot**, so after fixing a secret you have to restart.
- The request that creates a pod has to be sent exactly as written, and **never rebuilt from a "get" call**. "Get" calls show secrets as `[redacted]`, and if you send that back, the token literally becomes the string `[redacted]`.

Neither of those is hard. Both are the kind of thing an agent will happily get wrong every single session unless it's written down.

_Next up: [Part 2, Idle pods are the real bill](./part-2-idle-pods)._
