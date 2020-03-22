import React from "react";
import ReactDOM from "react-dom";
import RegisterFormContent from "../RegisterForm";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RegisterFormContent />, div);
});
