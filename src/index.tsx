import "overlayscrollbars/overlayscrollbars.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { OverlayScrollbars } from "overlayscrollbars";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

OverlayScrollbars(document.body, {});
