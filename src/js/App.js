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
  const handleClick = () => {
    dispatch({ type: CREATE_QUERY_REQUEST_BODY });
  };
  return (
    <div className="graphiql-container">
      <button type="button" onClick={handleClick}>
        Run
      </button>
      <Actions store={state} dispatch={dispatch} />
      <Editor store={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
