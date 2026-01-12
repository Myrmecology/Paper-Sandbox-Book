// Particle Fragment Shader
// Creates glowing, star-like particles with smooth edges

varying vec3 vColor;
varying float vAlpha;

uniform float uTime;

void main() {
  // Calculate distance from center of point
  vec2 uv = gl_PointCoord - vec2(0.5);
  float distanceToCenter = length(uv);
  
  // Create circular particle with soft edges
  float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
  
  // Add glow effect
  float glow = 1.0 - smoothstep(0.0, 0.8, distanceToCenter);
  strength = mix(strength, glow, 0.3);
  
  // Discard fragments outside the circle
  if (distanceToCenter > 0.5) {
    discard;
  }
  
  // Add subtle pulse animation
  float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
  strength *= pulse;
  
  // Apply color and alpha
  vec3 finalColor = vColor * strength;
  float finalAlpha = strength * vAlpha;
  
  // Add subtle sparkle effect to random particles
  float sparkle = sin(uTime * 10.0 + gl_FragCoord.x * 0.1 + gl_FragCoord.y * 0.1);
  if (sparkle > 0.95) {
    finalColor += vec3(0.3);
  }
  
  // Output final color with transparency
  gl_FragColor = vec4(finalColor, finalAlpha);
  
  // Apply gamma correction for better visuals
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0 / 2.2));
}