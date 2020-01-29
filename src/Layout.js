import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth } from "context/index.js";

import Routes from "./routes";

export default function Layout() {
  return (
    <Router>
      <Auth.Provider>
        <Routes />
      </Auth.Provider>
    </Router>
  );
}
