import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'
import { ThemeContextProvider } from './context/themeContext';
import { AuthContextProvider } from './context/authContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
