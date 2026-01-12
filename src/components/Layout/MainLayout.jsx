import React from 'react';
import { AnimatePresence } from 'framer-motion';
import useFormState from '../../hooks/useFormState';
import { FORM_STEPS } from '../../utils/constants';
import StepOne from '../UI/FormSteps/StepOne';
import StepTwo from '../UI/FormSteps/StepTwo';
import StepThree from '../UI/FormSteps/StepThree';
import StepFour from '../UI/FormSteps/StepFour';
import StepFinal from '../UI/FormSteps/StepFinal';

/**
 * MainLayout Component
 * Manages the layout and routing between different form steps
 */
const MainLayout = () => {
  const { currentStep } = useFormState();

  /**
   * Render the appropriate step component based on current state
   */
  const renderStep = () => {
    switch (currentStep) {
      case FORM_STEPS.WELCOME:
        return <StepOne key="step-welcome" />;
      case FORM_STEPS.NAME:
        return <StepTwo key="step-name" />;
      case FORM_STEPS.COLORS:
        return <StepThree key="step-colors" />;
      case FORM_STEPS.SYMBOL:
        return <StepFour key="step-symbol" />;
      case FORM_STEPS.FINAL:
        return <StepFinal key="step-final" />;
      default:
        return <StepOne key="step-welcome" />;
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Form Steps with Page Transitions */}
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>

      {/* Optional: Step Indicator Dots */}
      <StepIndicator currentStep={currentStep} />
    </div>
  );
};

/**
 * StepIndicator Component
 * Shows progress dots at the bottom of the screen
 */
const StepIndicator = ({ currentStep }) => {
  const containerStyles = {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.75rem',
    zIndex: 1000,
    padding: '1rem 1.5rem',
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: 'var(--radius-full)',
    border: '1px solid rgba(138, 43, 226, 0.2)'
  };

  const dotStyles = (isActive, isCompleted) => ({
    width: isActive ? '12px' : '8px',
    height: isActive ? '12px' : '8px',
    borderRadius: '50%',
    background: isCompleted || isActive
      ? 'linear-gradient(135deg, #8a2be2, #9d4edd)'
      : 'rgba(255, 255, 255, 0.2)',
    transition: 'all var(--transition-normal)',
    boxShadow: isActive ? '0 0 15px rgba(138, 43, 226, 0.8)' : 'none',
    cursor: 'pointer'
  });

  const steps = [
    FORM_STEPS.WELCOME,
    FORM_STEPS.NAME,
    FORM_STEPS.COLORS,
    FORM_STEPS.SYMBOL,
    FORM_STEPS.FINAL
  ];

  return (
    <div style={containerStyles}>
      {steps.map((step, index) => (
        <div
          key={index}
          style={dotStyles(
            currentStep === step,
            currentStep > step
          )}
          title={`Step ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default MainLayout;