export const GRID_SIZE = 16;
export const INITIAL_DIRECTION = "right";
const BASE_TICK_MS = 180;
const MIN_TICK_MS = 70;
const TICK_STEP_MS = 8;

const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function positionsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

function randomFreeCell(snake, random = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const free = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        free.push({ x, y });
      }
    }
  }

  if (free.length === 0) {
    return null;
  }

  const index = Math.floor(random() * free.length);
  return free[index];
}

function nextDirection(currentDirection, requestedDirection) {
  if (!requestedDirection || requestedDirection === currentDirection) {
    return currentDirection;
  }

  const current = DIRECTION_VECTORS[currentDirection];
  const requested = DIRECTION_VECTORS[requestedDirection];
  if (current.x + requested.x === 0 && current.y + requested.y === 0) {
    return currentDirection;
  }

  return requestedDirection;
}

export function createGame(random = Math.random) {
  const snake = [
    { x: 5, y: 8 },
    { x: 4, y: 8 },
    { x: 3, y: 8 },
  ];
  const food = randomFreeCell(snake, random);

  return {
    snake,
    direction: INITIAL_DIRECTION,
    pendingDirection: INITIAL_DIRECTION,
    food,
    score: 0,
    bestScore: 0,
    speedLevel: 1,
    tickMs: BASE_TICK_MS,
    paused: true,
    gameOver: false,
    won: false,
  };
}

export function queueDirection(state, requestedDirection) {
  state.pendingDirection = nextDirection(state.direction, requestedDirection);
  return state;
}

export function restartGame(state, random = Math.random) {
  const fresh = createGame(random);
  fresh.bestScore = Math.max(state.bestScore ?? 0, state.score ?? 0);
  return fresh;
}

export function togglePause(state) {
  if (state.gameOver) {
    return state;
  }
  state.paused = !state.paused;
  return state;
}

export function stepGame(state, random = Math.random) {
  if (state.paused || state.gameOver) {
    return state;
  }

  state.direction = nextDirection(state.direction, state.pendingDirection);
  const vector = DIRECTION_VECTORS[state.direction];
  const head = state.snake[0];
  const nextHead = { x: head.x + vector.x, y: head.y + vector.y };

  const hitsWall =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= GRID_SIZE ||
    nextHead.y >= GRID_SIZE;
  const hitsSelf = state.snake.some((segment) => positionsEqual(segment, nextHead));

  if (hitsWall || hitsSelf) {
    state.paused = true;
    state.gameOver = true;
    state.bestScore = Math.max(state.bestScore, state.score);
    return state;
  }

  state.snake.unshift(nextHead);

  if (state.food && positionsEqual(nextHead, state.food)) {
    state.score += 1;
    state.bestScore = Math.max(state.bestScore, state.score);
    state.speedLevel = 1 + Math.floor(state.score / 3);
    state.tickMs = Math.max(MIN_TICK_MS, BASE_TICK_MS - state.score * TICK_STEP_MS);
    state.food = randomFreeCell(state.snake, random);

    if (!state.food) {
      state.paused = true;
      state.gameOver = true;
      state.won = true;
    }
  } else {
    state.snake.pop();
  }

  return state;
}
