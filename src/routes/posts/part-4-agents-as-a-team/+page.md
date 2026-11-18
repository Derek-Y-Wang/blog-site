---
title: "Building shot-loop, Part 4: Working with agents as a team"
date: 2026-11-15
series: Building shot-loop
part: 4
description: An instruction file, a free test suite, several agent sessions with different responsibilities, and the problems that remain unsolved.
---

<script>
	import Figure from '$lib/Figure.svelte';
	import team from '$lib/media/who-does-what.svg';
</script>

_Part 4 of 4 · Previous: [Prompting images](./part-3-prompting-images)_

The final part of this series is less about video and more about building software with coding agents doing most of the writing. Over approximately four weeks, shot-loop received 17 pull requests.

## One file, ten skills, 45 tests

Everything the agent needs to know is kept in a single instruction file, `AGENTS.md`, together with ten skills: focused instruction files for specific tasks such as running a pod or writing an image prompt.

Because the rules are files, they can be tested. A free test suite of **45 tests** requires no network access and never pays for a generation. Among other things, it checks that:

- the shots files are valid,
- the workflow node ids edited by the runner scripts still exist,
- the deployment configurations are well-formed,
- and no media or secrets have been committed.

The suite has already caught real mistakes. In one case, a workflow node id had changed. Without the test, the runner would have failed silently, and I would have discovered the problem only after paying for a GPU.

## Approval on every scene

Below is an example of the "scene card" the agent presents before rendering a clip. I approve the exact text before anything is sent, and again, with the changes highlighted, before any regeneration:

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

_(This card is an illustrative example written in the repository's format, not a copy from a real run.)_

## Several agents, different responsibilities

Eventually a single agent session was no longer sufficient, so the work is now divided among several sessions, each with one responsibility:

- a **coordinator**, which communicates with me and keeps track of the plan,
- a **researcher**, which reads documentation and verifies how tools behave,
- and a single **developer** session, which makes all code changes, so that two agents never edit the same files.

The sessions coordinate by sending each other messages. The most important rule is that **approval comes only from me.** No agent can approve spending on behalf of another, however the request is phrased.

<Figure src={team} alt="Diagram: Me at the top, with approval arrows down to the coordinator, researcher and dev sessions, which pass messages to each other." caption="Who does what. Approvals come only from me." />

## The bottleneck is me

Approving every stage is what keeps costs low. It is also the reason I cannot publish a video every day: every stage waits for my input, and in the very first run, that waiting accounted for about 12 of the 34 minutes.

The repository contains a written proposal, not yet adopted, to relax this requirement somewhat:

- plan a series of videos together,
- render all of a series' clips in a single pod session,
- and use a lighter review process for B-roll that contains no faces and no speech.

## Open questions and limitations

The main limitations, at the time of writing, are:

- **Taste and direction.** This is the greatest limitation, and the reason I still review every stage. The agent cannot yet reliably judge the quality of what it generates, nor can it direct a scene well. I believe this can be improved, and it is the next step in making the agent a better creative partner.
- **Voice change.** A hosted tool that replaces the speaking voice on a clip was tested at 1 credit per call, but the jobs had not completed at the time of writing, so no results are available yet.
