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

  return (
    <div className="query-editor" ref={queryEditorRef}>
      <textarea
        aria-label="query input"
        className="query-editor-text-area"
        value={query}
        ref={textAreaRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default QueryEditor;
