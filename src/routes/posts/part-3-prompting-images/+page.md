---
title: "Building shot-loop, Part 3: Prompting images, positive wording and guardrails"
date: 2026-11-11
series: Building shot-loop
part: 3
description: A prompt format borrowed from presets, why "no" doesn't work at CFG 1, what a longer project taught me about continuity, and the rules I won't bend.
---

<script>
	import Figure from '$lib/Figure.svelte';
	import sheet from '$lib/media/character-sheet.jpg';
	import lampSheet from '$lib/media/lamplighter-sheet.jpg';
	import lampWhale from '$lib/media/lamplighter-whale.jpg';
	import lampDirection from '$lib/media/lamplighter-direction.jpg';
	import lampLamps from '$lib/media/lamplighter-lamps.jpg';
	import lampBridges from '$lib/media/lamplighter-bridges.jpg';
	import clipS07 from '$lib/media/lamplighter-s07-compare.mp4';
	import clipS10 from '$lib/media/lamplighter-s10-compare.mp4';
	import film from '$lib/media/the-lamplighter.mp4';
	import filmStill from '$lib/media/the-lamplighter-still.jpg';
</script>

_Part 3 of 4 · Previous: [Quality, workflows and rules](./part-2-designing-the-workflow) · Next: [Working with agents as a team](./part-4-agents-as-a-team)_

Video receives most of the attention, but most of the stages in shot-loop rely on images: references, storyboard stills, first frames. As a result, I spent considerable time on how to write image prompts. The later sections extend the same lessons to video prompts, using a longer project as the example.

## A second workflow: Qwen-Image

Alongside the video pipeline, there is a second workflow that runs **Qwen-Image 2.1** on RunPod. I use it for standalone high-resolution images, and for content the hosted image models sometimes refuse even when it's harmless.

Qwen taught an early lesson: it runs at **CFG 1**, which means a negative prompt has no effect. "No bag" does not remove the bag; the prompt must instead describe what you _do_ want:

| Instead of… | Write… |
| --- | --- |
| "no bag" | "empty hands" |
| "no text, no watermark" | "a clean unmarked image" |
| "no other people" | "with only the dog" |

## A prompt format with a fixed order

The prompt structure is adapted from the way Higgsfield writes its own presets. Every prompt fills the same slots in the same order:

1. Role and framing
2. Subject
3. Placement and surface
4. Light
5. Camera
6. Realism
7. A "preserve" sentence, when a reference image is used
8. A short quality tail
9. Exclusions (as a short negative tail on Higgsfield, or as positive wording on Qwen)

The following is an example for a pet reference image:

```text
Square reference portrait of a golden retriever, head and shoulders centered
in the frame, cream-colored coat, dark brown eyes, dark nose, soft floppy ears,
sitting on a plain neutral living-room floor with an empty softly blurred
background, soft window light from the left with a gentle shadow, eye-level
camera, 85 mm look, shallow depth of field, visible fine fur texture with
natural asymmetry, unretouched natural photography, sharp focus, 4K, a clean
unmarked image with only the dog.
```

A fixed order may seem rigid, but it makes prompts easy to compare and ensures the agent always describes the light and the camera.

## Character sheets

For characters that show up across a whole video, I generate a **character sheet**: a portrait on one side, the full body on the other. The video model only sees one reference, but the sheet gives me (and the agent writing later prompts) everything about how the character looks.

<Figure src={sheet} alt="A character sheet for a fictional woman in an olive jacket: full body on the left, a large portrait on the right." caption="A character sheet: full body on one side, portrait on the other." />

## Wording lessons

Several lessons I learned only through mistakes:

- **"Chest-up" comes out waist-up.** If you want a tight portrait, say "head and shoulders filling the frame."
- **Name every distinctive part of an outfit**, or the model drops it. If the jacket has a patch on the sleeve, the prompt has to say so.
- **"Sheen" and glitter make skin look oily.** Leave them out of anything near a face.


## Lessons from a longer project: The Lamplighter

