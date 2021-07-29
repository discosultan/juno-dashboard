import "overlayscrollbars/css/OverlayScrollbars.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import OverlayScrollbars from "overlayscrollbars";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);

OverlayScrollbars(document.body, {
  nativeScrollbarsOverlaid: {
    initialize: false,
  },
});
