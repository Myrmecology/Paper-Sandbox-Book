import React, { useEffect } from 'react';
import useFormState from '../../hooks/useFormState';
import useParticles from '../../hooks/useParticles';
import { FORM_STEPS, COSMIC_SYMBOLS } from '../../utils/constants';

/**
 * MorphingObjects Component
 * Handles particle morphing based on form state changes
 * Orchestrates the visual transformations throughout the user journey
 */
const MorphingObjects = () => {
  const { currentStep, profileData } = useFormState();
  const {
    morphToText,
    morphToGeometry,
    morphToSphere,
    updateColors,
    explodeParticles
  } = useParticles();

  /**
   * Handle step transitions and morph particles accordingly
   */
  useEffect(() => {
    const handleMorph = async () => {
      switch (currentStep) {
        case FORM_STEPS.WELCOME:
          // Initial state - random sphere
          morphToSphere(8);
          break;

        case FORM_STEPS.NAME:
          // Morph to user's name if entered
          if (profileData.name && profileData.name.trim()) {
            await morphToText(profileData.name.toUpperCase());
          } else {
            morphToSphere(6);
          }
          break;

        case FORM_STEPS.COLORS:
          // Morph to planet/sphere when selecting colors
          morphToGeometry('sphere', { radius: 4 });
          break;

        case FORM_STEPS.SYMBOL:
          // Morph based on selected symbol
          if (profileData.symbol) {
            const symbolData = COSMIC_SYMBOLS[profileData.symbol.toUpperCase()];
            if (symbolData) {
              morphToGeometry(symbolData.geometry, { radius: 4 });
            }
          } else {
            morphToSphere(5);
          }
          break;

        case FORM_STEPS.FINAL:
          // Final reveal - dramatic transformation
          setTimeout(() => {
            morphToGeometry('torus', { radius: 5, tube: 1.5 });
          }, 500);
          break;

        default:
          morphToSphere(6);
      }
    };

    handleMorph();
  }, [currentStep, profileData.name, profileData.symbol]);

  /**
   * Update particle colors when color theme changes
   */
  useEffect(() => {
    if (profileData.colorTheme) {
      updateColors(profileData.colorTheme);
    }
  }, [profileData.colorTheme, updateColors]);

  /**
   * Handle name changes in real-time
   */
  useEffect(() => {
    const morphName = async () => {
      if (currentStep === FORM_STEPS.NAME && profileData.name && profileData.name.trim()) {
        await morphToText(profileData.name.toUpperCase());
      }
    };

    // Debounce text morphing to avoid excessive updates
    const timeoutId = setTimeout(() => {
      morphName();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [profileData.name, currentStep]);

  // This component doesn't render anything visible
  // It only manages particle morphing logic
  return null;
};

export default MorphingObjects;