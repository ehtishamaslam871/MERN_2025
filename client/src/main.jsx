import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "../store/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>

  </AuthProvider>

);
