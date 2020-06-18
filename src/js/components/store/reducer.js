import { GRAPHIQL_QUERIES } from "../constants/graphiqlConstants";

export const ADD_TEXT_AREA_REF = "ADD_TEXT_AREA_REF";
export const ADD_QUERY_EDITOR_REF = "ADD_QUERY_EDITOR_REF";
export const UPDATE_ACTIVE_QUERY = "UPDATE_ACTIVE_QUERY";
export const ADD_QUERY_RESULT_REF = "ADD_QUERY_RESULT_REF";
export const CREATE_QUERY_REQUEST_BODY = "CREATE_QUERY_REQUEST_BODY";

export function reducer(state, action) {
  switch (action.type) {
    case ADD_TEXT_AREA_REF: {
      return { ...state, textAreaRef: action.payload };
    }
    case ADD_QUERY_EDITOR_REF: {
      return { ...state, queryEditorRef: action.payload };
    }
    case ADD_QUERY_RESULT_REF: {
      return { ...state, queryResultRef: action.payload };
    }
    case UPDATE_ACTIVE_QUERY: {
      return { ...state, activeQuery: action.payload };
    }
    case CREATE_QUERY_REQUEST_BODY: {
      return {
        ...state,
        requestBody: JSON.stringify({ query: state.activeQuery }),
      };
    }
    default:
      return state;
  }
}

export const init = (browserWindow) => {
  const list = browserWindow.localStorage.getItem(GRAPHIQL_QUERIES);
  let queryList = list ? JSON.parse(list) : [];
  return {
    activeQuery: queryList.length > 0 ? queryList[0] : "",
    queryList,
    requestBody: "",
  };
};
