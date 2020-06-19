import {
  reducer,
  init,
  ADD_TEXT_AREA_REF,
  ADD_QUERY_EDITOR_REF,
  UPDATE_ACTIVE_QUERY,
  CREATE_QUERY_REQUEST_BODY,
  SAVE_QUERY_TO_LOCAL_STORAGE,
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
  DELETE_QUERY,
  UPDATE_BASE_URL,
} from "../../../../js/components/store/reducer.js";
import {
  GRAPHIQL_QUERIES_URL,
  GRAPHIQL_QUERIES,
} from "../../../../js/components/constants/graphiqlConstants";

describe("init", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("init function should return activeQuery and queryList as empty string and array, when no content in localStorage", () => {
    const result = init();
    expect(localStorage.getItem).toHaveBeenNthCalledWith(
      1,
      GRAPHIQL_QUERIES_URL
    );
    expect(localStorage.getItem).toHaveBeenNthCalledWith(
      2,
      `${GRAPHIQL_QUERIES}-`
    );
    expect(result.activeQuery).toEqual("");
    expect(result.queryList).toEqual([]);
  });

  it("init function should return activeQuery and queryList as 'a' and ['a','b'], when content in localStorage", () => {
    localStorage.setItem(GRAPHIQL_QUERIES_URL, "a");
    localStorage.setItem(`${GRAPHIQL_QUERIES}-a`, JSON.stringify(["d"]));
    const result = init();
    expect(result.activeQuery).toEqual("d");
    expect(result.queryList).toEqual(["d"]);
  });
});

describe("reducer actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it(`reducer should update baseUrl and queryList and update localstorage, when action type=${UPDATE_BASE_URL}`, () => {
    localStorage.setItem(GRAPHIQL_QUERIES_URL, "a");
    localStorage.setItem(`${GRAPHIQL_QUERIES}-hope`, JSON.stringify(["d"]));

    const currentState = { baseUrl: "test", queryList: [] };
    const action = { type: UPDATE_BASE_URL, payload: "hope" };
    const newState = reducer(currentState, action);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      GRAPHIQL_QUERIES_URL,
      "hope"
    );
    expect(localStorage.getItem).toHaveBeenNthCalledWith(
      1,
      `${GRAPHIQL_QUERIES}-hope`
    );
    expect(newState.baseUrl).toEqual("hope");
    expect(newState.queryList).toEqual([]);
  });
  it(`reducer should update textAreaRef when action type = ${ADD_TEXT_AREA_REF}`, () => {
    const currentState = {};
    const action = { type: ADD_TEXT_AREA_REF, payload: "hope" };
    const newState = reducer(currentState, action);
    expect(newState.textAreaRef).toEqual("hope");
  });

  it(`reducer should update queryEditorRef when action type = ${ADD_QUERY_EDITOR_REF}`, () => {
    const currentState = {};
    const action = { type: ADD_QUERY_EDITOR_REF, payload: "hope" };
    const newState = reducer(currentState, action);
    expect(newState.queryEditorRef).toEqual("hope");
  });

  it(`reducer should update activeQuery when action type = ${UPDATE_ACTIVE_QUERY}`, () => {
    const currentState = {};
    const action = { type: UPDATE_ACTIVE_QUERY, payload: "hope" };
    const newState = reducer(currentState, action);
    expect(newState.activeQuery).toEqual("hope");
  });

  it(`reducer should update requestBody, when action type = ${CREATE_QUERY_REQUEST_BODY}`, () => {
    const currentState = { activeQuery: "hope" };
    const action = { type: CREATE_QUERY_REQUEST_BODY };
    const newState = reducer(currentState, action);
    expect(newState.requestBody).toEqual(`{"query":"hope"}`);
  });

  it(`should update querylist and localStorage, when action type = ${SAVE_QUERY_TO_LOCAL_STORAGE}`, () => {
    const currentState = {
      baseUrl: "a",
      activeQuery: "hope",
      queryList: ["test"],
    };
    const action = { type: SAVE_QUERY_TO_LOCAL_STORAGE };
    const newState = reducer(currentState, action);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      `${GRAPHIQL_QUERIES}-a`,
      '["hope","test"]'
    );
    expect(newState.queryList).toEqual(["hope", "test"]);
  });

  it(`should update showQueryListHistory, when action type = ${TOGGLE_SHOW_QUERY_LIST_HISTORY}`, () => {
    const currentState = { showQueryListHistory: false };
    const action = { type: TOGGLE_SHOW_QUERY_LIST_HISTORY };
    const newState = reducer(currentState, action);
    expect(newState.showQueryListHistory).toEqual(true);
  });

  it(`reducer should update queryList, when action type is ${DELETE_QUERY}`, () => {
    localStorage.setItem(GRAPHIQL_QUERIES_URL, "a");

    const currentState = { baseUrl: "a", queryList: ["a", "b", "c"] };
    const action = { type: DELETE_QUERY, payload: 1 };
    const newState = reducer(currentState, action);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      `${GRAPHIQL_QUERIES}-a`,
      '["a","c"]'
    );
    expect(newState.queryList).toEqual(["a", "c"]);
  });
  it(`reducer should return state, when action type if not catered`, () => {
    const currentState = {};
    const action = { type: "hello", payload: "hope" };
    const newState = reducer(currentState, action);
    expect(newState).toEqual(currentState);
  });
});
