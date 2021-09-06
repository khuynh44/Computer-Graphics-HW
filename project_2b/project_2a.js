// Sample code for Project 2
// Draws 3D Primitives (sphere, box, cylinder, cone, torus)
//CAR object is the shape being instanced

let time = 0;  // records the passage of time, used to move the objects
let move = 0;
let move2 = 0;
let pos = {x: 0, y:-40, z:0};
// this is called once at the start of the program
function setup() {
  createCanvas(600, 600, WEBGL);
  
  let fov = 60.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}
// this is called repeatedly to create new per-frame images
function draw() {
  let dist = 400;
  background(180, 180, 255);  // light blue background
  
  // let theta = time;
  // orbitControl();
  // camera(dist*sin(theta), -dist, dist*cos(theta), 0, 0, 0, 0, 1, 0);  // from, at, up
  time += .03;
  // include a little bit of light even in shadows
  ambientLight(60, 60, 60);
  
  // set the light position
  pointLight(255, 255, 255, 100, -100, -300);
  pointLight(255, 255, 255, -100, -100, 5000);
  //orbitControl();
  //  let theta = (mouseX/width)*2*PI;
  //  let theta2 = (mouseY/height)*2*PI;
  // camera(cos(theta2)*sin(theta)*dist, sin(theta2)*dist, cos(theta2)*cos(theta)*dist, 0, 0, 0, 0, 1, 0);
  //if (time < 50) {
  //  translate(time, 0, 0);
  //}
  // push()
  // translate(260 - move,0,100)
  // pop();
  if (time < 15) {
    camera(dist*sin((time/15)*(2*PI)), -60, (-dist)*cos((time/15)*(2*PI)), 0, 0, 0, 0, 1, 0);
    push()
    rotateY(time);
    translate(0, -40 + 40*cos(time*4), 0);
    drawChicken();
    pop();
    let p = 0;
    for (let i = 0; i < 8; i++) {
      push();
      translate(p + 260 - 10*move, 0, 100)
      drawManyCars(3);
      pop();
      p += 740;
    }
  } else if (time < 38) {
    move = (time < 16)? 0: move;
    push();
    pos.y = -40 + 40*cos(time*4);
    pos.z = 2*move;
    
    translate(0, pos.y, pos.z);
    drawChicken();
    pop();
    
    let p = 0;
    for (let i = 0; i < 10; i++) {
      push();
      translate(p + 260 - 10*move, 0, 100)
      drawManyCars(3);
      pop();
      

      push()
      translate(-p - 260 + 10*move, 0, 775)
      drawManyCars(3);
      pop();
      p += 740;
    }
    camera(dist, -dist, -dist + 2*move, 0, 0, 2*move, 0, 1, 0);
  } else {
    move = (time < 39)? 0: move;
    let h = -800 + move*5;
    push();
    if (h > -10) {
      if (time > 48) {
        translate(-100 - move2, -10, pos.z - 20);
        move2++;
      } else {
        translate(-100, -10, pos.z - 20);
      }
    } else {
      translate(-100, h, pos.z - 20);
    }
    drawCar();
    pop();
    push();
    if (h > -10) {
      scale(1, .1, 1);
      translate(0, 30, pos.z);
    } else {
      translate(0, 0, pos.z);
    }
    drawChicken();
    pop();
    camera(0, -100, pos.z + dist, 0, 0, pos.z, 0, 1, 0);
  }
  
  drawFloor();
  push();
  translate(0,36,700);
  drawRoad();
  pop();
  move+=1;
}

