import React, { useRef, useEffect } from "react";
import {
  UPDATE_ACTIVE_QUERY,
  DELETE_QUERY,
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
} from "../store/reducer";
import { CLOSE_ICON } from "../constants/graphiqlConstants";
import PropTypes from "prop-types";

const HistoryQueries = ({ queryList, show, dispatch }) => {
  const history = useRef(null);

  useEffect(() => {
    show && history.current.focus();
  }, [show]);

  const selectQuery = (query) => {
    dispatch({ type: UPDATE_ACTIVE_QUERY, payload: query });
  };
  const deleteQuery = (index) => {
    dispatch({ type: DELETE_QUERY, payload: index });
  };

  const closeNotification = () => {
    dispatch({ type: TOGGLE_SHOW_QUERY_LIST_HISTORY });
  };
  const handleClose = (event) => {
    if (event.key === "Escape") {
      closeNotification();
    }
  };
  if (!show) {
    return null;
  }
  return (
    <div className="history-queries-container" data-testid="history-queries">
      <div
        tabIndex="0"
        className="history-queries-bar"
        ref={history}
        onKeyDown={handleClose}
      >
        <div tabIndex="0" className="history-queries-header">
          <h1>Saved Queries</h1>
          <button data-testid="close-notification" onClick={closeNotification}>
            {CLOSE_ICON}
          </button>
        </div>

        {queryList.map((query, index) => {
          return (
            <div className="query-container" key={index}>
              <button
                data-testid="query-detail"
                className="query-detail"
                aria-label="history label"
                onClick={() => selectQuery(query)}
              >
                {query.substring(0, 30)}
              </button>
              <button
                data-testid="query-delete"
                className="query-delete"
                aria-label="delete query"
                onClick={() => deleteQuery(index)}
              >
                {CLOSE_ICON}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

HistoryQueries.propTypes = {
  queryList: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default HistoryQueries;
