import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ParticleSystem from './ParticleSystem';
import CosmicObjects from './CosmicObjects';
import MorphingObjects from './MorphingObjects';
import CameraController from './CameraController';
import Effects from './Effects';
import { CAMERA_CONFIG, PARTICLE_CONFIG, PERFORMANCE_CONFIG } from '../../utils/constants';

/**
 * Scene Component
 * Main Three.js canvas that renders the entire 3D experience
 */
const Scene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
      <Canvas
        camera={{
          fov: CAMERA_CONFIG.FOV,
          near: CAMERA_CONFIG.NEAR,
          far: CAMERA_CONFIG.FAR,
          position: CAMERA_CONFIG.INITIAL_POSITION
        }}
        dpr={PERFORMANCE_CONFIG.PIXEL_RATIO}
        gl={{
          antialias: PERFORMANCE_CONFIG.ANTIALIAS,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Ambient Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />
        <pointLight position={[0, 10, -10]} intensity={0.7} color="#00d9ff" />

        {/* Background Stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Main Particle System (reduced count) */}
        <Suspense fallback={null}>
          <ParticleSystem count={PARTICLE_CONFIG.COUNT} />
        </Suspense>

        {/* 3D Cosmic Objects (planets, rings, orbitals) */}
        <Suspense fallback={null}>
          <CosmicObjects />
        </Suspense>

        {/* Morphing Logic Controller */}
        <MorphingObjects />

        {/* Camera Animation Controller */}
        <CameraController />

        {/* Post-Processing Effects */}
        {PERFORMANCE_CONFIG.ENABLE_POSTPROCESSING && (
          <Suspense fallback={null}>
            <Effects />
          </Suspense>
        )}

        {/* Orbit Controls for user interaction */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.3}
          zoomSpeed={0.5}
          minDistance={10}
          maxDistance={50}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene;