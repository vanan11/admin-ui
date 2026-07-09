import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'
import { ThemeContextProvider } from './context/themeContext';
import { AuthContextProvider } from './context/authContext';
import { ModeContextProvider } from "./context/modeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </ModeContextProvider>
  </StrictMode>
);
