import React from "react";

import HistoryQueries from "../../../../js/components/historyQueries/HistoryQueries";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
  UPDATE_ACTIVE_QUERY,
  DELETE_QUERY,
} from "../../../../js/components/store/reducer";
describe("history Queries", () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });
  it("should return null, when show is false", () => {
    const { container } = render(
      <HistoryQueries dispatch={dispatch} show={false} queryList={[]} />
    );
    expect(container.firstChild).toEqual(null);
  });
  it("render", () => {
    render(
      <HistoryQueries dispatch={dispatch} show={true} queryList={["a"]} />
    );
    const closeQueryListButton = screen.getByTestId("close-notification");
    //simulate click action
    act(() => {
      closeQueryListButton.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
      expect(dispatch.mock.calls[0][0].type).toEqual(
        TOGGLE_SHOW_QUERY_LIST_HISTORY
      );
    });
    //simulate keydown action
    act(() => {
      fireEvent.keyDown(closeQueryListButton, { key: "Escape" });
      expect(dispatch.mock.calls[1][0].type).toEqual(
        TOGGLE_SHOW_QUERY_LIST_HISTORY
      );
    });

    const queryDetailButton = screen.getByTestId("query-detail");
    //simulate click action
    act(() => {
      queryDetailButton.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
      expect(dispatch.mock.calls[2][0].type).toEqual(UPDATE_ACTIVE_QUERY);
      expect(dispatch.mock.calls[2][0].payload).toEqual("a");
    });

    const queryDeleteButton = screen.getByTestId("query-delete");
    //simulate click action
    act(() => {
      queryDeleteButton.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
      expect(dispatch.mock.calls[3][0].type).toEqual(DELETE_QUERY);
      expect(dispatch.mock.calls[3][0].payload).toEqual(0);
    });
  });
});
