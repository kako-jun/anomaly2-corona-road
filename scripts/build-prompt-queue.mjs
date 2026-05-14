#!/usr/bin/env node
// Build prompts/queue/index.html from prompts/anomalies.yaml + base-template.md
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const yamlPath = join(root, "prompts", "anomalies.yaml");
const outPath = join(root, "prompts", "queue", "index.html");

const ANOMALY_HINTS = {
  add_object: "Add a new object to the scene",
  remove_object: "Remove an existing object cleanly, inpaint background",
  add_person: "Add a human figure",
  add_creature: "Add a non-human creature",
  state_change: "Change the state of an existing element",
  duplicate: "Duplicate an existing element so it appears twice",
  multiply: "Increase the count of an element abnormally",
  displace: "Move an existing element to an unnatural position",
  color_shift: "Shift the color of a specific region only",
  text_change: "Change text on a sign or display",
  surreal: "Apply a reality-breaking distortion",
  reflection: "Create an anomalous reflection or shadow",
};

function unquote(s) {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// Minimal parser for the fixed shape: `anomalies:` list of mappings, 2-space indent.
function parseAnomalies(yaml) {
  const items = [];
  let cur = null;
  let inList = false;
  for (const raw of yaml.split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, "");
    if (!line || line.trim().startsWith("#")) continue;
    if (line === "anomalies:") {
      inList = true;
      continue;
    }
    if (!inList) continue;
    const itemStart = line.match(/^  - ([a-zA-Z0-9_]+):\s*(.*)$/);
    if (itemStart) {
      if (cur) items.push(cur);
      cur = {};
      cur[itemStart[1]] = unquote(itemStart[2]);
      continue;
    }
    const prop = line.match(/^    ([a-zA-Z0-9_]+):\s*(.*)$/);
    if (prop && cur) {
      cur[prop[1]] = unquote(prop[2]);
    }
  }
  if (cur) items.push(cur);
  return items;
}

function buildPrompt(a) {
  const hint = ANOMALY_HINTS[a.anomaly_type] || a.anomaly_type;
  return `Edit the attached surveillance camera photo.

Make ONLY this single change:
- ${hint}: ${a.detail}
- Location in frame: ${a.location}

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
- the change should be subtle enough that a casual viewer might miss it`;
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderRow(a, i) {
  const prompt = buildPrompt(a);
  return `      <tr>
        <td class="num">${i + 1}</td>
        <td class="id">${esc(a.id)}</td>
        <td><code>${esc(a.base_photo)}</code></td>
        <td class="kind">${esc(a.category || "")} / ${esc(a.anomaly_type || "")}${a.phase ? ` / ${esc(a.phase)}` : ""}</td>
        <td>${esc(a.location)}</td>
        <td>${esc(a.detail)}</td>
        <td><button data-prompt="${esc(prompt)}">Copy</button></td>
      </tr>`;
}

function renderHtml(items) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>corona-road anomaly prompt queue</title>
  <style>
    :root { color-scheme: dark; --bg:#0b0d10; --panel:#151922; --line:#2a3140; --text:#f5f7fb; --muted:#a8b0bf; --accent:#67e8f9; --ok:#86efac; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); }
    header { position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; border-bottom: 1px solid var(--line); background: rgba(11,13,16,0.94); backdrop-filter: blur(10px); }
    h1 { margin: 0; font-size: 18px; font-weight: 700; }
    .summary { color: var(--muted); font-size: 13px; }
    main { padding: 20px; }
    table { width: 100%; border-collapse: collapse; overflow: hidden; border: 1px solid var(--line); border-radius: 8px; background: var(--panel); }
    th, td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; font-size: 13px; }
    th { color: var(--muted); font-size: 11px; font-weight: 700; text-transform: uppercase; background: #10141c; }
    tr:last-child td { border-bottom: 0; }
    .num { width: 40px; color: var(--muted); font-variant-numeric: tabular-nums; }
    .id { font-family: ui-monospace, Menlo, Consolas, monospace; }
    .kind { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; }
    code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11px; color: var(--accent); }
    button { min-width: 72px; padding: 6px 10px; border: 1px solid var(--line); border-radius: 6px; color: var(--text); background: #202838; font: inherit; cursor: pointer; }
    button:hover { border-color: var(--accent); }
    button.copied { border-color: var(--ok); color: #052e16; background: var(--ok); }
  </style>
</head>
<body>
  <header>
    <h1>corona-road anomaly prompts</h1>
    <div class="summary">${items.length} items / paste into ChatGPT with the base photo attached</div>
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th class="num">#</th>
          <th>id</th>
          <th>base photo</th>
          <th>kind</th>
          <th>location</th>
          <th>detail</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
${items.map(renderRow).join("\n")}
      </tbody>
    </table>
  </main>
  <script>
    document.querySelectorAll("button[data-prompt]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.prompt);
          btn.classList.add("copied");
          const orig = btn.textContent;
          btn.textContent = "Copied";
          setTimeout(() => { btn.classList.remove("copied"); btn.textContent = orig; }, 1200);
        } catch (e) { alert("Copy failed: " + e); }
      });
    });
  </script>
</body>
</html>
`;
}

const yaml = readFileSync(yamlPath, "utf8");
const items = parseAnomalies(yaml);
writeFileSync(outPath, renderHtml(items));
console.log(`wrote ${outPath} (${items.length} items)`);
