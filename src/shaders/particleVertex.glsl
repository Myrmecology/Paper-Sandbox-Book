// Particle Vertex Shader
// Handles particle positioning, sizing, and animations

attribute float size;
attribute vec3 customColor;

varying vec3 vColor;
varying float vAlpha;

uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

void main() {
  vColor = customColor;
  
  // Calculate vertex position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Add subtle wave effect based on time
  float wave = sin(uTime * 0.5 + position.x * 0.5) * 0.05;
  modelPosition.y += wave;
  
  // Calculate view position
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  
  // Calculate particle size with distance attenuation
  float distanceToCamera = length(viewPosition.xyz);
  float sizeAttenuation = 1.0 / distanceToCamera;
  
  // Apply size with pixel ratio and custom size attribute
  gl_PointSize = size * uSize * uPixelRatio * sizeAttenuation * 300.0;
  
  // Fade particles based on distance
  vAlpha = smoothstep(30.0, 5.0, distanceToCamera);
  
  // Ensure minimum visibility
  vAlpha = max(vAlpha, 0.3);
}