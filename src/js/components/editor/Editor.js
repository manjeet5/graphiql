import React, { useEffect, useRef } from "react";
import QueryEditor from "./QueryEditor";
import { getWindow } from "../utils/EnvironmentUtils";

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
