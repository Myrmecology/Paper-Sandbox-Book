import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useParticles from '../../hooks/useParticles';
import { PARTICLE_CONFIG } from '../../utils/constants';
import particleVertexShader from '../../shaders/particleVertex.glsl';
import particleFragmentShader from '../../shaders/particleFragment.glsl';

/**
 * ParticleSystem Component
 * Renders the main particle system with custom shaders
 */
const ParticleSystem = ({ count = PARTICLE_CONFIG.COUNT }) => {
  const {
    particlesRef,
    initialPositions,
    initialColors,
    particleSizes
  } = useParticles(count);

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: PARTICLE_CONFIG.SIZE }
  }), []);

  // Update time uniform for animations
  useFrame(({ clock }) => {
    if (uniforms.uTime) {
      uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // Create particle geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    
    geo.setAttribute('position', new THREE.BufferAttribute(initialPositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(initialColors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    return geo;
  }, [initialPositions, initialColors, particleSizes]);

  // Create shader material
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

  return (
    <points ref={particlesRef} geometry={geometry} material={material} />
  );
};

export default ParticleSystem;