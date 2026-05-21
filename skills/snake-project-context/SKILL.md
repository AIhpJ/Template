---
name: snake-project-context
description: Use when working on this repository's Snake Sprint project so every agent follows the same project summary, delivery workflow, current scope, and next-step roadmap.
---

# Snake Project Context

Use this skill for any task related to the Snake game, project planning, Git delivery, agent handoff, or status reporting in this repository.

## Quick Start

1. Read `references/project-brief.md`
2. Confirm the task matches the current Snake Sprint scope
3. Keep changes aligned with the repo workflow below
4. Update the brief if the implemented scope or roadmap changes materially

## Repo Workflow

1. Inspect the working tree with `git status`
2. Make focused edits instead of broad rewrites
3. Keep game rules in `snake-core.mjs` and browser wiring in `script.mjs`
4. Run the relevant checks before handoff:
   - `python3 quicksort.py`
   - `node snake.test.mjs`
5. If the user asks to publish to Git:
   - stage only intended files
   - commit with a clear message
   - push only after credentials are available

## Deliverable Rules

- Report what changed in terms of player-facing behavior and touched files
- Call out anything not yet implemented instead of implying it exists
- If roadmap or process changes, sync `references/project-brief.md` and `AGENTS.md`

## When To Update Shared Context

Update the shared brief when any of these happen:

- a major feature lands
- the project direction changes
- the release plan changes
- new workflow rules are added for all agents
