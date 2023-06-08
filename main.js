const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight - 4;
let score = 0;

requestAnimationFrame(animate);

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  w: 50,
  h: 50,
  xSpeed: 0,
  ySpeed: 0,
  speed: 5,
};

let enemy = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  w: 50,
  h: 50,
  xSpeed: 0,
  ySpeed: 0,
  speed: 0,
};

console.log("a");
function animate() {
  let dx = player.x - enemy.x;
  let dy = player.y - enemy.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  player.x += player.xSpeed;
  player.y += player.ySpeed;

  enemy.xSpeed = (dx / distance) * enemy.speed;
  enemy.ySpeed = (dy / distance) * enemy.speed;

  enemy.x += enemy.xSpeed;
  enemy.y += enemy.ySpeed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  function spawnEnemy() {
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
  }

  spawnEnemy();

  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w - 1;
  }
  if (player.x < 0) {
    player.x = 1;
  }

  //bottom barrier
  if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.h;
  }
  //top barrier
  if (player.y < 0) {
    player.y = 2;
  }

  // detect player dead
  if (
    player.x < enemy.x + enemy.w &&
    player.x + player.w > enemy.x &&
    player.y < enemy.y + enemy.h &&
    player.y + player.h > enemy.y
  ) {
    cancelAnimationFrame(animate);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("you died", canvas.width / 2, canvas.height / 2);
    player.speed = 0;
    enemy.x = player.x;

    addEventListener("keydown", restart);
    function restart(event) {
      if (event.code == "Space") {
        player.x = canvas.width / 2;
        player.y = canvas.height / 2;
        score = 0;
        player.speed = 5;
        enemy.x = Math.random() * canvas.width;
        enemy.y = Math.random() * canvas.height;
        animate();
      }
    }
  } else {
    //scoreboard

    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score : ${score} `, canvas.width / 2, 50);
  }

  requestAnimationFrame(animate);
}
// score tick up
setInterval(Timer, 1000);
function Timer() {
  score += 1;
}

// Movement
addEventListener("keydown", keydownHandler2);
function keydownHandler2(event) {
  if (event.code == "KeyD") {
    player.xSpeed = player.speed;
    player.ySpeed = 0;
  } else if (event.code == "KeyA") {
    player.xSpeed = -player.speed;
    player.ySpeed = 0;
  } else if (event.code == "KeyW") {
    player.ySpeed = -player.speed;
  } else if (event.code == "KeyS") {
    player.ySpeed = player.speed;
    player.xSpeed = 0;
  }
}

addEventListener("keyup", keyupHandler);
function keyupHandler(event) {
  if (event.code == "KeyD") {
    player.xSpeed = 0;
  } else if (event.code == "KeyA") {
    player.xSpeed = 0;
  } else if (event.code == "KeyW") {
    player.ySpeed = 0;
  } else if (event.code == "KeyS") {
    player.ySpeed = 0;
  }
}
