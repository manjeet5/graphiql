import React, { useRef, useEffect } from "react";
import QueryEditor from "./QueryEditor";
import QueryResult from "./QueryResult";

const Editor = ({ store, dispatch }) => {
  const {
    activeQuery,
    requestBody,
    showQueryListHistory,
    queryEditorRef,
    queryResultRef,
    baseUrl,
  } = store;
  const editor = useRef(null);
  const initResize = (event) => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const widthInPercentage = (width, totalWidth) => {
    return (width / totalWidth) * 100 + "%";
  };
  const resize = (event) => {
    const totalWidth = editor.current.getBoundingClientRect().width;
    const difference =
      event.clientX - queryEditorRef.current.getBoundingClientRect().width;
    const queryEditorWidth =
      queryEditorRef.current.getBoundingClientRect().width + difference;
    const queryResultWidth = totalWidth - queryEditorWidth - 10; // 10 refers to the width of resize-editor;
    queryEditorRef.current.style.width = widthInPercentage(
      queryEditorWidth,
      totalWidth
    );
    queryResultRef.current.style.width = widthInPercentage(
      queryResultWidth,
      totalWidth
    );
  };
  const stopResize = () => {
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
  };

  useEffect(() => {
    return stopResize;
  });
  return (
    <div
      className={`editor-container ${showQueryListHistory && "stop-scrolling"}`}
      ref={editor}
    >
      <QueryEditor query={activeQuery} dispatch={dispatch} />
      <div className="resize-editor" onMouseDown={initResize}></div>
      <QueryResult
        baseUrl={baseUrl}
        requestBody={requestBody}
        dispatch={dispatch}
      />
    </div>
  );
};
export default Editor;
