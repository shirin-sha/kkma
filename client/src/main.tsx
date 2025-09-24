import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { WOW } from 'wowjs';

// Initialize WOW.js animations
new WOW().init();

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');
const root = createRoot(container);
root.render(<App />); 