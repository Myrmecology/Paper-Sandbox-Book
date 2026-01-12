import React from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { EFFECTS_CONFIG } from '../../utils/constants';

/**
 * Effects Component
 * Applies post-processing effects for enhanced visuals
 * Includes bloom, chromatic aberration, and vignette
 */
const Effects = () => {
  return (
    <EffectComposer>
      {/* Bloom Effect - Creates glowing particles */}
      <Bloom
        intensity={EFFECTS_CONFIG.BLOOM.intensity}
        luminanceThreshold={EFFECTS_CONFIG.BLOOM.luminanceThreshold}
        luminanceSmoothing={EFFECTS_CONFIG.BLOOM.luminanceSmoothing}
        mipmapBlur={EFFECTS_CONFIG.BLOOM.mipmapBlur}
        blendFunction={BlendFunction.ADD}
      />

      {/* Chromatic Aberration - Adds color fringing for cosmic feel */}
      <ChromaticAberration
        offset={EFFECTS_CONFIG.CHROMATIC_ABERRATION.offset}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Vignette - Darkens edges for depth */}
      <Vignette
        offset={EFFECTS_CONFIG.VIGNETTE.offset}
        darkness={EFFECTS_CONFIG.VIGNETTE.darkness}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};

export default Effects;