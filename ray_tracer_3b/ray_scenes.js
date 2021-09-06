// routines for creating a ray tracing scene
//name: Kevin Huynh
let backgroundColor = new Object();

let lights = [];
let ambientLight;

let shapes = [];

let sampleLevel;
let jitter;
let d;
let eyePosition = new Object();
let uvw;
let s, t;
s = t = -1;


// NEW COMMANDS FOR PART B

// create a new disk
function new_disk (x, y, z, radius, nx, ny, nz, dr, dg, db, k_ambient, k_specular, specular_pow) {
  let disk = {type: "disk", x:x, y:y, z:z, radius:radius, nx:nx, ny:ny, nz:nz, r:dr, g:dg, b:db, ambient:k_ambient, specular: k_specular, specPow:specular_pow};
  shapes.push(disk);
}

// create a new area light source
function area_light (r, g, b, x, y, z, ux, uy, uz, vx, vy, vz) {
  let areaLight = {type: "area", r:r, g:g, b:b, x:x, y:y, z:z, ux:ux, uy:uy, uz:uz, vx:vx, vy:vy, vz:vz};
  lights.push(areaLight);
}

function set_sample_level (num) {
  sampleLevel = num;
}

function jitter_on() {
  jitter = true;
}

function jitter_off() {
  jitter = false;
}


// OLD COMMANDS FROM PART A (some of which you will still need to modify)


// clear out all scene contents
function reset_scene() {
  backgroundColor = undefined;
  lights = [];
  shapes = [];
  disks = [];
  ambientLight = undefined;
  eyePosition = undefined;
  s = t = -1;
}

// create a new point light source
function new_light (r, g, b, x, y, z) {
  let light = {type: "point", r:r, g: g, b: b, x:x, y:y, z:z};
  lights.push(light);
}

// set value of ambient light source
function ambient_light (r, g, b) {
  ambientLight = {r: r, g: g, b: b};
}

// set the background color for the scene
function set_background (r, g, b) {
  backgroundColor = {r: r, g: g, b: b};
}

// set the field of view
function set_fov (theta) {
  d = 1/Math.tan(radians(theta)/2);
}

// set the position of the virtual camera/eye
function set_eye_position (x, y, z) {
  eyePosition = {x:x, y:y, z:z};
}

// set the virtual camera's viewing direction
function set_uvw (x1,y1, z1, x2, y2, z2, x3, y3, z3) {
  uvw = {u:{x:x1, y:y1, z:z1}, v:{x:x2, y:y2, z:z2}, w:{x:x3, y:y3, z:z3}};

}

// create a new sphere
function new_sphere (x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
  let sphere = {type: "sphere", x: x, y: y, z: z, radius: radius, r: dr, g: dg, b: db, ambient: k_ambient, spec: k_specular, specPow: specular_pow}
  shapes.push(sphere);
}

// create an eye ray based on the current pixel's position
function eye_ray_uvw (i, j) {
  let u = -1 + 2*i/width;
  let v = -1 + 2*j/height;
  let direction = {x: (-d*uvw.w.x + u*uvw.u.x + v*uvw.v.x), y: (-d*uvw.w.y + u*uvw.u.y + v*uvw.v.y), z: (-d*uvw.w.z + u*uvw.u.z + v*uvw.v.z)};
  return {org: eyePosition, direction: direction};
}

//checks if ray intersects object
function intersection (ray, obj) {
  let t;
  if (obj.type == "disk") { 
    let d = -obj.nx*obj.x - obj.ny*obj.y - obj.nz*obj.z
    t = -(obj.nx*ray.org.x + obj.ny*ray.org.y + obj.nz*ray.org.z + d)/(obj.nx*ray.direction.x + obj.ny*ray.direction.y + obj.nz*ray.direction.z);
    if (!isFinite(t) || t < 0) {
      return null; 
    }
  } else if (obj.type == "sphere") {
    let cx, cy, cz, a, b, c, t0, t1;
    cx = ray.org.x - obj.x;
    cy = ray.org.y - obj.y;
    cz = ray.org.z - obj.z;
    a = ray.direction.x*ray.direction.x + ray.direction.y*ray.direction.y + ray.direction.z*ray.direction.z;
    b = 2*(ray.direction.x*cx + ray.direction.y*cy + ray.direction.z*cz);
    c = cx*cx + cy*cy + cz*cz - obj.radius*obj.radius;
    t0 = (-b + Math.sqrt(b*b - 4*a*c))/(2*a);
    t1 = (-b - Math.sqrt(b*b - 4*a*c))/(2*a);
    if (isNaN(t0) || isNaN(t1)) {
      return null;
    }
    t = t0 > t1 ? t1: t0;
  }
  let x, y, z, nx, ny, nz, dist;
  x = ray.org.x + t*ray.direction.x;
  y = ray.org.y + t*ray.direction.y;
  z = ray.org.z + t*ray.direction.z;
  nx = (x - obj.x);
  ny = (y - obj.y);
  nz = (z - obj.z);
  dist = Math.sqrt(nx*nx + ny*ny + nz*nz);
  if (obj.type == "disk") { 
    if (dist > obj.radius) {//check if intersection is within radius of disk
      return null;
    }
    nx = obj.nx;
    ny = obj.ny;
    nz = obj.nz;
  } else if (obj.type == "sphere") {
    nx /= dist;
    ny /= dist;
    nz /= dist;
  }
  return {norm: {x: nx, y: ny, z: nz}, point: {x: x, y: y, z: z}, t:t};
}

