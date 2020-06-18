import React, { useRef } from "react";
import QueryEditor from "./QueryEditor";
import QueryResult from "./QueryResult";
const Editor = ({ store, dispatch }) => {
  const { activeQuery, requestBody } = store;
  const editor = useRef(null);

  return (
    <div className="editor-container" ref={editor}>
      <QueryEditor query={activeQuery} dispatch={dispatch} />
      <QueryResult requestBody={requestBody} dispatch={dispatch} />
    </div>
  );
};
export default Editor;
