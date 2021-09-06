// Matrix and Drawing Library

// Begin by using the matrix transformation routines from part A of this project.
// You should modify the new routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that you need.
let ctm;
let isOrtho;
let viewPlane;
let vertices = [];
function multiply(mtrx1, mtrx2) {
  let newMtrx = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (i = 0; i < mtrx1.length; i++) {
    for (j = 0; j < mtrx1.length; j++) {
      let sum = 0;
      for (k = 0; k < mtrx1.length; k++) {
        sum += mtrx1[i][k]*mtrx2[k][j];
      }
      newMtrx[i][j] = sum;
    }
  }
  return newMtrx;
}
function pointMultiply(mtrx, point) {
  let newPoint = [];
  for (i = 0; i < mtrx.length; i++) {
    let sum = 0;
    for (j = 0; j < mtrx[i].length; j++) {
      sum += mtrx[i][j]*point[j];
    }
    newPoint.push(sum);
  }
  return newPoint;
}
function BeginShape(dummy_value) {
}

function EndShape(dummy_value) {
  for (i = 1; i < vertices.length; i+=2) {
    line(vertices[i - 1][0], vertices[i - 1][1], vertices[i][0], vertices[i][1]);
  }
}

function Vertex(x, y, z) {
  let point = pointMultiply(ctm, [x,y,z,1]);
  if (isOrtho) {
    point[0] = (point[0] - viewPlane.left)*(width/(viewPlane.right - viewPlane.left));
    point[1] = (point[1] - viewPlane.bottom)*(height/(viewPlane.top - viewPlane.bottom));
  } else {
    point[0] = point[0]/(Math.abs(point[2]));
    point[0] = (point[0] + viewPlane.k)*(width/(2*viewPlane.k));
    point[1] = point[1]/(Math.abs(point[2]));
    point[1] = (point[1] + viewPlane.k)*(height/(2*viewPlane.k));
  }
  point[1] = height - point[1];
  vertices.push(point);
}

function Perspective(field_of_view, near, far) {
  isOrtho = false;
  let theta = radians(field_of_view);
  viewPlane = {theta: theta, k: tan(theta/2)};
}

function Ortho(left, right, bottom, top, near, far) {
  isOrtho = true;
  viewPlane = {left: left, right: right, bottom: bottom, top: top};
}

function Init_Matrix()
{
   ctm = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
}

function Translate(x, y, z)
{
  let T = [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]];
  ctm = multiply(ctm, T);
}

function Scale(x, y, z)
{
  let S = [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
  ctm = multiply(ctm, S);
}

function RotateX(theta)
{
  theta *= Math.PI/180;
  let R = [[1, 0, 0, 0], [0, Math.cos(theta), -Math.sin(theta), 0], [0, Math.sin(theta), Math.cos(theta), 0], [0, 0, 0, 1]];
  ctm = multiply(ctm, R);
}

function RotateY(theta)
{
  theta *= Math.PI/180;
  let R = [[Math.cos(theta), 0, Math.sin(theta), 0], [0, 1, 0, 0], [-Math.sin(theta), 0, Math.cos(theta), 0], [0, 0, 0, 1]];
  ctm = multiply(ctm, R);
}

function RotateZ(theta)
{
  theta *= Math.PI/180;
  let R =[[Math.cos(theta), -Math.sin(theta), 0, 0], [Math.sin(theta), Math.cos(theta), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  ctm = multiply(ctm, R);
}

function Print_Matrix()
{
  console.log("Current Matrix:\n ");
  for(i = 0; i < ctm.length; i++) {
    console.log(ctm[i] + "\n");
  }
  console.log("\n");
}