//checks if there is a shadow
function isVisible(ray) {
  for (let i = 0; i < shapes.length; i++) {
    let intersect = intersection(ray, shapes[i]);
    if (intersect != null && intersect.t > 0.001) {
      return false;
    }
  }
  return true;
}

function colorEquation(intersect, obj) {
  let r, g, b, tt, ts;
  r = g = b = 0;
  jitter = (jitter == undefined) ? false : jitter;
  tt = jitter ? (Math.random()*(2/sampleLevel) + t): (t + (1/sampleLevel));
  ts = jitter ? (Math.random()*(2/sampleLevel) + s): (s + (1/sampleLevel));
  for (let j = 0; j < lights.length; j++) {
    let lx, ly, lz, ld, px, py, pz;
    if (lights[j].type == "area") { //area light source
      px = lights[j].x + ts*lights[j].ux + tt*lights[j].vx;
      py = lights[j].y + ts*lights[j].uy + tt*lights[j].vy;
      pz = lights[j].z + ts*lights[j].uz + tt*lights[j].vz;
    } else if (lights[j].type == "point") { //point light source
      px = lights[j].x;
      py = lights[j].y;
      pz = lights[j].z;
    }
    lx = px - intersect.point.x;
    ly = py - intersect.point.y;
    lz = pz - intersect.point.z;
    ld = Math.sqrt(lx*lx + ly*ly + lz*lz);
    lx /= ld;
    ly /= ld;
    lz /= ld;
    if (isVisible({org: {x: intersect.point.x, y: intersect.point.y, z: intersect.point.z}, direction: {x:lx, y:ly, z:lz}})) {
      let dot = Math.max(0, lx*intersect.norm.x + ly*intersect.norm.y + lz*intersect.norm.z);
      r += lights[j].r*dot;
      g += lights[j].g*dot;
      b += lights[j].b*dot;
    }
  }
  s += 2/sampleLevel;
  s = s < 1 ? s: -1; //increment s and t values
  t = s == -1 ? t + 2/sampleLevel: t;
  t = t < 1 ? t: -1;

  ambientLight = (ambientLight == undefined) ? {r:0, g:0, b:0} : ambientLight;
  r = r*obj.r + obj.r*ambientLight.r*obj.ambient;
  g = g*obj.g + obj.g*ambientLight.g*obj.ambient;
  b = b*obj.b + obj.b*ambientLight.b*obj.ambient;
  return {r:r, g:g, b:b};
}
// this is the main routine for drawing your ray traced scene
function draw_scene() {
  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      sampleLevel = (sampleLevel == undefined) ? 1 : sampleLevel;
      let inc, r, g, b;
      inc = 1/sampleLevel;
      r = g = b = 0;
      for (let y1 = y - .5 + inc/2; y1 < y+.5; y1+=inc) { //iterate each subpixel
        for (let x1 = x - .5 + inc/2; x1 < x+.5; x1+=inc) { 
          let ray, tr, tg, tb, max;
          ray = eye_ray_uvw(x1, y1);
          max = -Infinity;
          for (let i = 0; i < shapes.length; i++) {
            let intersect = intersection(ray, shapes[i]);
            if (intersect != null && intersect.point.z > max) {
              max = intersect.point.z;
              let color = colorEquation(intersect, shapes[i]);
              tr = color.r;
              tg = color.g;
              tb = color.b;
            }
          }
          if (max == -Infinity) {
            r += backgroundColor.r;
            g += backgroundColor.g;
            b += backgroundColor.b;
          } else {
            r += tr;
            g += tg;
            b += tb;
          }
        }
      }
      r /= sampleLevel*sampleLevel; //average out each subpixels
      g /= sampleLevel*sampleLevel;
      b /= sampleLevel*sampleLevel;
      fill (255 * r, 255 * g, 255 * b);
      rect (x, height - y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  }
}
