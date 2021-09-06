// Matrix Library (for you to write!)

// You should modify the routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that you need.
let ctm;
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
