import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FormContainer Component
 * Glassmorphic container for form steps with smooth transitions
 */
const FormContainer = ({ children, title, subtitle, step, totalSteps }) => {
  const containerStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    width: '90%',
    maxWidth: '600px',
    height: 'fit-content',
    maxHeight: '85vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '2rem 1.5rem',
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(138, 43, 226, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 60px rgba(138, 43, 226, 0.2)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(138, 43, 226, 0.5) rgba(0, 0, 0, 0.3)'
  };

  const progressBarStyles = {
    width: '100%',
    height: '4px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '9999px',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    flexShrink: 0
  };

  const progressFillStyles = {
    height: '100%',
    background: 'linear-gradient(90deg, #8a2be2, #9d4edd)',
    borderRadius: '9999px',
    transition: 'width 0.5s ease',
    boxShadow: '0 0 10px rgba(138, 43, 226, 0.6)'
  };

  const titleStyles = {
    fontSize: '2rem',
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: '700',
    marginBottom: '0.75rem',
    background: 'linear-gradient(135deg, #ffffff, #9d4edd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    flexShrink: 0
  };

  const subtitleStyles = {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '1.5rem',
    fontFamily: "'Space Grotesk', sans-serif",
    lineHeight: '1.6',
    flexShrink: 0
  };

  const contentStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    paddingBottom: '1rem'
  };

  // Calculate progress percentage
  const progressPercentage = totalSteps ? (step / totalSteps) * 100 : 0;

  return (
    <motion.div
      style={containerStyles}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Progress Bar */}
      {totalSteps && step !== undefined && (
        <div style={progressBarStyles}>
          <motion.div
            style={progressFillStyles}
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Title */}
      {title && (
        <motion.h1
          style={titleStyles}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h1>
      )}

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          style={subtitleStyles}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          style={contentStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Decorative Corner Elements */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '30px',
          height: '30px',
          borderTop: '2px solid rgba(138, 43, 226, 0.5)',
          borderLeft: '2px solid rgba(138, 43, 226, 0.5)',
          borderRadius: '4px 0 0 0'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '30px',
          height: '30px',
          borderTop: '2px solid rgba(138, 43, 226, 0.5)',
          borderRight: '2px solid rgba(138, 43, 226, 0.5)',
          borderRadius: '0 4px 0 0'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          width: '30px',
          height: '30px',
          borderBottom: '2px solid rgba(138, 43, 226, 0.5)',
          borderLeft: '2px solid rgba(138, 43, 226, 0.5)',
          borderRadius: '0 0 0 4px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '30px',
          height: '30px',
          borderBottom: '2px solid rgba(138, 43, 226, 0.5)',
          borderRight: '2px solid rgba(138, 43, 226, 0.5)',
          borderRadius: '0 0 4px 0'
        }}
      />

      {/* Custom Scrollbar Styling */}
      <style>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(138, 43, 226, 0.5);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(138, 43, 226, 0.8);
        }
      `}</style>
    </motion.div>
  );
};

export default FormContainer;