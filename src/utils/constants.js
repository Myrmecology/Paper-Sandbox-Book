/* ============================================
   APPLICATION CONSTANTS
   ============================================ */

// Form Step Configuration
export const FORM_STEPS = {
  WELCOME: 0,
  NAME: 1,
  COLORS: 2,
  SYMBOL: 3,
  FINAL: 4
};

export const TOTAL_STEPS = Object.keys(FORM_STEPS).length;

// Color Themes for User Selection
export const COLOR_THEMES = {
  NEBULA_PURPLE: {
    id: 'nebula_purple',
    name: 'Nebula Purple',
    primary: '#7209b7',
    secondary: '#9d4edd',
    accent: '#c77dff',
    particle: '#e0aaff'
  },
  COSMIC_BLUE: {
    id: 'cosmic_blue',
    name: 'Cosmic Blue',
    primary: '#4361ee',
    secondary: '#4895ef',
    accent: '#4cc9f0',
    particle: '#7209b7'
  },
  SOLAR_FLARE: {
    id: 'solar_flare',
    name: 'Solar Flare',
    primary: '#ff006e',
    secondary: '#fb5607',
    accent: '#ffbe0b',
    particle: '#ff006e'
  },
  AURORA_GREEN: {
    id: 'aurora_green',
    name: 'Aurora Green',
    primary: '#06ffa5',
    secondary: '#00d9ff',
    accent: '#4361ee',
    particle: '#06ffa5'
  },
  GALAXY_PINK: {
    id: 'galaxy_pink',
    name: 'Galaxy Pink',
    primary: '#f72585',
    secondary: '#b5179e',
    accent: '#7209b7',
    particle: '#f72585'
  },
  STELLAR_GOLD: {
    id: 'stellar_gold',
    name: 'Stellar Gold',
    primary: '#ffd60a',
    secondary: '#ffc300',
    accent: '#ff9e00',
    particle: '#ffd60a'
  }
};

// Symbol/Trait Selection
export const COSMIC_SYMBOLS = {
  EXPLORER: {
    id: 'explorer',
    name: 'Explorer',
    description: 'Adventurous and curious, always seeking new horizons',
    icon: '🚀',
    geometry: 'spaceship'
  },
  DREAMER: {
    id: 'dreamer',
    name: 'Dreamer',
    description: 'Creative and imaginative, building castles in the clouds',
    icon: '✨',
    geometry: 'stars'
  },
  WARRIOR: {
    id: 'warrior',
    name: 'Warrior',
    description: 'Strong and determined, facing challenges head-on',
    icon: '⚔️',
    geometry: 'crystal'
  },
  SAGE: {
    id: 'sage',
    name: 'Sage',
    description: 'Wise and thoughtful, seeking knowledge and truth',
    icon: '🔮',
    geometry: 'sphere'
  },
  CREATOR: {
    id: 'creator',
    name: 'Creator',
    description: 'Innovative and artistic, bringing ideas to life',
    icon: '🎨',
    geometry: 'torus'
  },
  GUARDIAN: {
    id: 'guardian',
    name: 'Guardian',
    description: 'Protective and loyal, standing strong for others',
    icon: '🛡️',
    geometry: 'ring'
  }
};

// Particle System Configuration
export const PARTICLE_CONFIG = {
  COUNT: 50000,
  SIZE: 0.05,
  SIZE_RANGE: [0.02, 0.08],
  SPEED: 0.5,
  SPREAD: 15,
  MORPH_DURATION: 2.0,
  TRANSITION_DURATION: 1.5
};

// Camera Configuration
export const CAMERA_CONFIG = {
  FOV: 75,
  NEAR: 0.1,
  FAR: 1000,
  INITIAL_POSITION: [0, 0, 10],
  POSITIONS: {
    WELCOME: [0, 0, 15],
    NAME: [0, 2, 12],
    COLORS: [5, 0, 10],
    SYMBOL: [-5, 3, 12],
    FINAL: [0, 5, 20]
  },
  TRANSITION_DURATION: 2.0
};

// Animation Timing
export const ANIMATION_TIMING = {
  PARTICLE_MORPH: 2000,
  CAMERA_MOVE: 2000,
  FORM_TRANSITION: 600,
  BUTTON_HOVER: 300,
  STAR_BURST: 800
};

// Text Configurations for Particle Text
export const TEXT_CONFIG = {
  FONT_SIZE: 2,
  FONT_DEPTH: 0.2,
  CURVE_SEGMENTS: 12,
  BEVEL_ENABLED: true,
  BEVEL_THICKNESS: 0.03,
  BEVEL_SIZE: 0.02,
  BEVEL_SEGMENTS: 5
};

// Post-processing Effects
export const EFFECTS_CONFIG = {
  BLOOM: {
    intensity: 1.5,
    luminanceThreshold: 0.2,
    luminanceSmoothing: 0.9,
    mipmapBlur: true
  },
  CHROMATIC_ABERRATION: {
    offset: [0.002, 0.002]
  },
  VIGNETTE: {
    offset: 0.3,
    darkness: 0.5
  }
};

// Performance Settings
export const PERFORMANCE_CONFIG = {
  ENABLE_SHADOWS: false,
  ENABLE_POSTPROCESSING: true,
  ANTIALIAS: true,
  PIXEL_RATIO: Math.min(window.devicePixelRatio, 2),
  ADAPTIVE_QUALITY: true
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'cosmic_profile_data',
  PREFERENCES: 'cosmic_preferences',
  PROGRESS: 'cosmic_progress'
};

// API Endpoints (if needed in future)
export const API_ENDPOINTS = {
  SAVE_PROFILE: '/api/profile/save',
  GET_PROFILE: '/api/profile/get',
  SHARE_PROFILE: '/api/profile/share'
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1440
};

// Error Messages
export const ERROR_MESSAGES = {
  WEBGL_NOT_SUPPORTED: 'WebGL is not supported in your browser. Please use a modern browser.',
  LOAD_FAILED: 'Failed to load the cosmic experience. Please refresh the page.',
  INVALID_INPUT: 'Please provide valid input.',
  GENERIC: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_CREATED: 'Your cosmic profile has been created!',
  PROFILE_SAVED: 'Profile saved successfully!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!'
};