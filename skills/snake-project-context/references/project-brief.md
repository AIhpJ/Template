# Snake Sprint Project Brief

## Vision

Build a clean, lightweight Snake game that is easy to play in the browser, easy for multiple agents to extend, and simple to publish through GitHub.

## Current Build

The current repository already contains a working v1 prototype with:

- a playable board rendered on canvas
- keyboard and mobile controls
- score and best-score display
- pause/resume and restart controls
- increasing speed as the player scores
- separated core rules for easier testing

Primary code locations:

- `index.html`
- `styles.css`
- `script.mjs`
- `snake-core.mjs`
- `snake.test.mjs`

## Delivery Workflow

When shipping work for this repo:

1. Understand the request and compare it with this brief
2. Keep architecture changes small and intentional
3. Validate with the local checks when applicable
4. Be explicit about whether work is only local, committed locally, or pushed remotely
5. Never claim GitHub contains changes unless the push actually succeeded

## Suggested Roadmap

### Phase 1: Prototype stabilization

- tighten game feel
- improve start, pause, and game-over messaging
- expand automated coverage in `snake.test.mjs`

### Phase 2: Product polish

- add better UI states and visual polish
- add local persistence for best score or leaderboard
- improve mobile usability

### Phase 3: Release readiness

- clean README and play instructions
- finalize asset/style consistency
- package a shareable playable version

## Agent Roles

- Frontend: gameplay UX, visuals, responsive layout, controls
- Test: regression coverage, edge cases, smoke checks
- General: planning, repo hygiene, delivery status, context maintenance

## Communication Rules

- Describe the current state accurately
- Distinguish finished work from planned work
- Update this brief whenever the roadmap materially changes
