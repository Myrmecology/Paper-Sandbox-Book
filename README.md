# 🌌 Cosmic Profile Builder

An interactive cosmic profile builder featuring **50,000+ particles** morphing in real-time with stunning Three.js animations. Build your personalized universe with particle effects, smooth camera transitions, and beautiful post-processing.

![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- **Massive Particle System**: 50,000+ particles with custom GLSL shaders
- **Real-time Morphing**: Particles transform between text, spheres, and 3D shapes
- **Smooth Animations**: Camera movements and particle transitions using GSAP principles
- **6 Color Themes**: Nebula Purple, Cosmic Blue, Solar Flare, Aurora Green, Galaxy Pink, Stellar Gold
- **6 Cosmic Symbols**: Explorer, Dreamer, Warrior, Sage, Creator, Guardian
- **Post-Processing Effects**: Bloom, chromatic aberration, and vignette
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Glassmorphic UI**: Modern, cosmic-themed interface with particle effects on buttons

## 🚀 Technologies

- **React 18** - UI framework
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Post-processing effects
- **Framer Motion** - Smooth UI animations
- **Zustand** - State management
- **Vite** - Build tool and dev server
- **GLSL Shaders** - Custom particle rendering

## 📦 Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd cosmic-profile-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

1. **Welcome Screen**: Introduction to the cosmic experience
2. **Enter Name**: Type your name and watch it morph into 3D particles
3. **Choose Colors**: Select from 6 cosmic color themes
4. **Pick Symbol**: Choose a symbol representing your personality
5. **Final Reveal**: Watch your complete universe with all elements combined

## 🛠️ Project Structure
```
cosmic-profile-builder/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── Layout/         # Layout components
│   │   ├── Three/          # Three.js components
│   │   └── UI/             # UI components & form steps
│   ├── hooks/              # Custom React hooks
│   ├── shaders/            # GLSL shader files
│   ├── styles/             # CSS files
│   └── utils/              # Utility functions
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Adding New Color Themes

Edit `src/utils/constants.js` and add to the `COLOR_THEMES` object:
```javascript
NEW_THEME: {
  id: 'new_theme',
  name: 'New Theme',
  primary: '#hexcode',
  secondary: '#hexcode',
  accent: '#hexcode',
  particle: '#hexcode'
}
```

### Adding New Symbols

Edit `src/utils/constants.js` and add to the `COSMIC_SYMBOLS` object:
```javascript
NEW_SYMBOL: {
  id: 'new_symbol',
  name: 'New Symbol',
  description: 'Description here',
  icon: '🔥',
  geometry: 'sphere' // or 'torus', 'crystal', etc.
}
```

### Adjusting Particle Count

Edit `src/utils/constants.js`:
```javascript
export const PARTICLE_CONFIG = {
  COUNT: 50000, // Adjust this number
  // ...
};
```

## ⚡ Performance

- **Optimized**: GPU instancing for massive particle counts
- **Adaptive**: Pixel ratio capped at 2x for performance
- **Efficient**: Debounced morphing to reduce CPU usage
- **WebGL**: Hardware-accelerated rendering

## 🌐 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari 15+
- Opera

**Note**: WebGL support required. Mobile performance may vary.

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber team
- Framer Motion
- Google Fonts (Orbitron & Space Grotesk)

## 🐛 Known Issues

- Text morphing requires font loading (falls back to sphere if font fails)
- Performance may vary on lower-end devices with 50k+ particles
- Mobile devices: particle count auto-reduces for better performance

## 🔮 Future Enhancements

- [ ] Export/Share functionality
- [ ] Save profiles to database
- [ ] More geometry types for morphing
- [ ] Sound effects and music
- [ ] VR support
- [ ] Custom texture uploads



---

Made with ❤️ and ✨ cosmic magic ✨
Happy coding