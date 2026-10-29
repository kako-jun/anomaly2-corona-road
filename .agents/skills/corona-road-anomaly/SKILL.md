---
name: corona-road-anomaly
description: 'Plan and produce a visual anomaly for Anomaly²: Corona Road by resolving stable camera-element IDs and compositing only the chosen change area into its processed baseline.'
---

# Corona Road anomaly creation

Use this skill when planning or producing an image-based anomaly for this game. The goal is a repeatable record from idea through review, with the existing camera photo remaining the authoritative background.

## References

- Read [`prompts/camera-element-inventory.md`](../../../prompts/camera-element-inventory.md) for the single source of truth for camera photos, visible elements, stable IDs, and approximate bounds.
- Open the matching `prompts/atlas/camNN.svg` for a visual index of those IDs; regenerate maps with `npm run build:camera-atlas` after changing the inventory.
- Read [`prompts/anomaly-catalog.md`](../../../prompts/anomaly-catalog.md) for candidate types and phase balance.
- Read [`prompts/candidate-pool.md`](../../../prompts/candidate-pool.md) for photo-specific unselected ideas; remove a selected row when promoting it into `anomalies.yaml`.
- Follow [`prompts/README.md`](../../../prompts/README.md) and [`prompts/base-template.md`](../../../prompts/base-template.md) for prompt conventions.
- The current game camera mapping is in `src/utils/gameConfig.ts`; the WebP exports are in `public/images/`.

## Workflow

1. **Resolve the referenced object.** When the user names a stable element ID, use that exact entry. When they describe an object naturally (for example, “the pink pot by the right wall”), match it against the inventory's camera, reading-order description, and coordinates. State the matched camera/element ID and bounds before production. If two entries still fit, ask which one rather than guessing. The inventory is the only source for element descriptions and coordinates; do not create duplicate descriptions elsewhere.
2. **Inspect the whole frame before ideation.** Sweep the image in reading order: top to bottom, and within each horizontal band left to right. Check the element inventory against the actual frame, including objects, surfaces, fixtures, sign/text, openings, lights, shadows, reflections, and notable empty/dark areas. Record uncertain readings as uncertain rather than guessing. The camera's game label may not match the photographed scene. Build ideas only from visible affordances. Mark unsupported ideas as runtime/hybrid instead of forcing them into the photo.
3. **Define one anomaly.** Record a stable anomaly ID, source baseline, camera ID, element ID, category, anomaly type, phase, intended subtlety, exact changed element, and short rationale. Do not combine unrelated changes in one generation.
4. **Specify location reproducibly.** Use the selected element's normalized coordinates `(x,y)` from 0 to 1000, origin at top left. Refine its box around the actual object at full resolution. Record the element ID and final mask/box in the anomaly entry; do not copy the element's description into a second inventory. A polygon or hand-painted mask is preferred for irregular objects.
5. **Generate a proposal.** Attach the baseline and ask for only the defined change. Tell the image model to preserve framing, perspective, lighting, texture, grain, compression, and every other object. Treat the result as a source layer, never as the finished full frame.
6. **Composite into the baseline.** Align the generated layer to the baseline without resizing or warping the baseline. Build a mask that covers the changed object and its immediate contact shadow/reflection when needed. Use a softly feathered, semi-transparent gradient transition around that mask so the insertion blends into the surveillance image. Keep mask alpha exactly zero outside the documented transition boundary. Do not apply global color correction to the baseline.
7. **Review the result.** Compare baseline and composite at the same dimensions. Inspect a blink/A-B view and a difference image. Confirm that every changed pixel lies inside the documented mask/transition envelope; confirm no unrelated object, sign, camera framing, or overlay changed. If the changed region is too large to blend without collateral edits, regenerate or edit the local region manually.
8. **Register only after review.** Save the final image as a variant, preserve the baseline and generated source separately, and update the anomaly record with the selected element ID, final mask/box, paths, dimensions, and review status. Keep runtime-only effects out of the image-variant queue.

## Record fields

For each candidate/variant, maintain:

`id`, `camera_id`, `element_id`, `base_photo`, `mask_box_1000`, `category`, `anomaly_type`, `phase`, `subtlety`, `description`, `generation_prompt`, `generated_source`, `mask`, `composite`, `dimensions`, `review_status`, `notes`.

Use `planned`, `generated`, `composited`, and `reviewed` as distinct states. Never mark an AI-generated full frame as reviewed merely because the requested object looks right.

## Constraints

- The baseline is authoritative. Preserve all pixels outside the documented mask transition envelope.
- The feather is a local edge treatment, not permission for broad transparent overlays or global retouching.
- Check whether readable signage is fictional/public-safe before creating public variants. Keep sign sanitization as its own edit, separate from the anomaly.
- The eight processed `public/images/cam*.webp` files are the complete camera-photo set and the authoritative baselines for anomaly variants.
- Coordinate boxes are normalized so they survive resolution changes. Convert them to pixels only for the selected source dimensions and record those dimensions.
