import React from "react";
import Actions, {
  createButton,
} from "../../../../js/components/header/Actions";
import {
  CREATE_QUERY_REQUEST_BODY,
  SAVE_QUERY_TO_LOCAL_STORAGE,
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
} from "../../../../js/components/store/reducer";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe('createButton with id="run"', () => {
  const { unmount } = render(createButton("run", "test"));
  const runButton = screen.getByTestId("run-button");
  expect(runButton).toHaveAttribute("aria-label", "test");
  expect(runButton).toContainElement(screen.getByTestId("run-button-child"));
  unmount();
});

describe('createButton with id="history"', () => {
  const { unmount } = render(createButton("history", "test"));
  const historyButton = screen.getByTestId("history-button");
  expect(historyButton).toHaveAttribute("aria-label", "test");
  expect(historyButton).toHaveTextContent("history");
  unmount();
});
describe("Actions", () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });
  it("render", () => {
    const { unmount } = render(
      <Actions dispatch={dispatch} activeQuery="a" baseUrl="b" />
    );
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
    unmount();
  });
});
