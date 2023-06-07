const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight - 4;

let player = {
  x: canvas.width/2,
  y: canvas.height/2,
  w: 36,
  h: 36,
  xSpeed: 0,
  ySpeed: 0,
  speed: 5,
};
let enemy = {
  x: Math.random() * canvas.width,
  y: Math.random() *canvas.height,
  w: 50,
  h: 50,
xSpeed : 0,
ySpeed : 0,
speed : 2
}
requestAnimationFrame(animate);

function animate() {

let dx = player.x - enemy.x
let dy = player.y - enemy.y
let distance = Math.sqrt((dx * dx) +(dy * dy))


  player.x += player.xSpeed;
  player.y += player.ySpeed;

  enemy.xSpeed = (dx / distance) * enemy.speed
  enemy.ySpeed = (dy / distance) * enemy.speed

  enemy.x += enemy.xSpeed;
  enemy.y += enemy.ySpeed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width/2 , 100, 50, 50);
  
  function spawnEnemy(){

    ctx.fillStyle = "red"
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h)
    console.log("spawnEnemy")
  }


spawnEnemy()




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


