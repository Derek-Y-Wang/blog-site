---
title: "Building shot-loop, Part 2: Idle pods are the real bill"
date: 2026-11-16
series: Building shot-loop
part: 2
description: What the experiments actually cost, why hosted video is an opt-in, and the spending rules that came out of it.
---

<script>
	import MediaPlaceholder from '$lib/MediaPlaceholder.svelte';
</script>

_Part 2 of 5 · Previous: [Letting a coding agent run a video pipeline](./part-1-building-shot-loop) · Next: [Talking dogs and burned-in subtitles](./part-3-talking-dogs)_

When I started, I assumed the expensive part of AI video would be the generation itself. It mostly isn't. The expensive part is a GPU sitting there, billing by the second, while nothing happens.

All figures here are from my experiment logs between November 13 and 16, 2026. They're "about" numbers, and the Higgsfield credit prices are what I pay when I top up.

## The first run, by the minute

Part 1's sofa review cost about $0.40. Here's where the time went:

| Step | Time |
| --- | --- |
| Script, reference image, voiceover | ~4 min |
| Waiting on me (token, choosing a GPU) | ~12 min |
| Pod boot, failed downloads, restart | ~8 min |
| Rendering five clips | ~14 min |
| Review and stitch | ~2 min |
| **Total** | **~34 min** |

<MediaPlaceholder id="P2-a" caption="Where the 34 minutes went." shows="a simple horizontal bar of the table above, with the GPU-billing minutes marked." />

Only about 14 of those minutes were the GPU doing the thing I rented it for.

## Experiment 3: when the plan said $0.70

The third experiment was bigger: 12 clips on the pod plus narration. The plan said about **$0.70**. It cost about **$2.10**.

- Pod, about 2.7 hours at $0.59/hr: about $1.60 (the plan said about $0.50, and about $1.10 of it was idle)
- Narration, first pass (7 jobs): 4.2 credits
- Narration, regenerating 4 lines: 1.8 credits
- Narration, changing to another voice, 6 lines: 2.7 credits
- Higgsfield total: 8.7 credits, about $0.46 to $0.51

The pod cost three times the plan for two boring reasons. My local network went down for about two hours while the pod sat there billing. And the pod took about 9.5 minutes to boot instead of the 3.5 I'd seen before.

<MediaPlaceholder id="P2-b" caption="Experiment 3, plan vs. actual." shows="two stacked bars, planned ~$0.70 vs. actual ~$2.10, split into active pod, idle pod and voice." />

None of that was the model's fault. It was all overhead.

## Hosted video costs about 10x more

In experiment 2 I tried two clips from a hosted video model through Higgsfield instead of running LTX myself: a 5-second clip for 8.75 credits and a 6-second clip for 10.50 credits. That experiment came to about $1.50 total.

For comparison, an A40 on RunPod works out to roughly **$0.004 per second of finished video** in GPU time, since a 5-second clip takes about 2 minutes to render. The hosted clips came out at roughly **10 times** that per second.

Hosted models are nicer in places, but not ten-times nicer for a talking dog. So the repo now plans **every shot on LTX by default**. Hosted video is offered as an opt-in per shot, always with the price shown next to it.

## Put boot and idle time in the estimate

The estimates that went wrong all left out the same things. Here's what I use now:

- A fresh pod takes about **3.5 to 9.5 minutes** to be ready.
- A 5-second clip takes about **2 minutes** on an A40.
- Whatever time I spend reviewing while the pod is up is billed too.

An estimate that's just "number of clips × render time" will always come in low.

## The money rules

These are all written into the agent's instructions now:

- **Prices are always shown as bullets**: credits and dollars for Higgsfield, pod time and dollars for RunPod.
- **The agent asks before spending.** No exceptions, including redos.
- **Pods are deleted after a batch.** The one exception is image pods, which stay up until I've approved every image I want, because rebooting for one more image costs more than waiting.
- **Costs are estimated from uptime.** RunPod's billing API lagged behind after I deleted a pod, so the agent can't rely on it for the final number.

That last one surprised me. I expected billing to be the one thing I could trust in real time.

_Next up: [Part 3, Talking dogs and burned-in subtitles](./part-3-talking-dogs)._
