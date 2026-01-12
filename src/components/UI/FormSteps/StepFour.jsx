import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormContainer from '../FormContainer';
import Button from '../Button';
import useFormState from '../../../hooks/useFormState';
import { FORM_STEPS, COSMIC_SYMBOLS } from '../../../utils/constants';

/**
 * StepFour Component - Symbol/Trait Selection
 * User selects a cosmic symbol representing their personality
 */
const StepFour = () => {
  const { nextStep, prevStep, setSymbol, profileData } = useFormState();
  const [selectedSymbol, setSelectedSymbol] = useState(profileData.symbol || null);

  const handleSymbolSelect = (symbolId) => {
    setSelectedSymbol(symbolId);
    setSymbol(symbolId);
  };

  const handleNext = () => {
    if (selectedSymbol) {
      nextStep();
    }
  };

  const symbolCardStyles = (isSelected) => ({
    position: 'relative',
    padding: '1.5rem',
    borderRadius: 'var(--radius-lg)',
    border: isSelected
      ? '3px solid rgba(138, 43, 226, 0.8)'
      : '2px solid rgba(255, 255, 255, 0.1)',
    background: isSelected
      ? 'rgba(138, 43, 226, 0.15)'
      : 'rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: isSelected
      ? '0 0 30px rgba(138, 43, 226, 0.5)'
      : '0 4px 15px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0.5rem'
  });

  const iconStyles = {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    filter: 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.6))'
  };

  const symbolNameStyles = {
    fontSize: '1.3rem',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
    color: '#ffffff',
    marginBottom: '0.5rem'
  };

  const descriptionStyles = {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.4'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    width: '100%',
    marginTop: '1.5rem'
  };

  return (
    <FormContainer
      title="Choose Your Symbol"
      subtitle="Select a symbol that represents you"
      step={FORM_STEPS.SYMBOL}
      totalSteps={5}
    >
      {/* Symbol Selection Grid */}
      <div style={gridStyles}>
        {Object.values(COSMIC_SYMBOLS).map((symbol, index) => (
          <motion.div
            key={symbol.id}
            style={symbolCardStyles(selectedSymbol === symbol.id)}
            onClick={() => handleSymbolSelect(symbol.id)}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(138, 43, 226, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
          >
            {/* Symbol Icon */}
            <motion.div
              style={iconStyles}
              animate={selectedSymbol === symbol.id ? {
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {symbol.icon}
            </motion.div>

            {/* Symbol Name */}
            <div style={symbolNameStyles}>{symbol.name}</div>

            {/* Description */}
            <div style={descriptionStyles}>{symbol.description}</div>

            {/* Selected Indicator */}
            {selectedSymbol === symbol.id && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '1.2rem'
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Helper Text */}
      {selectedSymbol && (
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
          ✨ Your particles will morph into a unique 3D shape
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
        transition={{ delay: 0.6 }}
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
          disabled={!selectedSymbol}
          style={{ flex: 2 }}
        >
          Complete
        </Button>
      </motion.div>
    </FormContainer>
  );
};

export default StepFour;