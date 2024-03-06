import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <SkeletonTheme baseColor="var(--secondary-500)" highlightColor="var(--secondary-700)">
      <App />
      </SkeletonTheme>
    </BrowserRouter>
  </React.StrictMode>
);
