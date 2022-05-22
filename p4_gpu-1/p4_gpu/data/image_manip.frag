// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D other_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  vec4 diffuse_color = vec4(0,0,0,0);
  double offset = 0.009;
  for(double i = vertTexCoord.x - offset; i <= vertTexCoord.x + offset; i+=offset) {
    for(double j = vertTexCoord.y - offset; j <= vertTexCoord.y + offset; j+=offset) {
      diffuse_color += texture2D(my_texture, vec2(i, j));
    }
  }
  diffuse_color /= 9;
  if (vertTexCoord.x > 0.5 && vertTexCoord.y > 0.5) {
    vec4 color = texture2D(other_texture, (vertTexCoord.xy-.5)*2);
    if (color.g < 0.85) {
      diffuse_color = color;
    }
  }


  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
}
