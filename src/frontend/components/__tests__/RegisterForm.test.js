import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import RegisterFormContent from "../RegisterForm";

import store from '../../store';


describe("Rendering test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <Provider store={store}>
    <RegisterFormContent />
    </Provider>, div);
  });
});
