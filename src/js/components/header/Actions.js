import React from "react";
import { RUN, SAVE, HISTORY } from "../constants/graphiqlConstants";
import {
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
  SAVE_QUERY_TO_LOCAL_STORAGE,
  CREATE_QUERY_REQUEST_BODY,
} from "../store/reducer";
export const createButton = (
  id,
  ariaLabel,
  handleClick,
  className,
  isEnabled
) => {
  const content =
    id === "run" ? (
      <div
        id={id}
        data-testid={`${id}-button-child`}
        className={`run-button-content ${
          isEnabled ? "" : "run-button-content-disabled"
        }`}
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
      disabled={!isEnabled}
    >
      {content}
    </button>
  );
};

const Actions = ({ store, dispatch }) => {
  const handleClick = (event) => {
    switch (event.target.id) {
      case RUN: {
        return dispatch({ type: CREATE_QUERY_REQUEST_BODY });
      }
      case SAVE: {
        if (store.activeQuery) {
          return dispatch({ type: SAVE_QUERY_TO_LOCAL_STORAGE });
        }
        return;
      }
      case HISTORY: {
        return dispatch({ type: TOGGLE_SHOW_QUERY_LIST_HISTORY });
      }
      default: {
        return;
      }
    }
  };

  const isActionEnabled = store.activeQuery && store.baseUrl;
  console.log(
    "isActionEnabled",
    isActionEnabled,
    store.activeQuery,
    store.baseUrl
  );
  return (
    <div className="graphiql-header">
      <h1 className="graphiql-title">GraphiQL</h1>
      <div className="actions-container">
        {createButton(
          RUN,
          "Run Query",
          handleClick,
          "action-button-run",
          isActionEnabled
        )}
        {createButton(
          SAVE,
          "Save Query",
          handleClick,
          "action-button-save",
          isActionEnabled
        )}
        {createButton(
          HISTORY,
          "Show Query History",
          handleClick,
          "action-button-history",
          isActionEnabled
        )}
      </div>
    </div>
  );
};

export default Actions;
