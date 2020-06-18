import React from "react";
import Actions from "../../../../js/components/header/Actions";
import {
  CREATE_QUERY_REQUEST_BODY,
  SAVE_QUERY_TO_LOCAL_STORAGE,
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
} from "../../../../js/components/store/reducer";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Actions", () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });
  it("render", () => {
    render(<Actions dispatch={dispatch} />);
    const [runButton, saveButton, historyButton] = screen.getAllByRole(
      "button"
    );
    expect(runButton).toHaveAttribute("id", "run");
    expect(saveButton).toHaveAttribute("id", "save");
    expect(historyButton).toHaveAttribute("id", "history");

    //invoke click on runButton
    act(() => {
      runButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(dispatch.mock.calls[0][0].type).toEqual(CREATE_QUERY_REQUEST_BODY);

    //invoke click on saveButton
    act(() => {
      saveButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(dispatch.mock.calls[1][0].type).toEqual(SAVE_QUERY_TO_LOCAL_STORAGE);

    //invoke click on saveButton
    act(() => {
      historyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(dispatch.mock.calls[2][0].type).toEqual(
      TOGGLE_SHOW_QUERY_LIST_HISTORY
    );
  });
});
