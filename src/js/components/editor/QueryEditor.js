import React, { useRef } from "react";
import {
  ADD_TEXT_AREA_REF,
  ADD_QUERY_EDITOR_REF,
  UPDATE_ACTIVE_QUERY,
} from "../store/reducer";

const QueryEditor = ({ query, dispatch }) => {
  const textAreaRef = useRef(null);
  const queryEditorRef = useRef(null);

  const handleChange = (event) => {
    dispatch({ type: UPDATE_ACTIVE_QUERY, payload: event.target.value });
  };
  React.useEffect(() => {
    dispatch({ type: ADD_TEXT_AREA_REF, payload: textAreaRef });
    dispatch({ type: ADD_QUERY_EDITOR_REF, payload: queryEditorRef });
  }, [dispatch]);

  const placeholder = `
  # Welcome to GraphiQL
  #
  # GraphiQL is an in-browser tool for writing, validating, and
  # testing GraphQL queries.
  #
  # Type queries into this side of the screen
  #
  # GraphQL queries typically start with a "{" character. Lines that start
  # with a # are ignored.
  #
  # Buttons will become active as you provide baseurl and query information
  #
  # An example GraphQL query might look like:
  #
  #     {
  #       field(arg: "value") {
  #         subField
  #       }
  #     }
  #
  `;
  return (
    <div className="query-editor" ref={queryEditorRef}>
      <textarea
        aria-label="query input"
        className="query-editor-text-area"
        value={query}
        ref={textAreaRef}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default QueryEditor;
