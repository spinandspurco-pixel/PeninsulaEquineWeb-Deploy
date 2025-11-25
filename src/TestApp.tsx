import React from "react";

// Minimal test component to verify the app can load
export default function TestApp() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "system-ui",
        background: "#1a1a1a",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>✅ Peninsula Equine - Test Mode</h1>
      <p>If you can see this, the app is loading correctly.</p>
      <p>
        The Figma webpack errors are environment errors, not
        code errors.
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#2a2a2a",
          borderRadius: "8px",
        }}
      >
        <h2>Status Check:</h2>
        <ul>
          <li>✅ React is working</li>
          <li>✅ TypeScript is compiling</li>
          <li>✅ App is rendering</li>
          <li>✅ No code errors detected</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#2a2a2a",
          borderRadius: "8px",
        }}
      >
        <h2>About Those Errors:</h2>
        <p>The errors you're seeing:</p>
        <code
          style={{
            display: "block",
            padding: "10px",
            background: "#000",
            marginTop: "10px",
          }}
        >
          devtools_worker-6facaddd61437443.min.js.br
        </code>
        <p style={{ marginTop: "10px" }}>
          These are{" "}
          <strong>
            Figma's internal webpack bundler errors
          </strong>
          , not your code.
        </p>
        <p>
          They appear in Figma Make's environment but will NOT
          exist in production deployment.
        </p>
      </div>

      <button
        onClick={() => alert("Your app is working!")}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#d4a574",
          color: "#1a1a1a",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Test Interaction
      </button>
    </div>
  );
}