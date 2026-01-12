import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useFormState from '../../hooks/useFormState';
import { CAMERA_CONFIG, FORM_STEPS } from '../../utils/constants';

/**
 * CameraController Component
 * Smoothly animates camera position and rotation based on form steps
 */
const CameraController = () => {
  const { camera } = useThree();
  const { currentStep, isTransitioning } = useFormState();
  
  const targetPosition = useRef(new THREE.Vector3(...CAMERA_CONFIG.INITIAL_POSITION));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const animationProgress = useRef(0);

  /**
   * Get camera position for current step
   */
  const getCameraPositionForStep = (step) => {
    switch (step) {
      case FORM_STEPS.WELCOME:
        return new THREE.Vector3(...CAMERA_CONFIG.POSITIONS.WELCOME);
      case FORM_STEPS.NAME:
        return new THREE.Vector3(...CAMERA_CONFIG.POSITIONS.NAME);
      case FORM_STEPS.COLORS:
        return new THREE.Vector3(...CAMERA_CONFIG.POSITIONS.COLORS);
      case FORM_STEPS.SYMBOL:
        return new THREE.Vector3(...CAMERA_CONFIG.POSITIONS.SYMBOL);
      case FORM_STEPS.FINAL:
        return new THREE.Vector3(...CAMERA_CONFIG.POSITIONS.FINAL);
      default:
        return new THREE.Vector3(...CAMERA_CONFIG.INITIAL_POSITION);
    }
  };

  /**
   * Trigger camera movement when step changes
   */
  useEffect(() => {
    targetPosition.current = getCameraPositionForStep(currentStep);
    isAnimating.current = true;
    animationProgress.current = 0;
  }, [currentStep]);

  /**
   * Smooth camera animation loop
   */
  useFrame((state, delta) => {
    if (!isAnimating.current) {
      // Gentle camera sway when idle
      const time = state.clock.getElapsedTime();
      camera.position.x += Math.sin(time * 0.2) * 0.005;
      camera.position.y += Math.cos(time * 0.3) * 0.003;
      camera.lookAt(0, 0, 0);
      return;
    }

    // Animate camera to target position
    animationProgress.current += delta / CAMERA_CONFIG.TRANSITION_DURATION;
    
    if (animationProgress.current >= 1) {
      animationProgress.current = 1;
      isAnimating.current = false;
    }

    // Smooth easing function
    const easeProgress = easeInOutCubic(animationProgress.current);

    // Interpolate position
    camera.position.lerp(targetPosition.current, easeProgress * 0.1);
    
    // Always look at center
    camera.lookAt(targetLookAt.current);
  });

  /**
   * Add subtle rotation during final step
   */
  useFrame(({ clock }) => {
    if (currentStep === FORM_STEPS.FINAL && !isAnimating.current) {
      const time = clock.getElapsedTime();
      const radius = 20;
      const speed = 0.1;
      
      camera.position.x = Math.sin(time * speed) * radius;
      camera.position.z = Math.cos(time * speed) * radius;
      camera.position.y = 5 + Math.sin(time * speed * 0.5) * 2;
      camera.lookAt(0, 0, 0);
    }
  });

  /**
   * Easing function for smooth animations
   */
  const easeInOutCubic = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  /**
   * Handle window resize
   */
  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  // This component doesn't render anything
  return null;
};

export default CameraController;