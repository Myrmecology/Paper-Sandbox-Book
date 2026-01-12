import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

/* ============================================
   PARTICLE POSITION GENERATORS
   ============================================ */

/**
 * Generate random positions in a sphere
 */
export const generateSpherePositions = (count, radius = 5) => {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  
  return positions;
};

/**
 * Generate positions from text geometry
 */
export const generateTextPositions = async (text, count, fontUrl = '/fonts/helvetiker_regular.typeface.json') => {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader();
    
    loader.load(
      fontUrl,
      (font) => {
        const geometry = new TextGeometry(text, {
          font: font,
          size: 2,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelSegments: 5
        });
        
        geometry.center();
        geometry.computeBoundingBox();
        
        const positions = sampleGeometryPositions(geometry, count);
        geometry.dispose();
        
        resolve(positions);
      },
      undefined,
      (error) => {
        console.error('Error loading font:', error);
        reject(error);
      }
    );
  });
};

/**
 * Generate positions from a geometry (planet, crystal, etc.)
 */
export const generateGeometryPositions = (geometryType, count, params = {}) => {
  let geometry;
  
  switch (geometryType) {
    case 'sphere':
      geometry = new THREE.SphereGeometry(params.radius || 3, 64, 64);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(params.radius || 3, params.tube || 1, 32, 64);
      break;
    case 'crystal':
      geometry = new THREE.OctahedronGeometry(params.radius || 3, 0);
      break;
    case 'ring':
      geometry = new THREE.TorusGeometry(params.radius || 4, params.tube || 0.3, 16, 100);
      break;
    case 'spaceship':
      geometry = createSpaceshipGeometry(params);
      break;
    case 'stars':
      return generateStarFieldPositions(count, params.spread || 10);
    default:
      geometry = new THREE.SphereGeometry(3, 32, 32);
  }
  
  const positions = sampleGeometryPositions(geometry, count);
  geometry.dispose();
  
  return positions;
};

/**
 * Sample positions from a geometry
 */
const sampleGeometryPositions = (geometry, count) => {
  const positions = new Float32Array(count * 3);
  const vertices = geometry.attributes.position.array;
  const vertexCount = vertices.length / 3;
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * vertexCount) * 3;
    
    positions[i * 3] = vertices[randomIndex];
    positions[i * 3 + 1] = vertices[randomIndex + 1];
    positions[i * 3 + 2] = vertices[randomIndex + 2];
    
    // Add slight randomness for organic look
    const offset = 0.1;
    positions[i * 3] += (Math.random() - 0.5) * offset;
    positions[i * 3 + 1] += (Math.random() - 0.5) * offset;
    positions[i * 3 + 2] += (Math.random() - 0.5) * offset;
  }
  
  return positions;
};

/**
 * Generate star field positions
 */
const generateStarFieldPositions = (count, spread = 10) => {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Create clusters of stars
    const clusterX = (Math.random() - 0.5) * spread;
    const clusterY = (Math.random() - 0.5) * spread;
    const clusterZ = (Math.random() - 0.5) * spread;
    
    const localSpread = 2;
    positions[i * 3] = clusterX + (Math.random() - 0.5) * localSpread;
    positions[i * 3 + 1] = clusterY + (Math.random() - 0.5) * localSpread;
    positions[i * 3 + 2] = clusterZ + (Math.random() - 0.5) * localSpread;
  }
  
  return positions;
};

/**
 * Create custom spaceship geometry
 */
const createSpaceshipGeometry = (params = {}) => {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  // Simple spaceship shape (cone + wings)
  const height = params.height || 4;
  const width = params.width || 2;
  
  // Main body (cone)
  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * Math.PI * 2;
    const radius = (1 - i / 100) * width;
    const y = (i / 100) * height - height / 2;
    
    vertices.push(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }
  
  // Wings
  for (let i = 0; i < 50; i++) {
    const t = i / 50;
    vertices.push(
      -width * 1.5 * t,
      -height * 0.3,
      0
    );
    vertices.push(
      width * 1.5 * t,
      -height * 0.3,
      0
    );
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return geometry;
};

/* ============================================
   MORPHING UTILITIES
   ============================================ */

/**
 * Interpolate between two position arrays
 */
export const interpolatePositions = (from, to, progress) => {
  const result = new Float32Array(from.length);
  
  for (let i = 0; i < from.length; i++) {
    result[i] = from[i] + (to[i] - from[i]) * progress;
  }
  
  return result;
};

/**
 * Create smooth easing function for morphing
 */
export const easeInOutCubic = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Create smooth easing function (alternative)
 */
export const easeOutExpo = (t) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

/* ============================================
   COLOR UTILITIES
   ============================================ */

/**
 * Generate color gradient for particles
 */
export const generateColorGradient = (color1, color2, count) => {
  const c1 = new THREE.Color(color1);
  const c2 = new THREE.Color(color2);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const color = c1.clone().lerp(c2, t);
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  return colors;
};

/**
 * Apply color theme to particles
 */
export const applyColorTheme = (theme, count) => {
  const colors = new Float32Array(count * 3);
  const primaryColor = new THREE.Color(theme.primary);
  const accentColor = new THREE.Color(theme.accent);
  
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const color = primaryColor.clone().lerp(accentColor, t);
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  return colors;
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Normalize positions to fit within bounds
 */
export const normalizePositions = (positions, maxBound = 5) => {
  let maxDistance = 0;
  
  for (let i = 0; i < positions.length; i += 3) {
    const distance = Math.sqrt(
      positions[i] ** 2 +
      positions[i + 1] ** 2 +
      positions[i + 2] ** 2
    );
    maxDistance = Math.max(maxDistance, distance);
  }
  
  const scale = maxBound / maxDistance;
  
  for (let i = 0; i < positions.length; i++) {
    positions[i] *= scale;
  }
  
  return positions;
};

/**
 * Add random offset to positions for variety
 */
export const addRandomOffset = (positions, amount = 0.1) => {
  const result = new Float32Array(positions.length);
  
  for (let i = 0; i < positions.length; i++) {
    result[i] = positions[i] + (Math.random() - 0.5) * amount;
  }
  
  return result;
};