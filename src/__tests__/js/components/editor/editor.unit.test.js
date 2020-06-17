import React from "react";
import Editor from "../../../../js/components/editor/Editor";
import { shallow } from "../../../../enzyme";

test("Editor should render QueryEditor", () => {
  const wrapper = shallow(<Editor store={{}} />);
  expect(wrapper.find("QueryEditor").exists()).toEqual(true);
});
