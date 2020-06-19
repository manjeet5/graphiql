import {
  GRAPHIQL_QUERIES,
  GRAPHIQL_QUERIES_URL,
} from "../constants/graphiqlConstants";

export const ADD_TEXT_AREA_REF = "ADD_TEXT_AREA_REF";
export const ADD_QUERY_EDITOR_REF = "ADD_QUERY_EDITOR_REF";
export const UPDATE_ACTIVE_QUERY = "UPDATE_ACTIVE_QUERY";
export const ADD_QUERY_RESULT_REF = "ADD_QUERY_RESULT_REF";
export const CREATE_QUERY_REQUEST_BODY = "CREATE_QUERY_REQUEST_BODY";
export const SAVE_QUERY_TO_LOCAL_STORAGE = "SAVE_QUERY_TO_LOCAL_STORAGE";
export const SHOW_QUERY_LIST_HISTORY = "SHOW_QUERY_LIST_HISTORY";
export const TOGGLE_SHOW_QUERY_LIST_HISTORY = "TOGGLE_SHOW_QUERY_LIST_HISTORY";
export const DELETE_QUERY = "DELETE_QUERY";
export const UPDATE_BASE_URL = "UPDATE_BASE_URL";

export const getQueryListName = (baseUrl) => {
  return `${GRAPHIQL_QUERIES}-${baseUrl}`;
};
export const updateLocalStorage = (name, value) => {
  const valueInString =
    typeof value === "object" ? JSON.stringify(value) : value;
  window.localStorage.setItem(name, valueInString);
};

export const getFromLocalStorage = (name) => {
  return window.localStorage.getItem(name);
};
export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_BASE_URL: {
      updateLocalStorage(GRAPHIQL_QUERIES_URL, action.payload);
      const queryListName = getQueryListName(action.payload);
      const list = getFromLocalStorage(queryListName);
      let queryList = list ? JSON.parse(list) : [];
      return { ...state, baseUrl: action.payload, queryList };
    }
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
    case SAVE_QUERY_TO_LOCAL_STORAGE: {
      //save query to local storage
      const newList = [state.activeQuery, ...state.queryList];
      const queryListName = getQueryListName(state.baseUrl);
      updateLocalStorage(queryListName, newList);

      return { ...state, queryList: newList };
    }
    case TOGGLE_SHOW_QUERY_LIST_HISTORY: {
      return { ...state, showQueryListHistory: !state.showQueryListHistory };
    }
    case DELETE_QUERY: {
      const newQueryList = [
        ...state.queryList.slice(0, action.payload),
        ...state.queryList.slice(action.payload + 1),
      ];
      const queryListName = getQueryListName(state.baseUrl);
      updateLocalStorage(queryListName, newQueryList);
      return { ...state, queryList: newQueryList };
    }
    default:
      return state;
  }
}

export const init = () => {
  const baseUrl = getFromLocalStorage(GRAPHIQL_QUERIES_URL) || "";
  const list = getFromLocalStorage(`${GRAPHIQL_QUERIES}-${baseUrl}`);
  let queryList = list ? JSON.parse(list) : [];
  return {
    activeQuery: queryList.length > 0 ? queryList[0] : "",
    queryList,
    requestBody: "",
    baseUrl,
  };
};
