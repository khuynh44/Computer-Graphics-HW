function setup() {
  createCanvas (500, 500);
}

function draw() {
  background (200, 200, 200); 
  noStroke(); 
  let theta = (mouseX/width)*((2/3)*Math.PI);
  let radius = width/5;
  let center = {x: width/2, y: height/2};
  let Color = {r: 0, g: 0, b: 0};
  fill(Color.r, Color.g, Color.b);
  let K = (height - mouseY)/height;
  let h = 25;
  console.log(h+=4);
  drawTriangles(center.x, center.y, radius, K, theta, 0, 8, Color);
}

function drawTriangles(cx, cy, radius, K, theta, T, iterations, Color) {
  if (iterations == 0) {
    return;
  }
  let theta1 = theta*T;
  let v1x = cx + radius*Math.cos(theta1);
  let v1y = cy + radius*Math.sin(theta1);
  theta1 += (2/3)*Math.PI;
  let v2x = cx + radius*Math.cos(theta1);
  let v2y = cy + radius*Math.sin(theta1);
  theta1 += (2/3)*Math.PI;
  let v3x = cx + radius*Math.cos(theta1);
  let v3y = cy + radius*Math.sin(theta1);
  
  iterations--;
  T++;
  let Color2 = {...Color};
  beginShape();
  fill(Color2.r+=50, Color2.g +=35, Color2.b+=15);
  vertex(v1x, v1y);
  vertex(v2x, v2y);
  vertex(v3x, v3y);
  endShape();
  
  drawTriangles(v1x, v1y, radius*K, K, theta, T, iterations, Color2);
  drawTriangles(v2x, v2y, radius*K, K, theta, T, iterations, Color2);
  drawTriangles(v3x, v3y, radius*K, K, theta, T, iterations, Color2);
}
