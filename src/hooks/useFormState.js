import { create } from 'zustand';
import { FORM_STEPS } from '../utils/constants';

/**
 * Global form state management using Zustand
 * Manages the entire form flow, user data, and step transitions
 */
const useFormState = create((set, get) => ({
  // Current step in the form
  currentStep: FORM_STEPS.WELCOME,
  
  // User profile data
  profileData: {
    name: '',
    colorTheme: null,
    symbol: null,
    timestamp: null
  },
  
  // Animation states
  isTransitioning: false,
  isMorphing: false,
  
  // Progress tracking
  completedSteps: [],
  
  /**
   * Move to the next step
   */
  nextStep: () => {
    const { currentStep, completedSteps } = get();
    
    if (currentStep < FORM_STEPS.FINAL) {
      set({
        currentStep: currentStep + 1,
        isTransitioning: true,
        completedSteps: [...completedSteps, currentStep]
      });
      
      // Reset transition state after animation
      setTimeout(() => {
        set({ isTransitioning: false });
      }, 2000);
    }
  },
  
  /**
   * Move to the previous step
   */
  prevStep: () => {
    const { currentStep } = get();
    
    if (currentStep > FORM_STEPS.WELCOME) {
      set({
        currentStep: currentStep - 1,
        isTransitioning: true
      });
      
      setTimeout(() => {
        set({ isTransitioning: false });
      }, 2000);
    }
  },
  
  /**
   * Jump to a specific step
   */
  goToStep: (step) => {
    set({
      currentStep: step,
      isTransitioning: true
    });
    
    setTimeout(() => {
      set({ isTransitioning: false });
    }, 2000);
  },
  
  /**
   * Update user's name
   */
  setName: (name) => {
    set((state) => ({
      profileData: {
        ...state.profileData,
        name
      }
    }));
  },
  
  /**
   * Update user's color theme selection
   */
  setColorTheme: (colorTheme) => {
    set((state) => ({
      profileData: {
        ...state.profileData,
        colorTheme
      },
      isMorphing: true
    }));
    
    setTimeout(() => {
      set({ isMorphing: false });
    }, 2000);
  },
  
  /**
   * Update user's symbol selection
   */
  setSymbol: (symbol) => {
    set((state) => ({
      profileData: {
        ...state.profileData,
        symbol
      },
      isMorphing: true
    }));
    
    setTimeout(() => {
      set({ isMorphing: false });
    }, 2000);
  },
  
  /**
   * Complete the profile creation
   */
  completeProfile: () => {
    const { profileData } = get();
    
    set({
      profileData: {
        ...profileData,
        timestamp: new Date().toISOString()
      },
      currentStep: FORM_STEPS.FINAL
    });
    
    // Save to localStorage
    try {
      localStorage.setItem('cosmic_profile', JSON.stringify(get().profileData));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  },
  
  /**
   * Reset the entire form
   */
  resetForm: () => {
    set({
      currentStep: FORM_STEPS.WELCOME,
      profileData: {
        name: '',
        colorTheme: null,
        symbol: null,
        timestamp: null
      },
      isTransitioning: false,
      isMorphing: false,
      completedSteps: []
    });
    
    // Clear localStorage
    try {
      localStorage.removeItem('cosmic_profile');
    } catch (error) {
      console.error('Failed to clear profile:', error);
    }
  },
  
  /**
   * Load profile from localStorage
   */
  loadProfile: () => {
    try {
      const saved = localStorage.getItem('cosmic_profile');
      if (saved) {
        const profileData = JSON.parse(saved);
        set({ profileData });
        return true;
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
    return false;
  },
  
  /**
   * Check if a step is completed
   */
  isStepCompleted: (step) => {
    const { completedSteps } = get();
    return completedSteps.includes(step);
  },
  
  /**
   * Get profile completion percentage
   */
  getCompletionPercentage: () => {
    const { profileData } = get();
    let completed = 0;
    const total = 3; // name, colorTheme, symbol
    
    if (profileData.name) completed++;
    if (profileData.colorTheme) completed++;
    if (profileData.symbol) completed++;
    
    return Math.round((completed / total) * 100);
  },
  
  /**
   * Validate current step data
   */
  validateCurrentStep: () => {
    const { currentStep, profileData } = get();
    
    switch (currentStep) {
      case FORM_STEPS.NAME:
        return profileData.name && profileData.name.trim().length > 0;
      case FORM_STEPS.COLORS:
        return profileData.colorTheme !== null;
      case FORM_STEPS.SYMBOL:
        return profileData.symbol !== null;
      default:
        return true;
    }
  },
  
  /**
   * Set morphing state
   */
  setMorphing: (isMorphing) => {
    set({ isMorphing });
  },
  
  /**
   * Set transitioning state
   */
  setTransitioning: (isTransitioning) => {
    set({ isTransitioning });
  }
}));

export default useFormState;