function drawChicken() {

  noStroke();
  fill(255);
  //body1
  box(20, 35, 20);
  
  //body2
  push();
  translate(0,10,-12);
  box(20, 15, 15);
  pop();
  
  //body3
  push();
  translate(0,7,-20);
  box(15, 9, 5);
  pop();
  
  fill(255,122,0);
  //leg1
  push();
  translate(5,23,0);
  box(3, 15, 3);
  pop();
  
  //leg2
  push();
  translate(-5,23,0);
  box(3, 15, 3);
  pop();
  
  //foot1
  push();
  translate(5,30,0);
  box(7, 2, 7);
  pop();
  
  //foot2
  push();
  translate(-5,30,0);
  box(7, 2, 7);
  pop();
  
  //toes1,1
  push();
  translate(7.5,30,6);
  box(2, 2, 5);
  pop();
  
  //toes1,2
  push();
  translate(2.5,30,6);
  box(2, 2, 5);
  pop();
  
  //toes2,1
  push();
  translate(-2.5,30,6);
  box(2, 2, 5);
  pop();
  
  //toes2, 2
  push();
  translate(-7.5,30,6);
  box(2, 2, 5);
  pop();
  
  fill(255);
  //wing1
  push();
  translate(12,9,-3);
  box(7, 7, 17);
  pop();
  
  //wing2
  push();
  translate(-12,9,-3);
  box(7, 7, 17);
  pop();
  
  fill(255,122,0);
  //beak
  push();
  translate(0,-7,12);
  box(5, 5, 11);
  pop();
  
  fill(200, 0, 0);
  //wattle
  push();
  translate(0,-2,12);
  box(5, 5, 5);
  pop();
  
  //comb
  push();
  translate(0,-20,0);
  box(5, 5, 10);
  pop();
  
  fill(0);
  //eye1
  push();
  translate(9,-10,0);
  box(3, 3, 3);
  pop();
  
  //eye2
  push();
  translate(-9,-10,0);
  box(3, 3, 3);
  pop();
  
  //tie1
  push();
  scale(4);
  translate(.5, 1, 3);
  rotate(PI/2);
  cone(1,1);
  pop();
  
  //tie2
  push();
  scale(4);
  translate(-.5, 1, 3);
  rotate(-PI/2);
  cone(1,1);
  pop();
}

function drawCar() {
  push();
  translate(100, 10, 0);
  noStroke();
  //carbody1
  fill(255,140,0);
  box(80, 30, 50);
  
  //carbody2
  push();
  translate(0, -15, 0);
  box(40, 30, 50);
  pop();
  
  //window1
  fill(0);
  push();
  translate(0, -20, 0);
  box(30, 10, 51);
  pop();
  
  //window2
  fill(0);
  push();
  translate(0, -20, 0);
  box(41, 10, 30);
  pop();
  
  stroke(0);
  //wheel1
  fill(0);
  push();
  translate(-20, 10, 25);
  rotateX(PI/2);
  fill(255);
  cylinder(5, 11);
  fill(0);
  cylinder(10,10);
  pop();
  
  //wheel2
  push();
  translate(20, 10, 25);
  rotateX(PI/2);
  fill(255);
  cylinder(5, 11);
  fill(0);
  cylinder(10,10);
  pop();
  
  //wheel3
  push();
  translate(20, 10, -25);
  rotateX(PI/2);
  fill(255);
  cylinder(5, 11);
  fill(0);
  cylinder(10,10);
  pop();
  
  //wheel4
  push();
  translate(-20, 10, -25);
  rotateX(PI/2);
  fill(255);
  cylinder(5, 11);
  fill(0);
  cylinder(10,10);
  pop();
  
  noStroke();
  //headlights
  push();
  translate(-36, 0, -15);
  rotateZ(PI/2);
  fill(255);
  cylinder(4, 10);
  pop();
 
 //headlights2
  push();
  translate(-36, 0, 15);
  rotateZ(PI/2);
  fill(255);
  cylinder(4, 10);
  pop();
  
  pop();
}

function drawFloor() {
  fill(0, 128, 0);
  push();
  translate(0, 36, 0);
  box(4000, 10, 4000);
  drawRoad();
  pop();
}

function drawRoad() {
  push();
  fill(100);
  translate(0,0, 350);
  box(4000, 11, 400);
  pop();
}

function drawManyCars(num) {
  push();
  for (let i = 0; i < num; i++) {
    translate(0,0,100);
    if (i%2 == 0) {
      push();
      translate(400, 0 , 0);
      drawCar();
      pop();
    } else {
      drawCar();
    }
  }
  pop();
}

