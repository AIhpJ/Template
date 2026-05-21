# Snake Project Working Agreement

This repository contains a small browser Snake game prototype plus a quicksort smoke-test file.

## Project Snapshot

- Project name: `Snake Sprint`
- Current state: browser-playable v1 prototype
- Main files:
  - `index.html`: game shell and HUD
  - `styles.css`: layout and visual styling
  - `script.mjs`: browser loop, rendering, input wiring
  - `snake-core.mjs`: game state and rules
  - `snake.test.mjs`: basic logic tests
  - `quicksort.py`: separate Git/connectivity smoke test

## What Is Already Done

- Keyboard controls: arrow keys and WASD
- Mobile tap controls
- Score, best score, pause/resume, restart
- Speed ramps up as score increases
- Overlay states for ready, paused, and game over
- Core game logic separated from rendering for easier testing

## Near-Term Plan

1. Polish the play experience: start/end flows, feedback, small UX fixes
2. Add persistence: local best score or leaderboard storage
3. Expand test coverage for movement, collisions, scoring, and restart flows
4. Package and publish a cleaner playable version

## Agent Workflow

When any agent works in this repo:

1. Read `skills/snake-project-context/SKILL.md` first if the task touches the Snake project
2. Preserve the current architecture split between UI (`script.mjs`) and rules (`snake-core.mjs`)
3. Prefer small, reviewable commits grouped by feature
4. Before claiming work is done, run the relevant checks:
   - `python3 quicksort.py`
   - `node snake.test.mjs`
5. If pushing to Git is requested:
   - check `git status`
   - commit with a clear message
   - push the current branch or `main` only after confirming credentials work

## Coordination Notes

- Frontend agents should focus on layout, controls, and player feel
- Test agents should extend `snake.test.mjs` and verify regression coverage
- General agents should keep README, planning context, and delivery notes aligned
- If a task changes scope or roadmap, update this file and the shared skill together
