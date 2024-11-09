import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'

const container = document.getElementById('root');
const root = createRoot(container);

// Render app
root.render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
);
