import React from "react";
import QueryEditor from "../../../../js/components/editor/QueryEditor";
import { shallow } from "../../../../enzyme";
import {
  ADD_QUERY_EDITOR_REF,
  ADD_TEXT_AREA_REF,
  UPDATE_ACTIVE_QUERY,
} from "../../../../js/components/store/reducer";

describe("this is test", () => {
  let props, wrapper;
  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());
    props = {
      dispatch: jest.fn(),
      query: "",
    };
    wrapper = shallow(<QueryEditor {...props} />);
  });

  describe("on start", () => {
    it("should call dispatch function first time with type=ADD_TEXT_AREA_REF", () => {
      expect(props.dispatch.mock.calls[0][0].type).toEqual(ADD_TEXT_AREA_REF);
    });
    it("should call dispatch function second time with type=ADD_TEXT_AREA_R", () => {
      expect(props.dispatch.mock.calls[1][0].type).toEqual(
        ADD_QUERY_EDITOR_REF
      );
    });
    it("should render textarea", () => {
      expect(wrapper.find("textarea").exists()).toEqual(true);
    });
  });

  it("should invoke dispatch function with type='UPDATE_ACTIVE_QUERY'", () => {
    const textarea = wrapper.find("textarea");
    textarea.props().onChange({ target: { value: "1" } });
    expect(props.dispatch.mock.calls[2][0].type).toEqual(UPDATE_ACTIVE_QUERY);
  });
});
