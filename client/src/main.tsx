import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthBootProvider } from "./context/AuthBootContext";
import AppBootOverlay from "./components/app/AppBootOverlay";
import "./index.css";

import App from "./App.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppBootOverlay>
        <AuthBootProvider>
          <App />
        </AuthBootProvider>
      </AppBootOverlay>
    </BrowserRouter>
  </StrictMode>,
);
