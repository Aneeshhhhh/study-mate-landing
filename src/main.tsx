
import { createRoot } from 'react-dom/client'
import { SignupProvider } from './contexts/SignupContext';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <SignupProvider>
    <App />
  </SignupProvider>
);
