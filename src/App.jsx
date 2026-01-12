import React, { useEffect } from 'react';
import Scene from './components/Three/Scene';
import MainLayout from './components/Layout/MainLayout';
import './styles/global.css';
import './styles/animations.css';

/**
 * App Component
 * Main application entry point
 * Combines 3D Scene with UI Layout
 */
function App() {
  useEffect(() => {
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      alert('WebGL is not supported in your browser. Please use a modern browser like Chrome, Firefox, or Edge.');
    }

    // Prevent scrolling on mobile
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 3D Scene Background */}
      <Scene />

      {/* UI Overlay */}
      <MainLayout />
    </div>
  );
}

export default App;