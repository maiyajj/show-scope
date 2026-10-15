# show-scope

Visualization skills for [Qoder](https://qoder.ai): precise SVG architecture diagrams + visual HTML explainers + hybrid orchestration.

## What's included

| Skill | Description |
|---|---|
| **archify** | Create validated architecture, workflow, sequence, data-flow, lifecycle, ERD, class, tree, timeline, and waterfall diagrams as explorable standalone HTML with inline SVG, dark/light themes, and export. |
| **answer-me-with-html** | Turn answers into one-page visual HTML explainers with multi-panel layouts, flow/sequence/timeline components. |
| **show-scope** | Orchestration layer — auto-selects renderer by content type, supports hybrid pages (am shell + archify iframes with toggle). |

## Install

```bash
npx show-scope
```

Or globally:

```bash
npm install -g show-scope
show-scope
```

This copies the skills to `~/.agents/skills/` and installs archify's dependencies. Restart Qoder after installation.

## Usage

After installation, the skills are available in Qoder:

- `/show-scope` — visual explanations with auto renderer selection
- `/archify` — precise architecture diagrams
- `/answer-me-with-html` — visual HTML explainers

### Hybrid pages

The default output mode is "hybrid page": am shell with archify iframes per panel, toggle between concise view and precise diagram. Features:

- Theme/preset sync across all iframes (change in one, updates all)
- Auto height sync (no internal scrolling)
- Embed mode: click nodes to inspect without zoom

## Update

```bash
npx show-scope
```

Re-running overwrites existing skills with the latest version.

## License

MIT
