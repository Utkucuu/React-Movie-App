import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import MovieProvider from "./context/SiteContext";
import UserProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <MovieProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </MovieProvider>
  </BrowserRouter>,
);
