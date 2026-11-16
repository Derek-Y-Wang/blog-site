---
title: "Building shot-loop, Part 4: Prompting images, positive wording and guardrails"
date: 2026-11-11
series: Building shot-loop
part: 4
description: A prompt format borrowed from presets, why "no" doesn't work at CFG 1, and the rules I won't bend.
---

<script>
	import MediaPlaceholder from '$lib/MediaPlaceholder.svelte';
</script>

_Part 4 of 5 · Previous: [Talking dogs and burned-in subtitles](./part-3-talking-dogs) · Next: [Working with agents as a team](./part-5-agents-as-a-team)_

Video gets all the attention, but most of the stages in shot-loop actually run on images: references, storyboard stills, first frames. So I spent a surprising amount of time on how to write image prompts.

## A second workflow: Qwen-Image

Alongside the video pipeline there's a second workflow that runs **Qwen-Image 2.1** on RunPod. I use it for standalone high-resolution images, and for content the hosted image models sometimes refuse even when it's harmless.

Qwen came with a lesson right away: it runs at **CFG 1**, which means a negative prompt does nothing at all. "No bag" doesn't remove the bag. You have to say what you _do_ want instead:

| Instead of… | Write… |
| --- | --- |
| "no bag" | "empty hands" |
| "no text, no watermark" | "a clean unmarked image" |
| "no other people" | "with only the dog" |

## A prompt format with a fixed order

I borrowed the prompt structure from the way Higgsfield writes its own presets. Every prompt fills the same slots in the same order:

1. Role and framing
2. Subject
3. Placement and surface
4. Light
5. Camera
6. Realism
7. A "preserve" sentence, when a reference image is used
8. A short quality tail
9. Exclusions (as a short negative tail on Higgsfield, or as positive wording on Qwen)

Here's an example for a pet reference image:

```text
Square reference portrait of a golden retriever, head and shoulders centered
in the frame, cream-colored coat, dark brown eyes, dark nose, soft floppy ears,
sitting on a plain neutral living-room floor with an empty softly blurred
background, soft window light from the left with a gentle shadow, eye-level
camera, 85 mm look, shallow depth of field, visible fine fur texture with
natural asymmetry, unretouched natural photography, sharp focus, 4K, a clean
unmarked image with only the dog.
```

A fixed order sounds fussy, but it makes prompts easy to compare, and it means the agent always remembers to describe the light and the camera.

## Character sheets

For characters that show up across a whole video, I generate a **character sheet**: a portrait on one side, the full body on the other. The video model only sees one reference, but the sheet gives me (and the agent writing later prompts) everything about how the character looks.

<MediaPlaceholder id="P4-a" caption="A character sheet: portrait on the left, full body on the right." shows="a Qwen-generated sheet for a fictional character. Not yet approved as a final, so check before using." />

## Wording lessons

A few things I only learned by getting them wrong:

- **"Chest-up" comes out waist-up.** If you want a tight portrait, say "head and shoulders filling the frame."
- **Name every distinctive part of an outfit**, or the model drops it. If the jacket has a patch on the sleeve, the prompt has to say so.
- **"Sheen" and glitter make skin look oily.** Leave them out of anything near a face.

<MediaPlaceholder id="P4-b" caption="'Chest-up' vs. 'head and shoulders filling the frame'." shows="two crops of the same character, one from each wording." />

## Guardrails

Some rules aren't about quality at all. These are written down so that no agent session ever has to make a judgment call on them:

- **Characters in swimwear or any revealing outfit are always written as clearly adult.** The prompt card says age 25, and it's shown visibly, never added silently.
- **Images judged explicit never get uploaded** to a hosted service. They stay on my machine.
- **Prompts and costs are shown before anything is generated.** Same rule as everywhere else in the pipeline.

The agent is very good at following rules like these. It's much less reliable at inventing them on the spot, which is why they're in a file and not just in my head.

_Next up: [Part 5, Working with agents as a team](./part-5-agents-as-a-team)._
