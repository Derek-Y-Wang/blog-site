---
title: "Building shot-loop, Part 2: Quality, Workflows and Rules"
date: 2026-11-03
series: Building shot-loop
part: 2
description: With a functioning pipeline in place, the objective became more consistent videos and a process that others could adopt. The seven stages address both.
---

<script>
	import Figure from '$lib/Figure.svelte';
	import stages from '$lib/media/seven-stages.svg';
</script>

_Part 2 of 4 · Previous: [Letting a coding agent run a video pipeline](./part-1-building-shot-loop) · Next: [Prompting images](./part-3-prompting-images)_

Part 1 concluded with a functioning pipeline: a written description was provided, and a 31-second video was produced for approximately $0.40. A functioning pipeline, however, does not necessarily produce high-quality videos, nor is it necessarily usable by anyone other than its author. Once the initial setup was complete, my attention turned to two objectives:

- **Higher-quality videos.** In practice, this primarily means _consistency_: a character should look and sound the same from one clip to the next, and the process should yield a comparable standard of video on every run.
- **A more accessible process.** The pipeline should be transferable to another person, who should be able to produce a video without first learning how I personally work.

This part describes how these two objectives shaped the workflow, and in particular how the seven stages were established.

## Why the order matters

The first run indicated where problems were most likely to arise. 

Video generation is both the most expensive step, the most time consuming and the most difficult to correct: if a character's appearance drifts between clips, or a line of dialogue proves to be incorrect, the only remedy is to render the clip again. Errors identified at the video stage are therefore the most costly. **ALL OTHER ASSETS ARE CHEAP**

Decisions were being made, but not at predictable points, which makes a process difficult to follow for anyone who did not design it.

Both observations led to the same conclusion: every decision that affects consistency should be settled _before_ any video is rendered, and each point at which a person must make a decision should be made explicit.

## Seven stages, one at a time

Every video passes through the same seven stages, and each stage requires my approval before the agent proceeds to the next:

1. **Script**: the treatment, a beat sheet, a continuity sheet, and the plan for the audio. No cost.
2. **Scene**: a shot list with direction and a base prompt for each scene, reference images, and one still per scene as a storyboard. A few cents each.
3. **Dialogue**: the final lines, the speaker of each, and whether each is delivered on camera or as a voiceover. No cost.
4. **Video**: a review of the prompts, followed by rendering of the clips on a rented GPU.
5. **Stitching**: assembly of the approved clips into a single picture, levelling of the speech, and concealment of any text the model has burned in.
6. **Sound + music**: voiceover, ambience, effects, music and captions, mixed over the cut.
7. **Cleanup**: final checks, a complete viewing and sign-off, deletion of raw files, confirmation that the GPU has been released, and a record of the seeds and prompts so that the video can be re-rendered later.

<Figure src={stages} alt="Seven stages left to right: Script, Scene, Dialogue, Video, Stitching, Sound + music, Cleanup. Scene, Video and Sound + music are highlighted as the paid stages." caption="The seven stages. The highlighted stages incur costs." />

The order is deliberate: words, then stills, then video, then the cut, then sound. Before any work reaches a GPU, the script, the visual style and every line of dialogue have already been approved.

## How the stages support consistency

Most of the stages exist, at least in part, to maintain consistency within a video:

- **The continuity sheet**, written during the Script stage, records the elements that must remain constant throughout the video, such as characters, setting and time of day. Every subsequent prompt is written against it.
- **Reference images and storyboard stills**, produced during the Scene stage, establish the appearance of each character and scene while changes remain inexpensive. The video model then works from these references rather than from a text description alone.
- **Finalizing the dialogue** before rendering ensures that clips are generated once, for the final lines, rather than repeatedly as the script evolves.
- **Recording seeds and prompts** during the Cleanup stage allows a video, or an individual shot within it, to be reproduced exactly rather than approximated.

None of these measures guarantees a consistent result, and later parts describe several cases in which they proved insufficient. They do, however, ensure that each source of inconsistency has a defined point in the process at which it can be identified.

## Making the process accessible to others

The second objective was a process that does not depend on me. Several rules exist primarily for this purpose:

- The agent must **state its current stage** at the beginning of every reply, so that anyone reading the conversation knows the status of the video.
- It may **not skip or reorder stages** without approval, so that every video follows the same path regardless of who is directing it.
- It must **present the cost as an itemized list before incurring any expense**, so that a new user cannot spend money unknowingly.

Each tool is also assigned a single, clearly defined responsibility, which makes it straightforward to explain where each part of the work takes place:

- **Video, including on-camera speech:** the open LTX-2.5 model in ComfyUI, on a GPU rented by the hour from RunPod.
- **Images, voiceover, music and sound effects:** Higgsfield, a hosted service that charges in credits.
- **The cut:** ffmpeg.

Hosted video models remain available as an optional "premium" choice for individual shots, for flexibility. The repository contains documentation, configuration files, ComfyUI workflows and scripts, and **never media**; renders are stored locally and excluded from version control.

## Why the rules live in a file

The most significant decision for onboarding was to place all of these rules in a single instruction file, `AGENTS.md`, accompanied by a set of "skills" (shorter instruction files for specific tasks). Every agent session reads the same file, so its behavior remains consistent regardless of whether it is Claude Code or Codex, when the session takes place, or who is giving the instructions.

The file therefore serves as the onboarding guide: a new user does not need to learn the workflow before beginning, because the agent already follows it. It also allows the rules to be _tested_, which is discussed in more detail in Part 4.

_Next up: [Part 3, Prompting images](./part-3-prompting-images)._
