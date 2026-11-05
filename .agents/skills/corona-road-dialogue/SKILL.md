---
name: corona-road-dialogue
description: 'Write, revise, organize, and review character dialogue for Anomaly²: Corona Road using its canon, dialogue ledger, release conditions, and subtitle rules.'
---

# Corona Road dialogue

Use this skill for dialogue planning, generation, editing, and review. The YAML files in `dialogue/` are the only source of dialogue used by the game.

## Read before writing

- [`docs/story.md`](../../../docs/story.md): character canon, story facts, topics, and unresolved decisions.
- [`dialogue/README.md`](../../../dialogue/README.md): ledger schema, playback behavior, and subtitle rules.
- [`dialogue/flags.yaml`](../../../dialogue/flags.yaml): the source of truth for progress thresholds.
- Check Issues #29 and #82 for approved dialogue decisions and production scope. Check #86 for the child-to-final story beat and #266 for per-entry unlock support.

Do not copy progress counts into notes or issues. Use `npm run dialogue:summary` for the current ledger counts.

## Character voices

- **出河さん** is a 39-year-old detective from Tokyo, posted to Kanazawa. Her emotions show readily: she is easily surprised, openly pleased or frustrated, and can become close to tears. That contrast with her senior role is part of her appeal. Keep her Japanese standard and avoid affected feminine endings such as 「〜だわ」.
- **樫原くん** is a 29-year-old Kanazawa local who never attended school outside the prefecture. With male friends he is chatty and flirtatious. With 出河さん at work he is measured, calm, and usually polite, though his imperfect politeness and casual, flirtatious side sometimes slip out without intention. Do not flatten him into a uniformly detached speaker or make him deliberately pursue her.
- Their attraction stays unspoken. Let it show through timing, attention, and occasional slips rather than declarations or repeated catchphrases.

## Plan each entry before drafting

For every conversation, decide its ledger file, trigger, tone, and release point before writing its lines. Keep the release condition in the dialogue entry or in the central flag ledger; do not maintain a second content inventory.

- Use existing conditions from `dialogue/README.md` and `flags.yaml`. `story.when.flag` triggers a queued story event; it is not a general unlock condition for chatter or openings.
- Check whether Issue #266's per-entry unlock implementation has landed. Until it has, do not imply a post-flag opening/chatter line is gated when the current schema cannot represent that gate. Keep such content out of the live ledger until the schema supports it.
- Use `story.yaml` for event conversations tied to a raised story flag. Leave child-to-final material for the distinct intermediate flag/condition tracked by Issue #86; do not bind it to the current provisional `final` condition.
- `chatter.yaml` is light everyday talk and must not carry anomaly clues. Common `false-report.yaml` entries also contain no hints; reserve small hints for the matching entry in `anomaly-lines.yaml`.
- Match `midpoint.yaml` entries to the `few`, `mid`, or `many` condition without asserting a count the stage does not guarantee. Match `closing.yaml` entries to their exact result.
- Use `tone: serious` only when the content warrants the quiet period; all chatter entries use `tone: light`.

## Draft and review

1. Work in a focused batch with one kind or one story milestone. Read nearby entries first to avoid repeated setups, punchlines, or phrasing.
2. Give each entry a unique kind-prefixed ID, its supported `when` condition, a valid tone, and 2–4 subtitle lines. Do not add unsupported YAML fields.
3. Keep dialogue in natural spoken Japanese. Use the full-width space between phrases; `?`, `!`, and `…` are allowed. Do not use Japanese/ASCII commas or periods, half-width spaces, tabs, or line breaks inside subtitle text. In particular, put a full-width space after `?` or `!` when the sentence continues.
4. Run a separate review pass after drafting. Give an independent reviewer the canon references, changed dialogue, and review criteria without the author's intended interpretation. Check:
   - correct speaker and relationship voice, including occasional unintentional chattiness from 樫原くん;
   - consistency with confirmed canon and no invented backstory or unsupported statistics;
   - the right trigger, release point, tone, and kind-specific hint policy;
   - repeated ideas, overly similar wording, out-of-character flirting, or forced feminine speech;
   - valid IDs, 2–4 lines, and no real product, show, person, or trademark names.
     Resolve concrete continuity, voice, hint, and format findings in one correction pass; do not keep iterating over subjective nits after the acceptance criteria are met.
5. Run `npm run dialogue:summary` to inspect coverage. Before the full build, run `rg -n "text: '[^']* [^']*'" dialogue/*.yaml`; any result indicates a half-width space inside a subtitle and must be fixed at its source. Then run `npm run build`. The dialogue-ledger build check rejects unsupported schema, invalid IDs, punctuation, and half-width spaces. Fix the source entry before continuing; do not leave known format errors for a later batch.
6. Record the completed scope and any remaining decisions on Issue #82, but use the summary script—not issue comments—for counts.
