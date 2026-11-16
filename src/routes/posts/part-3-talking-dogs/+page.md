---
title: "Building shot-loop, Part 3: Talking dogs and burned-in subtitles"
date: 2026-11-08
series: Building shot-loop
part: 3
description: Speech, sound, and the strange ways the video model fails.
---

<script>
	import MediaPlaceholder from '$lib/MediaPlaceholder.svelte';
</script>

_Part 3 of 5 · Previous: [Idle pods are the real bill](./part-2-idle-pods) · Next: [Prompting images](./part-4-prompting-images)_

This is the part where things get weird. Most of what I learned about speech and sound came from the model doing something I didn't ask for, and me then writing a rule so the agent wouldn't be surprised by it again.

## The dog can talk, but not in the same voice twice

LTX can generate speech right inside the video clip. You write the line into the prompt, and the character says it on camera, lip movement included. It costs nothing beyond pod time, which is great.

When I ran Whisper over the clips, the transcripts matched the written lines. The problem is that **every clip gets a different voice.** If Milo talks in clip 2 and again in clip 4, he sounds like two different dogs.

<MediaPlaceholder id="P3-a" caption="Same dog, different voice." shows="stills from two consecutive talking clips, or a short audio comparison." />

So the rules are:

- **One speaker per clip.**
- **Recurring characters get a hosted voiceover** (from Higgsfield) instead of on-camera speech, so they sound the same every time.

## Subtitles nobody asked for

LTX loves burning subtitles into the picture. It does it even when the prompt says "no captions, no text." I tried a stronger "no text" line, and it didn't help.

So the workaround lives in the cut instead of the prompt: during stitching, burned-in text gets covered with caption bars.

<MediaPlaceholder id="P3-b" caption="Subtitles nobody asked for." shows="a frame with LTX's burned-in text next to the same frame after the caption bar covers it." />

## Sound is quiet, and every clip is different

The clip audio from LTX is quiet, almost silent when nobody's speaking, and each clip comes out at a different loudness. Stitch them as-is and the volume jumps around between shots.

Now every clip gets leveled before mixing, and the final cut is normalized to a target loudness.

## The voiceover read the stage direction out loud

Voiceover models let you add delivery tags, little notes like "(whispering)" or "(excited)". In one test, **4 out of 6 lines** came back with the model _saying the tag out loud_ as part of the line.

The fix: keep tags short, and **transcribe every voiceover line** afterwards to check it says what it should. That check is cheap, and it's the only way to catch this without listening to everything yourself.

## One reference per shot

To keep a character looking the same across clips, LTX can take a reference image. But it takes exactly **one** per shot, center-cropped to 512×512. A scene with two characters can't have two references.

For group scenes I ended up generating a single reference image with everyone in it.

<MediaPlaceholder id="P3-c" caption="Mia, a fictional 'day in my life' character." shows="the AI-generated character reference image." />

## Reference mode vs. image-to-video

There are two ways to steer LTX with a picture, and they keep different things:

- **Reference mode** keeps _who_ someone is, but is free to invent a new scene around them.
- **Image-to-video** uses the picture as the first frame, so the scene stays close to it.

In a later test I tried image-to-video on an A40: 5- and 10-second clips at 9:16 and a 5-second clip at 16:9, all with an audio track, in about 17 minutes of pod time for about $0.17.

<MediaPlaceholder id="P3-d" caption="Reference mode vs. image-to-video." shows="side-by-side stills, same reference image, one clip from each mode." />

The speech and lip sync in those clips were judged by me, not the agent, which brings me to the biggest limit of all.

## The agent can't watch the video

The agent can't watch video or listen to audio. It can run Whisper and check loudness numbers, but it can't tell me whether a dog's expression looks skeptical or whether a voice sounds right.

So the rule is simple: **every generated file gets shown to me in the app, and I decide.** The agent does the planning, bookkeeping, rendering and checking. Taste stays with the human.

_Next up: [Part 4, Prompting images: positive wording and guardrails](./part-4-prompting-images)._
