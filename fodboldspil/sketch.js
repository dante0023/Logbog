class Player {
  constructor(x, y, upCode, downCode, rightCode, leftCode) {
    this.x = x;
    this.y = y;
    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
    this.speed = 3;
    this.upCode = upCode;
    this.downCode = downCode;
    this.rightCode = rightCode;
    this.leftCode = leftCode;
  }

  show(myImage) {
    image(myImage, this.x, this.y);
  }

  stopMovement() {
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;
  }

  update() {
    if (keyCode == this.upCode) {
      this.stopMovement();
      this.movingUp = true;
    }
    if (keyCode == this.downCode) {
      this.stopMovement();
      this.movingLeft = true;
    }
    if (keyCode == this.rightCode) {
      this.stopMovement();
      this.movingDown = true;
    }
    if (keyCode == this.leftCode) {
      this.stopMovement();
      this.movingRight = true;
    }
  }

  move() {
    if (this.movingRight) {
      this.x += this.speed;
    }
    if (this.movingLeft) {
      this.x -= this.speed;
    }
    if (this.movingUp) {
      this.y -= this.speed;
    }
    if (this.movingDown) {
      this.y += this.speed;
    }

    if (this.x < 0) {
      this.stopMovement();
      this.x += 1;
    }
    if (this.x > 600 - 30) {
      this.stopMovement();
      this.x -= 1;
    }
    if (this.y < 0) {
      this.stopMovement();
      this.y += 1;
    }
    if (this.y > 400 - 30) {
      this.stopMovement();
      this.y -= 1;
    }
  }

  ballCollision() {
    tempX = ballX;
    tempY = ballY;

    if (ballX < this.x) {
      tempX = this.x;
      // ballX *= -1;
    } else if (ballX > this.x + 30) {
      tempX = this.x + 30;
      //ballX *= -1;
    }
    if (ballY < this.y) {
      tempY = this.y;
      // ballY *= -1;
    } else if (ballY > this.y + 30) {
      tempY = this.y + 30;
      //ballY *= -1;
    }

    let distX = ballX - tempX;
    let distY = ballY - tempY;
    let distance = sqrt(distX * distX + distY * distY);

    return distance <= 15; // 10?
  }
}

let player1;
let player2;

let p1goal = 0;
let p2goal = 0;

let ballX;
let ballY;
let xDir;
let yDir;
let ballSpeed;

let tempX;
let tempY;

function ballMove() {
  ballX += xDir * ballSpeed;
  if (player1.ballCollision() || player2.ballCollision()) {
    xDir *= -1;
    ballX += xDir * ballSpeed;
    if (!hit_sfx.isPlaying()) hit_sfx.play();
  }

  ballY += yDir * ballSpeed;
  if (player1.ballCollision() || player2.ballCollision()) {
    yDir *= -1;
    ballY += yDir * ballSpeed;
    if (!hit_sfx.isPlaying()) hit_sfx.play();
  }
}

function borderCollision() {
  if (ballX <= 11 || ballX >= 589) {
    xDir *= -1;
    hit_sfx.play();
  }
  if (ballY <= 11 || ballY >= 389) {
    yDir *= -1;
    hit_sfx.play();
  }
}

// pictures
let p1p;
let p2p;
let bgp;

// sounds
let bg_sfx;
let goal_sfx;
let airhorn_sfx;
let hit_sfx;

function preload() {
  bgp = loadImage("bane.png");
  p1p = loadImage("spillerb.png");
  p2p = loadImage("spillerr.png");
  
  soundFormats('mp3', 'wav');
  bg_sfx = loadSound('sfx/bg_noise.mp3');
  goal_sfx = loadSound('sfx/goal.mp3');
  airhorn_sfx = loadSound('sfx/airhorn.mp3');
  hit_sfx = loadSound('sfx/hit.wav');
}

function setup() {
  createCanvas(600, 400);
  player1 = new Player(100, 100, "87", "65", "83", "68");
  player2 = new Player(100, 200, "38", "37", "40", "39");
  ballX = 200;
  ballY = 200;
  xDir = 1;
  yDir = 1;
  ballSpeed = 3;
  
  bg_sfx.play();

}

function draw() {
  image(bgp,0,0);
  player1.move();
  player2.move();
  player1.show(p1p);
  player2.show(p2p);
  ballMove();

  //player1.ballCollision();
  //player2.ballCollision();

  borderCollision();
  ellipse(ballX, ballY, 20);
  //rect(0,150,30,100)
  //rect(570,150,30,100)
  if (ballX < 30 && ballY>150 && ballY<250) {
    p1goal += 1;
    console.log(p1goal);
    xDir*=-1;
    ballX=300;
    ballY=200;
    goal_sfx.play();
  }
  if (ballX > 570 && ballY>150 && ballY<250) {
    p2goal += 1;
    console.log(p1goal);
    xDir*=-1;
    ballX=300;
    ballY=200;
    goal_sfx.play();
  }
  fill(160);
  textSize(20);
  text(p2goal, 245, 22);
  text(p1goal, 310, 22);
  fill(255);
  
  textSize(50);
  if (p1goal>=10) {
    noLoop();
    text("Red player wins", 90, 200);
  } else if (p2goal>=10) {
    noLoop();
    text("Blue player wins", 90, 200);
  }
}

function keyPressed() {
  player1.update();
  player2.update();
}
