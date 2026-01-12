import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ParticleSystem from './ParticleSystem';
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
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8a2be2" />

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

        {/* Main Particle System */}
        <Suspense fallback={null}>
          <ParticleSystem count={PARTICLE_CONFIG.COUNT} />
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

        {/* Orbit Controls for user interaction (subtle) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene;