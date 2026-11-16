# Draft: "Building shot-loop" (5 parts)

Status: **DRAFT, not published.** The posts are wired into the site at `src/routes/posts/<slug>/+page.md` (mdsvex) and show up locally under /blog-site/posts. Nothing is committed or pushed.

## Choices as relayed from the "shot loop dev" session (please confirm)

- Posts written in Markdown via **mdsvex** (installed with your OK on 2026-11-16).
- Tone: casual first person, like the About page.
- **No link** to the shot-loop repo, since it's private.
- Series title "Building shot-loop", in 5 parts.

## Parts

1. [part-1-building-shot-loop.md](../../src/routes/posts/part-1-building-shot-loop/+page.md): why it exists, the 7 stages, the first run
2. [part-2-idle-pods.md](../../src/routes/posts/part-2-idle-pods/+page.md): where the money actually went
3. [part-3-talking-dogs.md](../../src/routes/posts/part-3-talking-dogs/+page.md): speech, sound and weird failures
4. [part-4-prompting-images.md](../../src/routes/posts/part-4-prompting-images/+page.md): image prompts and guardrails
5. [part-5-agents-as-a-team.md](../../src/routes/posts/part-5-agents-as-a-team/+page.md): working with agents

## Media and reference placeholders

Each spot is a `<MediaPlaceholder id="Pn-x" …/>` in the post, shown as a dashed box. To add approved media, swap it for `<Figure src={…} caption="…" />` (images) or `<Figure src={…} video caption="…" />` (short clips). Approve or drop each one. No files have been copied from shot-loop.

| ID | Part | Caption | Shows | Proposed source |
| --- | --- | --- | --- | --- |
| P1-a | 1 | The seven stages | Simple diagram: Script → Scene → Dialogue → Video → Stitching → Sound + music → Cleanup | New diagram (I'd make it as SVG) |
| P1-b | 1 | Milo, our test subject | The fictional golden retriever reference image | shot-loop `photos/milo.png` |
| P1-c | 1 | "Milo Reviews the Sofa" | A still (or a short, compressed clip) from the 31 s first video | shot-loop `renders/final/2026-11-13-milo-sofa-review.mp4` (31 s video, heavy: still or short clip recommended) |
| P2-a | 2 | Where the 34 minutes went | Bar or table of experiment 1's time breakdown | New chart from the cost table |
| P2-b | 2 | Plan vs. actual, experiment 3 | Planned ~$0.7 vs. actual ~$2.1, split into pod (active / idle) and voice | New chart from the cost table |
| P3-a | 3 | Same dog, different voice | Two stills from consecutive clips, or a short audio comparison | Experiment renders (TBD) |
| P3-b | 3 | Subtitles nobody asked for | A frame with LTX's burned-in text, next to the same frame with a caption bar over it | Experiment renders (TBD) |
| P3-c | 3 | Mia, the "day in my life" character | Fictional character reference image | shot-loop `photos/mia.png` |
| P3-d | 3 | Reference mode vs. image-to-video | Side-by-side stills from the two modes | Experiment renders (TBD) |
| P4-a | 4 | A character sheet | Qwen character sheet, portrait left, full body right | shot-loop `renders/raw/images/character-sheet-705.png` (**not yet approved as a final**) |
| P4-b | 4 | "Chest-up" vs. "head and shoulders" | Two crops showing the framing difference | Experiment renders (TBD) |
| P5-a | 5 | Who does what | Diagram of the coordinator / researcher / dev sessions and the user | New diagram |

Text references (example scene card, example image prompt, slot order) are written inline in the drafts and labeled as examples.

## Facts I'd like double-checked

- All dollar figures are "about", as of Nov 2026, from the experiment logs. Higgsfield credit prices are your own top-up prices.
- Voice-change results are described as still pending.
- The test suite is 45 tests, and there are ten skills.
