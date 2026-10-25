const gameField = document.getElementById("game-field");
const playerElement = document.getElementById("player");

const scoreElement = document.getElementById("score");
let score = 0;

const startButton = document.getElementById("start-button");
let isPlaying = false;
let enemyTimer = null;

const player = new Ship(playerElement, 3);

document.addEventListener("keydown", (event) => {

  if (!isPlaying) {
    return;
  }

  if (event.key === "ArrowLeft") {
    player.moveLeft();
  }

  if (event.key === "ArrowRight") {
    player.moveRight();
  }

  if (event.code === "Space") {
    const laser = player.shoot(gameField);
    moveLaser(laser);
  }
});

function moveLaser(laser) {
  let bottom = 40;

  const timerId = setInterval(() => {
    bottom += 5;
    laser.style.bottom = `${bottom}px`;

    if (checkLaserCollision(laser)) {
      clearInterval(timerId);
      return;
    }

    if (bottom > 440) {
      clearInterval(timerId);
      laser.remove();
    }
  }, 30);
}


const enemies = [];

function createEnemies() {
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 8; column++) {
      const element = document.createElement("div");
      element.classList.add("enemy");

      gameField.appendChild(element);

      const enemy = new Enemy(element, column, row);
      enemy.updatePosition();

      enemies.push(enemy);
    }
  }
};

createEnemies();

function startEnemyMovement() {
  enemyTimer = setInterval(() => {
    enemies.forEach((enemy) => {
      enemy.moveDown();

      if (enemy.top + 40 >= 400) {
        endGame();
      }
    });
  }, 200);
}

startButton.addEventListener("click", () => {
  if (isPlaying) {
    return;
  }

  isPlaying = true;
  startButton.disabled = true;

  startEnemyMovement();
});

function checkLaserCollision(laser) {
  const laserRect = laser.getBoundingClientRect();

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const enemyRect = enemy.element.getBoundingClientRect();

    const isHit =
      laserRect.left < enemyRect.right &&
      laserRect.right > enemyRect.left &&
      laserRect.top < enemyRect.bottom &&
      laserRect.bottom > enemyRect.top;

    if (isHit) {
      enemy.element.remove();
      enemies.splice(i, 1);

      laser.remove();

      score += 10;
      scoreElement.textContent = score;

      return true;
    }
  }

  return false;
};

function endGame() {
  if (!isPlaying) {
    return;
  }

  isPlaying = false;

  clearInterval(enemyTimer);

  startButton.textContent = "Game Over";

  alert(`Game Over! Your score: ${score}`);
}