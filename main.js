const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight - 4;

let player = {
  x: 5,
  y: 800,
  w: 36,
  h: 36,
  xSpeed: 0,
  ySpeed: 0,
  speed: 5,
};

requestAnimationFrame(animate);

function animate() {
  player.x += player.xSpeed;
  player.y += player.ySpeed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // ctx.fillStyle = "red";
  // ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);
  // ctx.fillRect(0, 675, 1050, 100);

  requestAnimationFrame(animate);
}
addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
  console.log(event.code);

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
  console.log(event.code);

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