The lessons above came mostly from short tests. To see how they held up over a longer video, I made **The Lamplighter**: an 89.5-second, silent fable in a handmade claymation style, in which a tiny lamplighter carries the fallen moon up an endless staircase, rides a cloud-whale to a city in the clouds, and returns the moon to the sky. It consisted of 12 clips of up to 10 seconds each, built from 5 reference images and 13 keyframes, with a single music-box track at the end. The images for this project were made with Higgsfield's image model rather than Qwen.

The main finding was that **visual style was not the difficulty; continuity of state was.** A consistent look was straightforward to maintain. Keeping track of which way the character was facing, which lamps were lit, and which props were present from one shot to the next was not.

### Shared text blocks

Every keyframe prompt reused the same blocks of text, pasted in unchanged: a style block (for example, "handmade stop-motion claymation, matte plasticine and felt, visible fingerprints, miniature cardboard, felt and painted-plaster set"), the character's description, the description of the key prop, a clause stating what must be kept, and a negative block. The wording was copied verbatim from the continuity sheet rather than paraphrased for each shot. This kept the look consistent across all 13 keyframes.

<Figure src={lampSheet} alt="A claymation character sheet of the lamplighter: a close-up of his face on the left, his full figure with a lantern pole on the right." caption="The reference sheet: one approved image the lamplighter is copied from in every shot." maxWidth="36rem" />

### References for things that must match exactly

Earlier images can be passed to Higgsfield as references (up to four at no additional cost), so nothing needs to be uploaded again. For an object that had to look identical across shots, such as the whale or the moon, using the previous shot's keyframe as a reference resolved a mismatch between two clips. References alone, however, did not keep direction or lighting consistent; those needed explicit wording or a corrected keyframe.

<Figure src={lampWhale} alt="Two keyframes of the lamplighter riding a whale above the clouds. On the left the whale is small and differently shaped; on the right it matches the whale from the previous shot." caption="Left: rejected, the whale does not match the previous shot. Right: approved, made with the previous keyframe as a reference." maxWidth="30rem" />

### The still determines the motion

The direction of movement in a clip follows the composition of its keyframe. If the staircase in the still rises to the left, the character climbs to the left. Several keyframes had the character facing or climbing the wrong way, and I noticed this only when viewing them at full size, not on a contact sheet. In future, keyframes should be reviewed full-size, in story order, with a short note next to each stating which way the character is facing and moving.

Framing was also more reliable when described by what ends up in the frame, for example "camera in front and slightly above, stairs rising away", rather than by abstract directions. The corrections that worked were all of this kind: a front-and-above camera, a strict profile view, the whale facing right.

<Figure src={lampDirection} alt="Two keyframes of the lamplighter on a staircase. On the left he faces the camera; on the right he is seen in profile, climbing." caption="Left: rejected, he faces the camera rather than the climb. Right: approved, a strict profile view with the stairs rising ahead of him." maxWidth="30rem" />

### Words that change the scene

Several failures came from individual words being interpreted too literally:

- **A material word can become the material.** Describing the clouds as a "silver sea" turned them into water. Rewording to "solid fluffy cloud tops, never water" resolved it.
- **An action described in the prompt can leak into the still.** A prompt that mentioned the lamps going out produced a keyframe with the lamps lit. The action was removed and the still regenerated in darkness.
- **One main action per shot.** Chaining several actions in a single 10-second clip caused the moon to distort.
- **Persistent props must be stated as persistent.** Unless the prompt says, for example, "the moon stays tied to his back, the lantern burns the whole time", a prop can disappear partway through a clip.

<Figure src={lampLamps} alt="Two keyframes of the lamplighter on a pier at night. On the left a street lamp is lit; on the right every lamp is dark." caption="The prompt said the lamps go out, but the first still already had one lit (left). The fix was a dark still and removing the action (right)." maxWidth="30rem" />

### Prompting the clips

Each clip was rendered with LTX on a rented GPU in image-to-video mode, with the approved keyframe as the first frame. The video prompts followed a fixed order of their own:

1. The action, written as one short sequence
2. The camera
3. A "Sound:" line
4. A fixed tail, identical on every clip: the claymation look, slightly stepped movement, and "Nobody speaks. No on-screen text, no subtitles, no captions, no watermarks, no logos."

Alongside each prompt, the agent also wrote one line describing what the viewer should see in the finished clip. This gave me a stated intent to judge each render against, rather than relying on my memory of the plan.

