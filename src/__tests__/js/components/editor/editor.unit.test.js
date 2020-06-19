import React from "react";
import Editor from "../../../../js/components/editor/Editor";
import { shallow } from "../../../../enzyme";

test("Editor should render QueryEditor", () => {
  const store = {
    activeQuery: "",
    baseUrl: "",
    requestBody: "",
    showQueryListHistory: false,
  };
  const wrapper = shallow(<Editor store={store} dispatch={jest.fn()} />);
  expect(wrapper.find("QueryEditor").exists()).toEqual(true);
});
