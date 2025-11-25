
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // Add error logging
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    console.error('Global error:', msg, error);
    return false;
  };

  try {
    createRoot(document.getElementById("root")!).render(<App />);
  } catch (error) {
    console.error('Failed to render app:', error);
    document.body.innerHTML = '<div style="padding: 20px; color: red;">Error loading app. Check console.</div>';
  }
  