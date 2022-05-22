// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

vec2 julia(int iterations, vec2 z, vec2 c) {
  for (int j = 0; j < iterations; j++) {
    for (int i = 0; i < 2; i++) {
      float x = z.x;
      float y = z.y;
      z.x = x*x - y*y;
      z.y = 2*x*y;
    }
    z += c;
  }
  return z;
}

void main() {
  vec2 z = julia(30, vertTexCoord.xy*3.0 - 1.5, vec2(cx, cy));
  vec4 color = vec4(1,0,0,1);
  if (length(z) <= 4) {
    color = vec4(1,1,1,1);
  }
  gl_FragColor = color;
}

