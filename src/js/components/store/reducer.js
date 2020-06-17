import { GRAPHIQL_QUERIES } from "../constants/graphiqlConstants";
export const ADD_TEXT_AREA_REF = "ADD_TEXT_AREA_REF";
export const ADD_QUERY_EDITOR_REF = "ADD_QUERY_EDITOR_REF";
export const UPDATE_ACTIVE_QUERY = "UPDATE_ACTIVE_QUERY";

export function reducer(state, action) {
  switch (action.type) {
    case ADD_TEXT_AREA_REF: {
      return { ...state, textAreaRef: action.payload };
    }
    case ADD_QUERY_EDITOR_REF: {
      return { ...state, queryEditorRef: action.payload };
    }
    case UPDATE_ACTIVE_QUERY: {
      return { ...state, activeQuery: action.payload };
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
  };
};
