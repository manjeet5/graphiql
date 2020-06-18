import React, { useReducer } from "react";
import "../sass/main.scss";
import { getWindow } from "./components/utils/EnvironmentUtils";
import { reducer, init } from "./components/store/reducer";
import Editor from "./components/editor/Editor";
import Actions from "./components/header/Actions";
import HistoryQueries from "./components/historyQueries/HistoryQueries";

function App() {
  const browserWindow = getWindow();
  const [state, dispatch] = useReducer(reducer, browserWindow, init);
  return (
    <div className="graphiql-container">
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
