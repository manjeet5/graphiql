import React from "react";
import App from "../js/App";
import { shallow } from "../enzyme";

test("should render Editor component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("Editor").exists()).toEqual(true);
});
