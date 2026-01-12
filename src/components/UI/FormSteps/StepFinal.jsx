import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FormContainer from '../FormContainer';
import Button from '../Button';
import useFormState from '../../../hooks/useFormState';
import { COSMIC_SYMBOLS } from '../../../utils/constants';

/**
 * StepFinal Component - Final Reveal
 * Shows the completed cosmic profile with epic reveal animation
 */
const StepFinal = () => {
  const { profileData, resetForm, completeProfile } = useFormState();

  // Complete the profile on mount
  useEffect(() => {
    completeProfile();
  }, []);

  const profileCardStyles = {
    width: '100%',
    padding: '2rem',
    background: 'rgba(138, 43, 226, 0.1)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid rgba(138, 43, 226, 0.3)',
    marginTop: '1rem'
  };

  const profileRowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const labelStyles = {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const valueStyles = {
    fontSize: '1.2rem',
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)'
  };

  const colorSwatchStyles = (color) => ({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: color,
    boxShadow: `0 0 15px ${color}80`,
    border: '2px solid rgba(255, 255, 255, 0.3)'
  });

  const symbolData = profileData.symbol 
    ? COSMIC_SYMBOLS[profileData.symbol.toUpperCase()] 
    : null;

  return (
    <FormContainer
      title="Your Universe Awaits"
      subtitle="Your cosmic profile has been created!"
    >
      {/* Success Icon */}
      <motion.div
        style={{
          fontSize: '5rem',
          marginBottom: '1rem'
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 150, 
          damping: 10,
          delay: 0.2 
        }}
      >
        🌟
      </motion.div>

      {/* Profile Summary Card */}
      <motion.div
        style={profileCardStyles}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Name */}
        <div style={profileRowStyles}>
          <span style={labelStyles}>Name</span>
          <span style={valueStyles}>{profileData.name || 'Cosmic Traveler'}</span>
        </div>

        {/* Color Theme */}
        {profileData.colorTheme && (
          <div style={profileRowStyles}>
            <span style={labelStyles}>Color Theme</span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={valueStyles}>{profileData.colorTheme.name}</span>
              <div style={colorSwatchStyles(profileData.colorTheme.primary)} />
            </div>
          </div>
        )}

        {/* Symbol */}
        {symbolData && (
          <div style={{ ...profileRowStyles, borderBottom: 'none' }}>
            <span style={labelStyles}>Symbol</span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={valueStyles}>{symbolData.name}</span>
              <span style={{ fontSize: '1.5rem' }}>{symbolData.icon}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Epic Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}
      >
        <p
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.8',
            marginBottom: '1rem'
          }}
        >
          Watch as your universe comes alive with <strong style={{ color: '#9d4edd' }}>50,000 particles</strong> 
          {' '}morphing and dancing through space. Your cosmic journey is complete! 🚀
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          marginTop: '2rem'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Button
          onClick={resetForm}
          variant="primary"
          fullWidth
        >
          Create Another Universe
        </Button>
        
        <Button
          onClick={() => {
            // Optional: Add functionality to hide UI and just show the scene
            console.log('Enjoying the view!');
          }}
          variant="secondary"
          fullWidth
        >
          Enjoy The View
        </Button>
      </motion.div>

      {/* Footer Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          marginTop: '2rem',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.5)',
          fontStyle: 'italic',
          textAlign: 'center'
        }}
      >
        ✨ Made with Three.js, React, and cosmic magic ✨
      </motion.p>
    </FormContainer>
  );
};

export default StepFinal;