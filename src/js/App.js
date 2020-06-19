import React, { useReducer } from "react";
import "../sass/main.scss";
import { reducer, init } from "./components/store/reducer";
import Editor from "./components/editor/Editor";
import Actions from "./components/header/Actions";
import HistoryQueries from "./components/historyQueries/HistoryQueries";
import BaseUrlInput from "./components/header/BaseUrlInput";
function App() {
  const [state, dispatch] = useReducer(reducer, null, init);
  return (
    <div className="graphiql-container">
      <BaseUrlInput url={state.baseUrl} dispatch={dispatch} />
      <HistoryQueries
        queryList={state.queryList}
        show={state.showQueryListHistory}
        dispatch={dispatch}
      />
      <Actions store={state} dispatch={dispatch} />
      <Editor store={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
