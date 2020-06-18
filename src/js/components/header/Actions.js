import React from "react";
import { RUN, SAVE, HISTORY } from "../constants/graphiqlConstants";
import {
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
  SAVE_QUERY_TO_LOCAL_STORAGE,
  CREATE_QUERY_REQUEST_BODY,
} from "../store/reducer";
export const createButton = (id, ariaLabel, handleClick, className) => {
  const content =
    id === "run" ? (
      <div
        id={id}
        data-testid={`${id}-button-child`}
        className="run-button-content"
      ></div>
    ) : (
      id
    );
  return (
    <button
      id={id}
      data-testid={`${id}-button`}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={className}
    >
      {content}
    </button>
  );
};

const Actions = ({ dispatch }) => {
  const handleClick = (event) => {
    switch (event.target.id) {
      case RUN: {
        return dispatch({ type: CREATE_QUERY_REQUEST_BODY });
      }
      case SAVE: {
        return dispatch({ type: SAVE_QUERY_TO_LOCAL_STORAGE });
      }
      case HISTORY: {
        return dispatch({ type: TOGGLE_SHOW_QUERY_LIST_HISTORY });
      }
      default: {
        return;
      }
    }
  };

  return (
    <div className="graphiql-header">
      <h1 className="graphiql-title">GraphiQL</h1>
      <div className="actions-container">
        {createButton(RUN, "Run Query", handleClick, "action-button-run")}
        {createButton(SAVE, "Save Query", handleClick, "action-button-save")}
        {createButton(
          HISTORY,
          "Show Query History",
          handleClick,
          "action-button-history"
        )}
      </div>
    </div>
  );
};

export default Actions;
