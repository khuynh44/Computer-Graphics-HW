// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

float Offset(vec2 texCoord) {
  float a, b, offset;
  a = 30.0;
  b = 35.0;
  offset = a*sin(b*length(texCoord.xy - .5));
  return offset;
}

void main() {

  // provided
  vertColor = color;
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
  float mult = .05;
  
  float offset = Offset(texCoord);
  vec4 vert = vec4(vertex.xyz + normal*offset, vertex.w);
  float offsetx = Offset(vec2(vertTexCoord.x + .04, vertTexCoord.y)) - Offset(vec2(vertTexCoord.x - .04, vertTexCoord.y));
  float offsety = Offset(vec2(vertTexCoord.x, vertTexCoord.y + .04)) - Offset(vec2(vertTexCoord.x, vertTexCoord.y - .04));
  vec3 newNormal = vec3(normal.x - mult*offsetx, normal.y - mult*offsety, normal.z);

  gl_Position = transform * vert;
  vertNormal = normalize(normalMatrix * (newNormal));
  vertLightDir = normalize(-lightNormal);

}

