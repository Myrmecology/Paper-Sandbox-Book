import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/animations.css';

/**
 * Button Component
 * Cosmic-themed button with star particle effects on hover
 */
const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className = '',
  fullWidth = false
}) => {
  const baseStyles = {
    position: 'relative',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    fontFamily: 'var(--font-heading)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    overflow: 'visible',
    transition: 'all var(--transition-normal)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #8a2be2 0%, #6a0dad 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 20px rgba(138, 43, 226, 0.4)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      border: '2px solid rgba(138, 43, 226, 0.5)',
      boxShadow: '0 4px 20px rgba(138, 43, 226, 0.2)',
    },
    outline: {
      background: 'transparent',
      color: '#8a2be2',
      border: '2px solid #8a2be2',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: '#ffffff',
      border: 'none',
      boxShadow: 'none',
    }
  };

  const hoverStyles = {
    primary: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 30px rgba(138, 43, 226, 0.6)',
    },
    secondary: {
      background: 'rgba(138, 43, 226, 0.2)',
      borderColor: 'rgba(138, 43, 226, 0.8)',
      transform: 'translateY(-2px)',
    },
    outline: {
      background: 'rgba(138, 43, 226, 0.1)',
      transform: 'translateY(-2px)',
    },
    ghost: {
      color: '#9d4edd',
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...variants[variant]
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-stars ${className}`}
      style={combinedStyles}
      whileHover={!disabled ? hoverStyles[variant] : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Star Effect Container */}
      <div className="Stars"></div>
      
      {/* Button Content */}
      <span style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>

      {/* Shimmer Effect on Hover */}
      {!disabled && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            pointerEvents: 'none',
            zIndex: 0
          }}
          whileHover={{
            left: '100%',
            transition: { duration: 0.6, ease: 'easeInOut' }
          }}
        />
      )}
    </motion.button>
  );
};

export default Button;