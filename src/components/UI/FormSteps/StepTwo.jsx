import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormContainer from '../FormContainer';
import Button from '../Button';
import useFormState from '../../../hooks/useFormState';
import { FORM_STEPS } from '../../../utils/constants';

/**
 * StepTwo Component - Name Input
 * User enters their name which morphs particles into 3D text
 */
const StepTwo = () => {
  const { nextStep, prevStep, setName, profileData, validateCurrentStep } = useFormState();
  const [localName, setLocalName] = useState(profileData.name || '');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    
    // Only allow letters, spaces, and limit to 15 characters
    if (value.length <= 15) {
      setLocalName(value);
      setName(value);
      setError('');
    }
  };

  const handleNext = () => {
    if (!localName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (localName.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    nextStep();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const inputStyles = {
    width: '100%',
    padding: '1.2rem 1.5rem',
    fontSize: '1.5rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(138, 43, 226, 0.3)',
    borderRadius: 'var(--radius-lg)',
    color: '#ffffff',
    outline: 'none',
    transition: 'all var(--transition-normal)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  };

  const inputFocusStyles = {
    borderColor: 'rgba(138, 43, 226, 0.8)',
    boxShadow: '0 0 20px rgba(138, 43, 226, 0.4)',
    background: 'rgba(255, 255, 255, 0.08)'
  };

  const errorStyles = {
    color: '#ff006e',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    fontWeight: '500'
  };

  const charCountStyles = {
    fontSize: '0.85rem',
    color: localName.length >= 12 ? '#ffbe0b' : 'rgba(255, 255, 255, 0.5)',
    marginTop: '0.5rem',
    fontStyle: 'italic'
  };

  return (
    <FormContainer
      title="What's Your Name?"
      subtitle="Watch your name come alive in 3D particles"
      step={FORM_STEPS.NAME}
      totalSteps={5}
    >
      {/* Name Input Field */}
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          value={localName}
          onChange={handleNameChange}
          onKeyPress={handleKeyPress}
          placeholder="ENTER YOUR NAME"
          style={inputStyles}
          onFocus={(e) => {
            Object.assign(e.target.style, inputFocusStyles);
          }}
          onBlur={(e) => {
            if (!localName) {
              e.target.style.borderColor = 'rgba(138, 43, 226, 0.3)';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          autoFocus
        />
        
        {/* Character Count */}
        {localName && (
          <motion.div
            style={charCountStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localName.length} / 15 characters
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            style={errorStyles}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>

      {/* Helper Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginTop: '1rem'
        }}
      >
        💫 Your name will transform into stunning 3D text
      </motion.p>

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
          disabled={!localName.trim()}
          style={{ flex: 2 }}
        >
          Continue
        </Button>
      </motion.div>
    </FormContainer>
  );
};

export default StepTwo;