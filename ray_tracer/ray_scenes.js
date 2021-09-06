// routines for creating a ray tracing scene
let backgroundColor = new Object();
let lights = [];
let spheres = [];
let ambientLight = new Object();
let d;
let eyePosition = new Object();
let uvw;
// clear out all scene contents
function reset_scene() {
  backgroundColor = new Object();
  lights = [];
  spheres = [];
  ambientLight = new Object();
  eyePosition = new Object();
}

// create a new point light source
function new_light (r, g, b, x, y, z) {
  let light = {r:r, g: g, b: b, x:x, y:y, z:z};
  lights.push(light);
}

// set value of ambient light source
function ambient_light (r, g, b) {
  ambientLight.r = r;
  ambientLight.g = g;
  ambientLight.b = b;
}

// set the background color for the scene
function set_background (r, g, b) {
  backgroundColor.r = r;
  backgroundColor.g = g;
  backgroundColor.b = b;
}

// set the field of view
function set_fov (theta) {
  theta = radians(theta);
  d = 1/Math.tan(theta/2);
}

// set the position of the virtual camera/eye
function set_eye_position (x, y, z) {
  eyePosition.x = x;
  eyePosition.y = y;
  eyePosition.z = z;
}

// set the virtual camera's viewing direction
function set_uvw(x1,y1, z1, x2, y2, z2, x3, y3, z3) {
  uvw = {u:{x:x1, y:y1, z:z1}, v:{x:x2, y:y2, z:z2}, w:{x:x3, y:y3, z:z3}};
}

// create a new sphere
  function new_sphere (x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
  let sphere = {x: x, y: y, z: z, radius: radius, r: dr, g: dg, b: db, ambient: k_ambient, spec: k_specular, specPow: specular_pow}
  spheres.push(sphere);
}

// create an eye ray based on the current pixel's position
function eye_ray_uvw(i, j) {
  let u = -1 + 2*i/width;
  let v = -1 + 2*j/height;
  let direction = {x: (-d*uvw.w.x + u*uvw.u.x + v*uvw.v.x), y: (-d*uvw.w.y + u*uvw.u.y + v*uvw.v.y), z: (-d*uvw.w.z + u*uvw.u.z + v*uvw.v.z)};
  return {org: eyePosition, direction: direction};
}

function intersection(ray, obj) {
  let cx = ray.org.x - obj.x;
  let cy = ray.org.y - obj.y;
  let cz = ray.org.z - obj.z;
  let a = ray.direction.x*ray.direction.x + ray.direction.y*ray.direction.y + ray.direction.z*ray.direction.z;
  let b = 2*(ray.direction.x*cx + ray.direction.y*cy + ray.direction.z*cz);
  let c = cx*cx + cy*cy + cz*cz - obj.radius*obj.radius;
  let t0 = (-b + Math.sqrt(b*b - 4*a*c))/(2*a);
  let t1 = (-b - Math.sqrt(b*b - 4*a*c))/(2*a);
  if (isNaN(t0) || isNaN(t1)) {
    return null;
  }
  let t = t0 > t1 ? t1: t0;
  let x = ray.org.x + t*ray.direction.x;
  let y = ray.org.y + t*ray.direction.y;
  let z = ray.org.z + t*ray.direction.z;
  let nx = (x - obj.x);
  let ny = (y - obj.y);
  let nz = (z - obj.z);

  let dist = Math.sqrt(nx*nx + ny*ny + nz*nz);
  return {norm: {x: (nx/dist), y: (ny/dist), z: (nz/dist)}, point: {x: x, y: y, z: z}};
}
// this is the main routine for drawing your ray traced scene
function draw_scene() {

  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      
      // create eye ray
      let ray = eye_ray_uvw(x, y);
      // maybe print debug information
      // debug_flag = 0;
      // if (x == width / 2 && y == height / 2) { debug_flag = 1;  }  // un-comment to debug center pixel
      
      // if (debug_flag) {
      //   console.log ("debug at: " + x + " " + y);
      // }
      
      // Figure out the pixel's color here (FOR YOU TO WRITE!!!)
      
      let r, g, b;
      r = backgroundColor.r;
      g = backgroundColor.g;
      b = backgroundColor.b;
      let max = -Infinity;
      for (let i = 0; i < spheres.length; i++) {
        let intersect = intersection(ray, spheres[i]);
        if (intersect != null && intersect.point.z > max) {
          max = intersect.point.z;
          r = g = b = 0;
          for (let j = 0; j < lights.length; j++) {
            let lx = lights[j].x - intersect.point.x;
            let ly = lights[j].y - intersect.point.y;
            let lz = lights[j].z - intersect.point.z;
            let ld = Math.sqrt(lx*lx + ly*ly + lz*lz);
            lx = lx/ld;
            ly = ly/ld;
            lz = lz/ld;
            let dot = Math.max(0, (lx*intersect.norm.x + ly*intersect.norm.y + lz*intersect.norm.z));
            r += lights[j].r*dot;
            g += lights[j].g*dot;
            b += lights[j].b*dot;
          }
          r = r*spheres[i].r + spheres[i].r*ambientLight.r*spheres[i].ambient;
          g = g*spheres[i].g + spheres[i].g*ambientLight.g*spheres[i].ambient;
          b = b*spheres[i].b + spheres[i].b*ambientLight.b*spheres[i].ambient;
        }
      }
      
      // set the pixel color, converting values from [0,1] into [0,255]
      fill (255 * r, 255 * g, 255 * b);
      
      rect (x, height - y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  }
}
