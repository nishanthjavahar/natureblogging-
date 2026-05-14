import React from "react";
import ReactDOM from "react-dom/client";
import "react-image-crop/dist/ReactCrop.css";
import "./styles/main.css";

import App from "./App";

import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <AuthProvider>

      <App />

    </AuthProvider>

  </React.StrictMode>
);