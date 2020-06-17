import React, { useReducer } from "react";
import "../sass/main.scss";
import { getWindow } from "./components/utils/EnvironmentUtils";
import { reducer, init } from "./components/store/reducer";
import Editor from "./components/editor/Editor";

function App() {
  const browserWindow = getWindow();
  const [state, dispatch] = useReducer(reducer, browserWindow, init);
  return (
    <div className="graphiql-container">
      <Editor store={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
