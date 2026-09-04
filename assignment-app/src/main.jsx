import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "../styles.css";
import { CacheProvider } from "./contexts/CacheResultsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CacheProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CacheProvider>

  </StrictMode>
);
