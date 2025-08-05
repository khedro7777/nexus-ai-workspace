
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed:', registrationError);
      });
  });
}

// Error boundary for the app
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
