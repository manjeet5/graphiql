import React, { useReducer } from "react";
import "../sass/main.scss";
import { getWindow } from "./components/utils/EnvironmentUtils";
import {
  reducer,
  init,
  CREATE_QUERY_REQUEST_BODY,
} from "./components/store/reducer";
import Editor from "./components/editor/Editor";

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
      <Editor store={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
