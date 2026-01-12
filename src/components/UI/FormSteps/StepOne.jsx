import React from 'react';
import { motion } from 'framer-motion';
import FormContainer from '../FormContainer';
import Button from '../Button';
import useFormState from '../../../hooks/useFormState';
import { FORM_STEPS } from '../../../utils/constants';

/**
 * StepOne Component - Welcome Screen
 * Introduction to the Cosmic Profile Builder experience
 */
const StepOne = () => {
  const { nextStep } = useFormState();

  const logoStyles = {
    fontSize: '4rem',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 0 20px rgba(138, 43, 226, 0.6))'
  };

  const featureListStyles = {
    listStyle: 'none',
    padding: 0,
    margin: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'left'
  };

  const featureItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)'
  };

  const iconStyles = {
    fontSize: '1.5rem',
    minWidth: '30px',
    textAlign: 'center'
  };

  return (
    <FormContainer
      title="Cosmic Profile Builder"
      subtitle="Create your personalized universe with stunning particle effects"
      step={FORM_STEPS.WELCOME}
      totalSteps={5}
    >
      {/* Cosmic Logo/Icon */}
      <motion.div
        style={logoStyles}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        🌌
      </motion.div>

      {/* Feature List */}
      <motion.ul
        style={featureListStyles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, staggerChildren: 0.1 }}
      >
        <motion.li
          style={featureItemStyles}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span style={iconStyles}>✨</span>
          <span>50,000+ particles morphing in real-time</span>
        </motion.li>
        <motion.li
          style={featureItemStyles}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <span style={iconStyles}>🎨</span>
          <span>Customize colors and cosmic themes</span>
        </motion.li>
        <motion.li
          style={featureItemStyles}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span style={iconStyles}>🚀</span>
          <span>Interactive 3D universe creation</span>
        </motion.li>
        <motion.li
          style={featureItemStyles}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span style={iconStyles}>🌟</span>
          <span>Smooth camera animations and transitions</span>
        </motion.li>
      </motion.ul>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        style={{ marginTop: '2rem', width: '100%' }}
      >
        <Button
          onClick={nextStep}
          variant="primary"
          fullWidth
        >
          Begin Your Journey
        </Button>
      </motion.div>

      {/* Additional Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.5)',
          fontStyle: 'italic'
        }}
      >
        Takes only 3 steps • Experience the magic ✨
      </motion.p>
    </FormContainer>
  );
};

export default StepOne;