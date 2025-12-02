import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Add comprehensive error logging
window.onerror = (msg, url, lineNo, columnNo, error) => {
  console.error('Global error:', { msg, url, lineNo, columnNo, error });
  return false;
};

window.onunhandledrejection = (event) => {
  console.error('Unhandled promise rejection:', event.reason);
};

// Render app with error boundary
const rootElement = document.getElementById("root");

if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; color: #C9A24E; background: #0F0F0F;">Error: Root element not found</div>';
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    rootElement.innerHTML = '<div style="padding: 40px; color: #C9A24E; background: #0F0F0F; text-align: center;"><h1>Loading Error</h1><p>Check browser console (F12) for details</p></div>';
  }
}
  