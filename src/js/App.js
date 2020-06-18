import React, { useReducer } from "react";
import "../sass/main.scss";
import { getWindow } from "./components/utils/EnvironmentUtils";
import {
  reducer,
  init,
  CREATE_QUERY_REQUEST_BODY,
} from "./components/store/reducer";
import Editor from "./components/editor/Editor";
import Actions from "./components/header/Actions";

function App() {
  const browserWindow = getWindow();
  const [state, dispatch] = useReducer(reducer, browserWindow, init);
  return (
    <div className="graphiql-container">
      <Actions store={state} dispatch={dispatch} />
      <Editor store={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
