// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  vec4 coor = vertTexCoord;
  bool isInLargeCircle = (pow(coor.x - .5, 2) + pow(coor.y - .5, 2)) <= .25;
  bool isInSmallCircles = false;
  for (int i = 0; i < 360; i+=45) {
    float h, k;
    h = .375*cos(radians(i)) + .5;
    k = .375*sin(radians(i)) + .5;
    isInSmallCircles = (pow(coor.x - h, 2) + pow(coor.y - k, 2) <= .01) ? true : isInSmallCircles;
  }
  bool isInSquare = coor.x <= .6 && coor.x >= .4 && coor.y <= .6 && coor.y >= .4;
  int isOpaque = !isInSquare && !isInSmallCircles && isInLargeCircle ? 1 : 0;
  
  vec3 lightVec = normalize(vertLightDir);
  float diffuse = clamp(dot(vertNormal, lightVec), 0.0, 1.0);
  gl_FragColor = vec4(diffuse*vertColor.rgb, isOpaque);
}

