import React from "react";
import ReactDOM from "react-dom";
import ErrorMessage from "../ReusableComponents/ErrorMessage";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders without error", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorMessage message={`Error Message`} />, div);
});

it("renders error message", () => {
  const wrapper = shallow(<ErrorMessage message={`Error Message`} />);
  expect(wrapper.contains(`Error Message`)).toEqual(true);
});
