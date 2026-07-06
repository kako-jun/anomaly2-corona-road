# Base Template (GPT Image 2)

ChatGPT に **元写真を添付した上で** 以下のテンプレを貼る。
`{location}` `{detail}` `{anomaly_type_hint}` を差し替える。

## 共通テンプレ（add系・state_change系すべて）

```
Edit the attached surveillance camera photo.

Make ONLY this single change:
- {anomaly_type_hint}: {detail}
- Location in frame: {location}

CRITICAL — keep everything else PIXEL-IDENTICAL to the source image:
- camera angle, framing, lens distortion, aspect ratio
- all existing buildings, signs, walls, floor, ceiling, fixtures
- lighting color temperature, shadows, highlights, time of day
- film grain, JPEG compression artifacts, low-fi surveillance look
- people, objects, and text that already exist in the photo

Do not regenerate or redraw the scene. Only inject the specified anomaly.

Output style:
- photo-realistic
- matches the original's surveillance camera aesthetic exactly
- same resolution as input
- the change should be subtle enough that a casual viewer might miss it
  (unless detail explicitly says "obvious")
```

## 実在看板の差し替えテンプレ

公開用素材を作るときは、異変を足す前にこのテンプレで実在の店名・看板を架空名に差し替える。

```
Edit the attached surveillance camera photo.

Make ONLY this single change:
- Replace the real store name/sign text at {location} with this fictional text: "{fictional_text}"

CRITICAL — keep everything else PIXEL-IDENTICAL to the source image:
- camera angle, framing, lens distortion, aspect ratio
- sign size, perspective, material, wear, dirt, lighting, shadows, and reflections
- all surrounding buildings, walls, floor, ceiling, fixtures, and other signs
- film grain, JPEG compression artifacts, low-fi surveillance look

Do not redesign the sign. Do not add a new sign. Only replace the visible real-world text.
The replacement text must look printed/painted on the original sign, matching the original perspective and age.

Output style:
- photo-realistic
- matches the original's surveillance camera aesthetic exactly
- same resolution as input
```

## anomaly_type 別ヒント（テンプレ内 `{anomaly_type_hint}` 用）

| type            | hint文                                                |
| --------------- | ----------------------------------------------------- |
| `add_object`    | Add a new object to the scene                         |
| `remove_object` | Remove an existing object cleanly, inpaint background |
| `add_person`    | Add a human figure                                    |
| `add_creature`  | Add a non-human creature                              |
| `state_change`  | Change the state of an existing element               |
| `duplicate`     | Duplicate an existing element so it appears twice     |
| `multiply`      | Increase the count of an element abnormally           |
| `displace`      | Move an existing element to an unnatural position     |
| `color_shift`   | Shift the color of a specific region only             |
| `text_change`   | Change text on a sign or display                      |
| `surreal`       | Apply a reality-breaking distortion                   |
| `reflection`    | Create an anomalous reflection or shadow              |