Clips of 10 seconds ran without difficulty on a 32 GB card, taking about 2 minutes each when rendered alone and 2.5 to 3.5 minutes when queued. Each clip comes with its own audio track; some were nearly silent, which the agent measured rather than assumed. The only sound added afterwards was the music-box track at the end, and sound effects were deliberately left out.

### Bridge keyframes

The most effective fix for abrupt jumps between scenes was an additional "bridge" keyframe showing the moment in between: the character pulling the moon from the sea, or stepping from the top of the stairs onto the whale. In future projects, I intend to add one wherever the location or the state of the scene changes.

<Figure src={lampBridges} alt="Two bridge keyframes: the lamplighter lifting the glowing moon out of the sea, and the lamplighter stepping from the top of the stairs onto the whale." caption="Two bridge stills: pulling the moon from the sea, and stepping from the top stair onto the whale." maxWidth="30rem" />

### What was regenerated, and why

Roughly eight of the clips were regenerated at least once. Every redo used a new random seed, and I saw the exact revised prompt before it was rendered. The main cases were:

- **The lamps (shot 2).** A lamp remained lit in the keyframe while the prompt described the lamps going out. The keyframe was regenerated in darkness and the action removed from the prompt.
- **The sea of clouds (shot 6).** "Silver sea" turned the clouds into water, and was replaced with "solid fluffy cloud tops, never water". The shot was later rewritten as the whale taking off.
- **The vanishing props (shot 7).** The moon and the lantern disappeared partway through the clip. The prompt was changed to state that both remain present for the whole shot, and a new keyframe reused the whale from the previous clip as a reference. This shot needed two regenerations.
- **The city (shot 8).** The keyframe was replaced, changing a city of lanterns into a city in the clouds where the lamplighter is welcomed, and the clip was rendered again.
- **The moon (shot 10).** A sequence of three actions made the moon contort. Simplified to "he sets it on the pedestal, it floats up", it was approved.
- **The ending (shot 12).** The character winked, when the intention was simply a child waving at the moon. It was rendered again with the simpler action.

One shot (shot 11) was cut entirely, with the moon now rising at the end of shot 10, and two bridge clips were added: pulling the moon from the sea, and the whale scene split into stepping on and taking off, then arriving at a platform.

The pattern is consistent: almost every regeneration was caused by continuity (what is lit, which way the character faces, which props persist) or by wording (a word turning into a different material), and almost none by style or image quality.

<Figure src={clipS07} video caption="Shot 7. Left: the moon and lantern vanish partway through. Right: after the prompt states that both stay for the whole shot." maxWidth="36rem" />

<Figure src={clipS10} video caption="Shot 10. Left: chained actions, and the moon contorts. Right: one action, and the moon floats up." maxWidth="36rem" />

### Cost of the review

I approved every reference, every keyframe and every clip. About five keyframes were rejected and regenerated, and several clips were re-rendered with new seeds. The full project cost approximately **$1.57**: about $0.48 in Higgsfield credits (of which roughly a third went on the replaced keyframes, and a further share on the music) and about $1.09 for the GPU. A run with no rejected keyframes would, by my estimate, have cost about $1.20. Reviewing every stage takes time, but it caught the direction and state errors before any of them reached a rendered clip.

## Guardrails

Some rules are not about quality at all. They are written down so that no agent session ever has to make a judgment call on them:

- **Characters in swimwear or any revealing outfit are always written as clearly adult.** The prompt card states age 25, and this is shown visibly, never added silently.
- **Images judged explicit never get uploaded** to a hosted service. They stay on my machine.
- **Prompts and costs are shown before anything is generated.** Same rule as everywhere else in the pipeline.

The agent is very good at following rules like these. It is much less reliable at inventing them on the spot, which is why they are kept in a file rather than in my head.

## The finished film

For completeness, this is the finished film, with the clips' own sound and the music-box track at the end.

<Figure src={film} video poster={filmStill} muted={false} loop={false} caption="'The Lamplighter' (89.5 seconds, with sound)." maxWidth="15rem" maxHeight="30rem" />

_Next up: [Part 4, Working with agents as a team](./part-4-agents-as-a-team)._
