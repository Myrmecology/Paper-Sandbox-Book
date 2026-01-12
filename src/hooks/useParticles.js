import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  generateSpherePositions,
  generateTextPositions,
  generateGeometryPositions,
  interpolatePositions,
  easeInOutCubic,
  applyColorTheme
} from '../utils/morphHelpers';
import { PARTICLE_CONFIG } from '../utils/constants';

/**
 * Custom hook for managing particle system state and animations
 * Handles morphing, colors, and particle behavior
 */
const useParticles = (particleCount = PARTICLE_CONFIG.COUNT) => {
  const particlesRef = useRef();
  const morphStateRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: PARTICLE_CONFIG.MORPH_DURATION,
    fromPositions: null,
    toPositions: null,
    currentPositions: null
  });

  /**
   * Initialize particle positions (random sphere)
   */
  const initialPositions = useMemo(() => {
    return generateSpherePositions(particleCount, 8);
  }, [particleCount]);

  /**
   * Initialize particle sizes with variation
   */
  const particleSizes = useMemo(() => {
    const sizes = new Float32Array(particleCount);
    const [minSize, maxSize] = PARTICLE_CONFIG.SIZE_RANGE;
    
    for (let i = 0; i < particleCount; i++) {
      sizes[i] = minSize + Math.random() * (maxSize - minSize);
    }
    
    return sizes;
  }, [particleCount]);

  /**
   * Initialize particle colors (default white)
   */
  const initialColors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      colors[i * 3] = 1.0;     // R
      colors[i * 3 + 1] = 1.0; // G
      colors[i * 3 + 2] = 1.0; // B
    }
    
    return colors;
  }, [particleCount]);

  /**
   * Morph particles to text shape
   */
  const morphToText = async (text) => {
    try {
      const targetPositions = await generateTextPositions(text, particleCount);
      startMorph(targetPositions);
    } catch (error) {
      console.error('Failed to morph to text:', error);
      // Fallback to sphere
      const fallbackPositions = generateSpherePositions(particleCount, 5);
      startMorph(fallbackPositions);
    }
  };

  /**
   * Morph particles to geometry shape
   */
  const morphToGeometry = (geometryType, params = {}) => {
    const targetPositions = generateGeometryPositions(geometryType, particleCount, params);
    startMorph(targetPositions);
  };

  /**
   * Morph particles to sphere
   */
  const morphToSphere = (radius = 5) => {
    const targetPositions = generateSpherePositions(particleCount, radius);
    startMorph(targetPositions);
  };

  /**
   * Start morphing animation
   */
  const startMorph = (targetPositions) => {
    if (!particlesRef.current) return;

    const currentPositions = particlesRef.current.geometry.attributes.position.array;
    
    morphStateRef.current = {
      isAnimating: true,
      startTime: Date.now(),
      duration: PARTICLE_CONFIG.MORPH_DURATION * 1000,
      fromPositions: new Float32Array(currentPositions),
      toPositions: targetPositions,
      currentPositions: new Float32Array(currentPositions)
    };
  };

  /**
   * Update particle colors based on theme
   */
  const updateColors = (colorTheme) => {
    if (!particlesRef.current) return;

    const newColors = applyColorTheme(colorTheme, particleCount);
    particlesRef.current.geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(newColors, 3)
    );
  };

  /**
   * Animation loop for morphing
   */
  useFrame(() => {
    if (!particlesRef.current || !morphStateRef.current.isAnimating) return;

    const { startTime, duration, fromPositions, toPositions } = morphStateRef.current;
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    // Interpolate positions
    const newPositions = interpolatePositions(fromPositions, toPositions, easedProgress);
    
    particlesRef.current.geometry.attributes.position.array.set(newPositions);
    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // End animation
    if (progress >= 1) {
      morphStateRef.current.isAnimating = false;
    }
  });

  /**
   * Add subtle floating animation to particles
   */
  useFrame(({ clock }) => {
    if (!particlesRef.current || morphStateRef.current.isAnimating) return;

    const positions = particlesRef.current.geometry.attributes.position.array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Add gentle wave motion
      const offset = Math.sin(time + i * 0.01) * 0.02;
      positions[i3 + 1] += offset * 0.1;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  /**
   * Reset particles to initial state
   */
  const resetParticles = () => {
    if (!particlesRef.current) return;

    particlesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(initialPositions, 3)
    );
    particlesRef.current.geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(initialColors, 3)
    );

    morphStateRef.current.isAnimating = false;
  };

  /**
   * Explode particles outward
   */
  const explodeParticles = () => {
    const targetPositions = generateSpherePositions(particleCount, 20);
    startMorph(targetPositions);
  };

  /**
   * Implode particles inward
   */
  const implodeParticles = () => {
    const targetPositions = generateSpherePositions(particleCount, 0.5);
    startMorph(targetPositions);
  };

  return {
    particlesRef,
    initialPositions,
    initialColors,
    particleSizes,
    morphToText,
    morphToGeometry,
    morphToSphere,
    updateColors,
    resetParticles,
    explodeParticles,
    implodeParticles,
    isAnimating: morphStateRef.current.isAnimating
  };
};

export default useParticles;