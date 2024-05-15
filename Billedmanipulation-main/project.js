let img;
let sliderA;
let sliderB;
let A;
let B;
let filter;
let ww;
let wh;
let scene;

function preload() {
  img = loadImage('billeder/mpsFull.jpg');
}

function setup() {
  w = img.width;
  h = img.height;
  ww = windowWidth-40;
  wh = windowHeight-55;
  sliderA = createSlider(0, 254, 0); // Opretter en slider med værdier mellem 0 og 10
  sliderA.hide();
  sliderB = createSlider(0, 1000, 0); // Opretter en slider med værdier mellem 0 og 10
  sliderB.hide();
  createCanvas(windowWidth-40, windowHeight-55);
  noStroke();
  img.loadPixels();
  filter = 0;
  scene = 0;
}

function draw() {
  frameRate(180);
  background(255,255,255);
  sliderA.hide();
  sliderB.hide();
  fill(100,100,100);
  rect((0+40),(0+55),ww-40,wh-55,50,50,50,50);
  fill(255,255,255,255);
  rect((windowWidth/2-w),windowHeight/3.7,550,387);
  fill(255,255,255,100);
  rect((windowWidth/2-w)-10,windowHeight/3.7-10,570,407);
  fill(255,255,255);
  rect((windowWidth/2-(255/2))-10,wh/1.175-30,275,40,50,50,0,0);
  rect((windowWidth/2-(255/2))-10,wh/1.175-10,275,40,0,0,50,50);
  rect((windowWidth/2-275)-10,wh/6,570,50,0,0,50,50);
  rect((windowWidth/2-275)-10,wh/7.6,570,50,50,50,0,0);
  if (scene === 0) {
    contrastfilter();
  } else if (scene === 1) {
    pixelatefilter();
  } 
  fill(255,255,255,240)
  textAlign(CENTER,CENTER);
  textStyle(BOLD);
  textSize(40)
  text('TRYK ENTER FOR AT SKIFTE FILTER',ww/2,80)
  text('TRYK ENTER FOR AT SKIFTE FILTER',ww/2,wh-20)
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (scene === 0) {
      scene = 1;
    } else if (scene === 1) {
      scene = 0;
    }
  }
}

function contrastfilter() {
  sliderA.show();
  fill(0,0,0);
  textSize(60);
  text('KONTRASTFILTER',(windowWidth/2-(255/2))+125,wh/5.5);
  textSize(25);
  text('Kontrast: ' +A,(windowWidth/2-(255/2))+125,wh/1.175-10);
  sliderA.position((windowWidth/2-(255/2)), wh/1.17); // Placere slider
  sliderA.size(255); // Lader slideren være 250 pixel lang
  A = sliderA.value(); // Lader variabel A være sliderAs værdi
  ownFilter();
  image(img, windowWidth/2, windowHeight/3.7);
}

function ownFilter() {
  for (let i = 0; i < w; i = i+1) {
    for (let j = 0; j < h; j = j+1){
      fill(getRGBvalue(0,i,j),getRGBvalue(1,i,j),getRGBvalue(2,i,j));
      rect(i+(windowWidth/2-w), j+(windowHeight/3.7), 1, 1);
    }
  }
}

function getRGBvalue(n,i,j){
  c = getPixelValue(n,i,j);
  if (c>A){c=255;}
  else{c=0;}
  return c;
}

function getPixelValue(n,i,j){
  p = img.pixels[(i+w*j)*4+n];
  return p;
}

function pixelatefilter(){
  sliderB.show();
  fill(0,0,0)
  textSize(60)
  text('PIXELATEFILTER',(windowWidth/2-(255/2))+125,wh/5.5)
  textSize(25)
  text('Pixelate: ' +B,(windowWidth/2-(255/2))+125,wh/1.175-10)
  sliderB.position((windowWidth/2-(255/2)), wh/1.17); // Placere slider
  sliderB.size(255); // Lader slideren være 250 pixel lang
  B = sliderB.value(); // Lader variabel A være sliderAs værdi
  image(img, windowWidth/2, windowHeight/3.7);
  ownFilter2();
}

function ownFilter2(){
  let pixelSize = int(map(B, 0, 2*w, 2, 16));
  for (let i=0;i<w; i = i+pixelSize){
    for (let j=0;j<h; j = j+pixelSize){
      fill([getPixelValue2(0,i,j),  getPixelValue2(1,i,j),  getPixelValue2(2,i,j)]);
      ellipse(i+(windowWidth/2-w), j+(windowHeight/3.7),pixelSize,pixelSize);
    }
  }
}

function getPixelValue2(n,i,j){
  p = img.pixels[(i+w*j)*4+n];
  return p;
}
