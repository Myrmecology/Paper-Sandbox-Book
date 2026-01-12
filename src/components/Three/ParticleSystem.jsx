import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useFormState from '../../hooks/useFormState';
import { PARTICLE_CONFIG, FORM_STEPS, COSMIC_SYMBOLS } from '../../utils/constants';
import {
  generateSpherePositions,
  generateTextPositions,
  generateGeometryPositions,
  interpolatePositions,
  easeInOutCubic,
  applyColorTheme
} from '../../utils/morphHelpers';
import particleVertexShader from '../../shaders/particleVertex.glsl';
import particleFragmentShader from '../../shaders/particleFragment.glsl';

/**
 * ParticleSystem Component
 * Renders the main particle system with custom shaders and handles morphing
 */
const ParticleSystem = ({ count = PARTICLE_CONFIG.COUNT }) => {
  const particlesRef = useRef();
  const { currentStep, profileData } = useFormState();
  
  const morphStateRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 2000,
    fromPositions: null,
    toPositions: null
  });

  // Initialize particle positions
  const initialPositions = useMemo(() => {
    return generateSpherePositions(count, 8);
  }, [count]);

  // Initialize particle sizes
  const particleSizes = useMemo(() => {
    const sizes = new Float32Array(count);
    const [minSize, maxSize] = PARTICLE_CONFIG.SIZE_RANGE;
    
    for (let i = 0; i < count; i++) {
      sizes[i] = minSize + Math.random() * (maxSize - minSize);
    }
    
    return sizes;
  }, [count]);

  // Initialize particle colors
  const initialColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;
    }
    
    return colors;
  }, [count]);

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: PARTICLE_CONFIG.SIZE }
  }), []);

  // Create geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(initialPositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(initialColors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    return geo;
  }, [initialPositions, initialColors, particleSizes]);

  // Create material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
  }, [uniforms]);

  // Start morph animation
  const startMorph = (targetPositions) => {
    if (!particlesRef.current) return;

    const currentPositions = particlesRef.current.geometry.attributes.position.array;
    
    morphStateRef.current = {
      isAnimating: true,
      startTime: Date.now(),
      duration: 2000,
      fromPositions: new Float32Array(currentPositions),
      toPositions: targetPositions
    };
  };

  // Handle morphing based on current step
  useEffect(() => {
    const handleMorph = async () => {
      switch (currentStep) {
        case FORM_STEPS.WELCOME:
          startMorph(generateSpherePositions(count, 8));
          break;

        case FORM_STEPS.NAME:
          if (profileData.name && profileData.name.trim()) {
            try {
              const textPositions = await generateTextPositions(profileData.name.toUpperCase(), count);
              startMorph(textPositions);
            } catch (error) {
              console.error('Text morphing failed:', error);
              startMorph(generateSpherePositions(count, 6));
            }
          } else {
            startMorph(generateSpherePositions(count, 6));
          }
          break;

        case FORM_STEPS.COLORS:
          startMorph(generateGeometryPositions('sphere', count, { radius: 4 }));
          break;

        case FORM_STEPS.SYMBOL:
          if (profileData.symbol) {
            const symbolData = COSMIC_SYMBOLS[profileData.symbol.toUpperCase()];
            if (symbolData) {
              startMorph(generateGeometryPositions(symbolData.geometry, count, { radius: 4 }));
            }
          } else {
            startMorph(generateSpherePositions(count, 5));
          }
          break;

        case FORM_STEPS.FINAL:
          setTimeout(() => {
            startMorph(generateGeometryPositions('torus', count, { radius: 5, tube: 1.5 }));
          }, 500);
          break;

        default:
          startMorph(generateSpherePositions(count, 6));
      }
    };

    handleMorph();
  }, [currentStep, count]);

  // Update colors when theme changes
  useEffect(() => {
    if (profileData.colorTheme && particlesRef.current) {
      const newColors = applyColorTheme(profileData.colorTheme, count);
      particlesRef.current.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(newColors, 3)
      );
    }
  }, [profileData.colorTheme, count]);

  // Handle name changes in real-time
  useEffect(() => {
    const morphName = async () => {
      if (currentStep === FORM_STEPS.NAME && profileData.name && profileData.name.trim()) {
        try {
          const textPositions = await generateTextPositions(profileData.name.toUpperCase(), count);
          startMorph(textPositions);
        } catch (error) {
          console.error('Text morphing failed:', error);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      morphName();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [profileData.name, currentStep, count]);

  // Animation loop for morphing
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    // Update time uniform
    if (uniforms.uTime) {
      uniforms.uTime.value = clock.getElapsedTime();
    }

    // Handle morphing animation
    if (morphStateRef.current.isAnimating) {
      const { startTime, duration, fromPositions, toPositions } = morphStateRef.current;
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      const newPositions = interpolatePositions(fromPositions, toPositions, easedProgress);
      particlesRef.current.geometry.attributes.position.array.set(newPositions);
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      if (progress >= 1) {
        morphStateRef.current.isAnimating = false;
      }
    } else {
      // Add subtle floating animation when not morphing
      const positions = particlesRef.current.geometry.attributes.position.array;
      const time = clock.getElapsedTime();

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const offset = Math.sin(time + i * 0.01) * 0.02;
        positions[i3 + 1] += offset * 0.1;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry} material={material} />
  );
};

export default ParticleSystem;