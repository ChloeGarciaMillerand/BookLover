import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@src/styles/index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("No root element found in index.html");
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
