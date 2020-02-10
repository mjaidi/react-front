import React from "react";
import ReactDOM from "react-dom";
import Secret from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Secret />, div);
  ReactDOM.unmountComponentAtNode(div);
});
