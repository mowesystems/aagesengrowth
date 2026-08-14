import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initMotion } from './lib/motion';
import './index.css';

// Arm entrance animations only once JavaScript is actually running. Until this
// call, and after the settle timer inside it, every reveal renders visible.
initMotion();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
