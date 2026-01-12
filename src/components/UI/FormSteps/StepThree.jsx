import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormContainer from '../FormContainer';
import Button from '../Button';
import useFormState from '../../../hooks/useFormState';
import { FORM_STEPS, COLOR_THEMES } from '../../../utils/constants';

/**
 * StepThree Component - Color Theme Selection
 * User selects a color theme for their cosmic profile
 */
const StepThree = () => {
  const { nextStep, prevStep, setColorTheme, profileData } = useFormState();
  const [selectedTheme, setSelectedTheme] = useState(profileData.colorTheme || null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setColorTheme(theme);
  };

  const handleNext = () => {
    if (selectedTheme) {
      nextStep();
    }
  };

  const colorCardStyles = (theme, isSelected) => ({
    position: 'relative',
    padding: '1.5rem',
    borderRadius: 'var(--radius-lg)',
    border: isSelected
      ? `3px solid ${theme.primary}`
      : '2px solid rgba(255, 255, 255, 0.1)',
    background: isSelected
      ? `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`
      : 'rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: isSelected
      ? `0 0 30px ${theme.primary}60`
      : '0 4px 15px rgba(0, 0, 0, 0.3)'
  });

  const colorSwatchStyles = {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    justifyContent: 'center'
  };

  const swatchStyles = (color) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: color,
    boxShadow: `0 0 15px ${color}60`,
    border: '2px solid rgba(255, 255, 255, 0.2)'
  });

  const themeNameStyles = {
    fontSize: '1.2rem',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
    color: '#ffffff',
    marginBottom: '0.5rem',
    textAlign: 'center'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    width: '100%',
    marginTop: '1.5rem'
  };

  return (
    <FormContainer
      title="Choose Your Cosmos"
      subtitle="Select a color theme for your universe"
      step={FORM_STEPS.COLORS}
      totalSteps={5}
    >
      {/* Color Theme Grid */}
      <div style={gridStyles}>
        {Object.values(COLOR_THEMES).map((theme, index) => (
          <motion.div
            key={theme.id}
            style={colorCardStyles(theme, selectedTheme?.id === theme.id)}
            onClick={() => handleThemeSelect(theme)}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 30px ${theme.primary}60`
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Color Swatches */}
            <div style={colorSwatchStyles}>
              <div style={swatchStyles(theme.primary)} />
              <div style={swatchStyles(theme.secondary)} />
              <div style={swatchStyles(theme.accent)} />
            </div>

            {/* Theme Name */}
            <div style={themeNameStyles}>{theme.name}</div>

            {/* Selected Indicator */}
            {selectedTheme?.id === theme.id && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '1.5rem'
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                ✨
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Helper Text */}
      {selectedTheme && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            marginTop: '1rem'
          }}
        >
          🎨 Watch your universe transform with {selectedTheme.name}
        </motion.p>
      )}

      {/* Navigation Buttons */}
      <motion.div
        style={{
          display: 'flex',
          gap: '1rem',
          width: '100%',
          marginTop: '2rem'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={prevStep}
          variant="secondary"
          style={{ flex: 1 }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="primary"
          disabled={!selectedTheme}
          style={{ flex: 2 }}
        >
          Continue
        </Button>
      </motion.div>
    </FormContainer>
  );
};

export default StepThree;