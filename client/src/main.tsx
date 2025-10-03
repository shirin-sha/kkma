import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/bootstrap-replacement.css';
import './styles/global.css';
import './styles/color.css';
import './styles/style.css';
import './styles/custom.css';
import './styles/responsive.css';
import App from './App';

// Initialize WOW.js animations via dynamic import to avoid bundling issues
if (typeof window !== 'undefined') {
  // Try to load the UMD build directly and support multiple export shapes
  import('wowjs/dist/wow.js')
    .then((mod: any) => {
      const WOWClass = mod?.WOW || mod?.default?.WOW || mod?.default || mod;
      if (typeof WOWClass === 'function') {
        try { new WOWClass().init(); } catch { /* noop */ }
      }
    })
    .catch(() => {
      // ignore if WOW not available
    });
}

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');
const root = createRoot(container);
root.render(<App />); 