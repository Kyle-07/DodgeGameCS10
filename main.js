// constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas size
canvas.width = innerWidth;
canvas.height = innerHeight - 4;

// variables for laater
let score = 0;
let dead = false;
let keydown;


// start animation
requestAnimationFrame(animate);

//define player
let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  w: 50,
  h: 50,
  xSpeed: 0,
  ySpeed: 0,
  speed: 4,
};


//Define Enemies
let enemy = {
  x: canvas.width - 200 ,
  y: canvas.height - 200 ,
  w: 150,
  h: 150,
  xSpeed: 0,
  ySpeed: 0,
  speed: 0,
};
let enemy2 = {
  x: 50,
  y: 50,
  w: 50,
  h: 50,
  xSpeed: 0,
  ySpeed: 0,
  speed: 0,
};

// define wall
let wall = {
  x: canvas.width / 2,
  y: 200,
  w: 50,
  h: 50,
};


function animate() {

  // trig tracking  stuff for enemy 1
  let dx = player.x - enemy.x;
  let dy = player.y - enemy.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

// trig tracking  stuff for enemy 2
  let dx2 = player.x - enemy2.x;
  let dy2 = player.y - enemy2.y;
  let distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);



// give enemy 1 x znd y speed
  enemy.xSpeed = (dx / distance) * enemy.speed;
  enemy.ySpeed = (dy / distance) * enemy.speed;

// give enemy 2 x znd y speed
  enemy2.xSpeed = (dx2 / distance2) * enemy2.speed;
  enemy2.ySpeed = (dy2 / distance2) * enemy2.speed;

  // move player
  player.x += player.xSpeed;
  player.y += player.ySpeed;

  // move enemy 1
  enemy.x += enemy.xSpeed;
  enemy.y += enemy.ySpeed;

  // move enemy 2
  enemy2.x += enemy2.xSpeed;
  enemy2.y += enemy2.ySpeed;

// clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw player
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, player.w, player.h);

// draw enemy 1
  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);

//draw enemy 2
  ctx.fillStyle = "blue";
  ctx.fillRect(enemy2.x, enemy2.y, enemy2.w, enemy2.h);

//draw wall
  ctx.fillStyle = "green";
  ctx.fillRect(wall.x, wall.y, wall.w, wall.h);

//right barrier
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w - 1;
  }
  // left barrier
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

// wall collision wip may not be finished in time
  if (
    player.x + player.w > wall.x &&   
    player.x < wall.x + wall.w &&     
    player.y + player.h > wall.y &&   
    player.y < wall.y + wall.h       
  ) {
    player.x = wall.x - player.w;
  }
 



  // detect player dead
  if (
    // detect if player in any enemies
    (player.x < enemy.x + enemy.w &&
      player.x + player.w > enemy.x &&
      player.y < enemy.y + enemy.h &&
      player.y + player.h > enemy.y) ||
    (player.x < enemy2.x + enemy2.w &&
      player.x + player.w > enemy2.x &&
      player.y < enemy2.y + enemy2.h &&
      player.y + player.h > enemy2.y)
  ) {
// stop animating
    cancelAnimationFrame(animate);

    // red background
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

// text
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("you died", canvas.width / 2, canvas.height / 2)
    ctx.fillText(`Score : ${score} `, canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText(`press space to restart`, canvas.width / 2, canvas.height / 2 + 70);

    //change speed, stop score tick, remove movement
    player.speed = 0;
    clearInterval(myInterval);
    player.xSpeed = 0;
    player.ySpeed = 0;
    enemy.x = player.x;
    dead = true;
  } else {
    //scoreboard if player alive


    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score : ${score} `, canvas.width / 2, 50);
  }


  requestAnimationFrame(animate);
}
// score tick up
myInterval = setInterval(Timer, 1000);
function Timer() {
  score += 1;
}


// Movement pt 1
addEventListener("keydown", keydownHandler2);
function keydownHandler2(event) {

  //if wasd presses change xspeed or yspeed
  if (event.code == "KeyD") {
    player.xSpeed = player.speed;
  } else if (event.code == "KeyA") {
    player.xSpeed = -player.speed;
  } else if (event.code == "KeyW") {
    player.ySpeed = -player.speed;
  } else if (event.code == "KeyS") {
    player.ySpeed = player.speed;
  }


  //restart if dead and space bar pressed
  if (dead == true) {
    if (event.code == "Space") {

      //reset everything
      player.x = canvas.width / 2;
      player.y = canvas.height / 2;
      score = 0;
      player.speed = 4;
      enemy.x = Math.random() * canvas.width;
      enemy.y = Math.random() * canvas.height;
      enemy2.x = Math.random() * canvas.width;
      enemy2.y = Math.random() * canvas.height;
      dead = false;
      myInterval = setInterval(Timer, 1000);
      function Timer() {
        score += 1;
      }
    }
  }
  keydown = event.code;
}

//movement pt 2 
addEventListener("keyup", keyupHandler);
function keyupHandler(event) {
  if (event.code == "KeyD") {
    if (keydown !== "KeyA") {
      player.xSpeed = 0;
    }
  } else if (event.code == "KeyA") {
    if (keydown !== "KeyD") {
      player.xSpeed = 0;
    }
  } else if (event.code == "KeyW") {
    if (keydown !== "KeyS") {
      player.ySpeed = 0;
    }
  } else if (event.code == "KeyS") {
    if (keydown !== "KeyW") {
      player.ySpeed = 0;
    }
  }
}

