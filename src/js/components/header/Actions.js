import React from "react";
import { RUN, SAVE, HISTORY } from "../constants/graphiqlConstants";
import {
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
  SAVE_QUERY_TO_LOCAL_STORAGE,
  CREATE_QUERY_REQUEST_BODY,
} from "../store/reducer";
import PropTypes from "prop-types";

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

const Actions = ({ activeQuery, baseUrl, dispatch }) => {
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

  const isActionEnabled = activeQuery && baseUrl;
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
Actions.propTypes = {
  activeQuery: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
};
export default Actions;
