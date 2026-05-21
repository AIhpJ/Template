import {
  GRID_SIZE,
  createGame,
  queueDirection,
  restartGame,
  stepGame,
  togglePause,
} from "./snake-core.mjs";

const board = document.querySelector("#game-board");
const context = board.getContext("2d");
const scoreLabel = document.querySelector("#score");
const bestScoreLabel = document.querySelector("#best-score");
const speedLabel = document.querySelector("#speed");
const overlay = document.querySelector("#overlay");
const overlayKicker = document.querySelector("#overlay-kicker");
const overlayTitle = document.querySelector("#overlay-title");
const overlayText = document.querySelector("#overlay-text");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const mobileButtons = document.querySelectorAll("[data-direction]");

const CELL_SIZE = board.width / GRID_SIZE;

let state = createGame();
let loopId = null;

function updateHud() {
  scoreLabel.textContent = String(state.score);
  bestScoreLabel.textContent = String(state.bestScore);
  speedLabel.textContent = `${state.speedLevel}x`;
  pauseButton.textContent = state.paused ? "Resume" : "Pause";
}

function updateOverlay() {
  if (state.gameOver) {
    overlay.classList.add("visible");
    overlayKicker.textContent = state.won ? "Perfect run" : "Round over";
    overlayTitle.textContent = state.won ? "Board Cleared" : "Game Over";
    overlayText.textContent = state.won
      ? "You filled the whole arena. Tap restart to run it again."
      : "Press Start / Restart to jump back in.";
    return;
  }

  if (state.paused) {
    overlay.classList.add("visible");
    overlayKicker.textContent = "Breather";
    overlayTitle.textContent = state.score === 0 ? "Press Start" : "Paused";
    overlayText.textContent =
      state.score === 0
        ? "Collect fruit, avoid walls, don't bite yourself."
        : "Press space or the pause button to continue.";
    return;
  }

  overlay.classList.remove("visible");
}

function drawBackground() {
  context.fillStyle = "#08141b";
  context.fillRect(0, 0, board.width, board.height);

  context.strokeStyle = "rgba(255, 255, 255, 0.08)";
  context.lineWidth = 1;
  for (let i = 0; i <= GRID_SIZE; i += 1) {
    const offset = i * CELL_SIZE;
    context.beginPath();
    context.moveTo(offset, 0);
    context.lineTo(offset, board.height);
    context.stroke();
    context.beginPath();
    context.moveTo(0, offset);
    context.lineTo(board.width, offset);
    context.stroke();
  }
}

function drawSnake() {
  state.snake.forEach((segment, index) => {
    const x = segment.x * CELL_SIZE;
    const y = segment.y * CELL_SIZE;
    context.fillStyle = index === 0 ? "#f7b32b" : "#52b788";
    context.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
  });
}

function drawFood() {
  if (!state.food) {
    return;
  }

  const x = state.food.x * CELL_SIZE + CELL_SIZE / 2;
  const y = state.food.y * CELL_SIZE + CELL_SIZE / 2;
  context.fillStyle = "#ff6b6b";
  context.beginPath();
  context.arc(x, y, CELL_SIZE * 0.28, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "#ffd166";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(x, y - CELL_SIZE * 0.34);
  context.lineTo(x + CELL_SIZE * 0.1, y - CELL_SIZE * 0.54);
  context.stroke();
}

function render() {
  drawBackground();
  drawFood();
  drawSnake();
  updateHud();
  updateOverlay();
}

function queueFromInput(direction) {
  state = queueDirection(state, direction);
}

function scheduleNextTick() {
  if (loopId) {
    clearTimeout(loopId);
  }

  if (state.paused || state.gameOver) {
    loopId = null;
    render();
    return;
  }

  loopId = setTimeout(() => {
    state = stepGame(state);
    render();
    scheduleNextTick();
  }, state.tickMs);
}

function startGame() {
  state = restartGame(state);
  state.paused = false;
  render();
  scheduleNextTick();
}

startButton.addEventListener("click", startGame);

pauseButton.addEventListener("click", () => {
  state = togglePause(state);
  render();
  scheduleNextTick();
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "arrowup" || key === "w") {
    queueFromInput("up");
  } else if (key === "arrowdown" || key === "s") {
    queueFromInput("down");
  } else if (key === "arrowleft" || key === "a") {
    queueFromInput("left");
  } else if (key === "arrowright" || key === "d") {
    queueFromInput("right");
  } else if (key === " ") {
    event.preventDefault();
    state = togglePause(state);
    render();
    scheduleNextTick();
  } else {
    return;
  }

  event.preventDefault();
});

mobileButtons.forEach((button) => {
  button.addEventListener("click", () => {
    queueFromInput(button.dataset.direction);
  });
});

render();
