import assert from "node:assert/strict";
import {
  createGame,
  queueDirection,
  restartGame,
  stepGame,
} from "./snake-core.mjs";

function sequenceRandom(cells) {
  const values = [...cells];
  return () => {
    if (values.length === 0) {
      return 0;
    }
    return values.shift();
  };
}

{
  const state = createGame(() => 0);
  state.paused = false;
  const originalHead = { ...state.snake[0] };
  stepGame(state, () => 0);
  assert.deepEqual(state.snake[0], { x: originalHead.x + 1, y: originalHead.y });
  assert.equal(state.score, 0);
}

{
  const state = createGame(() => 0);
  state.food = { x: 6, y: 8 };
  state.paused = false;
  stepGame(state, sequenceRandom([0]));
  assert.equal(state.score, 1);
  assert.equal(state.snake.length, 4);
  assert.equal(state.bestScore, 1);
}

{
  const state = createGame(() => 0);
  state.paused = false;
  queueDirection(state, "left");
  stepGame(state, () => 0);
  assert.equal(state.direction, "right");
}

{
  const state = createGame(() => 0);
  state.paused = false;
  state.snake = [{ x: 15, y: 8 }];
  stepGame(state, () => 0);
  assert.equal(state.gameOver, true);
  assert.equal(state.paused, true);
}

{
  const state = createGame(() => 0);
  state.bestScore = 3;
  state.score = 5;
  const restarted = restartGame(state, () => 0);
  assert.equal(restarted.bestScore, 5);
  assert.equal(restarted.score, 0);
  assert.equal(restarted.paused, true);
}

console.log("snake tests passed");
