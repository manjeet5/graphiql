import React, { useRef } from "react";
import QueryEditor from "./QueryEditor";

const Editor = ({ store, dispatch }) => {
  const { activeQuery } = store;
  const editor = useRef(null);

  return (
    <div className="editor-container" ref={editor}>
      <QueryEditor query={activeQuery} dispatch={dispatch} />
    </div>
  );
};
export default Editor;
