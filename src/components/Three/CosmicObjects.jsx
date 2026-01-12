import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useFormState from '../../hooks/useFormState';
import { FORM_STEPS } from '../../utils/constants';

/**
 * CosmicObjects Component
 * Renders planets, rings, orbitals, and other 3D objects based on user choices
 */
const CosmicObjects = () => {
  const { currentStep, profileData } = useFormState();
  const groupRef = useRef();

  // Animate the entire group
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  // Don't render objects until colors step
  if (currentStep < FORM_STEPS.COLORS) {
    return null;
  }

  const colors = profileData.colorTheme || {
    primary: '#8a2be2',
    secondary: '#9d4edd',
    accent: '#c77dff'
  };

  return (
    <group ref={groupRef}>
      {/* Central Planet */}
      <CentralPlanet color={colors.primary} />

      {/* Orbital Rings */}
      <OrbitalRing radius={8} color={colors.secondary} speed={0.3} />
      <OrbitalRing radius={12} color={colors.accent} speed={-0.2} />
      <OrbitalRing radius={16} color={colors.primary} speed={0.15} tilt={Math.PI / 4} />

      {/* Orbiting Moons/Objects */}
      <OrbitingObject radius={8} color={colors.accent} size={0.5} speed={0.5} />
      <OrbitingObject radius={12} color={colors.secondary} size={0.7} speed={-0.3} offset={Math.PI} />
      <OrbitingObject radius={16} color={colors.primary} size={0.4} speed={0.2} offset={Math.PI / 2} />

      {/* Energy Field */}
      <EnergyField color={colors.primary} />

      {/* Floating Crystals (only if symbol is selected) */}
      {currentStep >= FORM_STEPS.SYMBOL && profileData.symbol && (
        <FloatingCrystals color={colors.accent} />
      )}

      {/* Final Step: Add nebula clouds */}
      {currentStep === FORM_STEPS.FINAL && (
        <NebulaClouds color={colors.secondary} />
      )}
    </group>
  );
};

/**
 * Central Planet Component
 */
const CentralPlanet = ({ color }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

/**
 * Orbital Ring Component
 */
const OrbitalRing = ({ radius, color, speed, tilt = 0 }) => {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

/**
 * Orbiting Object Component
 */
const OrbitingObject = ({ radius, color, size, speed, offset = 0 }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed + offset;
      meshRef.current.position.x = Math.cos(time) * radius;
      meshRef.current.position.z = Math.sin(time) * radius;
      meshRef.current.rotation.y = time * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.0}
      />
    </mesh>
  );
};

/**
 * Energy Field Component (wireframe sphere)
 */
const EnergyField = ({ color }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

/**
 * Floating Crystals Component
 */
const FloatingCrystals = ({ color }) => {
  const crystals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.3
    }));
  }, []);

  return (
    <>
      {crystals.map((crystal, i) => (
        <Crystal key={i} {...crystal} color={color} />
      ))}
    </>
  );
};

const Crystal = ({ position, rotation, scale, speed, color }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * speed;
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

/**
 * Nebula Clouds Component
 */
const NebulaClouds = ({ color }) => {
  const clouds = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ],
      scale: 2 + Math.random() * 3
    }));
  }, []);

  return (
    <>
      {clouds.map((cloud, i) => (
        <NebulaCloud key={i} {...cloud} color={color} />
      ))}
    </>
  );
};

const NebulaCloud = ({ position, scale, color }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      const pulse = 1 + Math.sin(clock.getElapsedTime() + position[0]) * 0.2;
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
};

export default CosmicObjects;