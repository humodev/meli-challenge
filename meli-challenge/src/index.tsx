import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import "../node_modules/@drewbot/sass-flexbox-grid/public/sass-flexbox/main.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CategoryProvider } from "./context/CategoryContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
