import {
  reducer,
  init,
  ADD_TEXT_AREA_REF,
  ADD_QUERY_EDITOR_REF,
  UPDATE_ACTIVE_QUERY,
  CREATE_QUERY_REQUEST_BODY,
  SAVE_QUERY_TO_LOCAL_STORAGE,
  TOGGLE_SHOW_QUERY_LIST_HISTORY,
} from "../../../../js/components/store/reducer.js";

test("init function should return activeQuery and queryList as empty string and array, when no content in localStorage", () => {
  const browserWindowStub = {
    localStorage: {
      getItem: () => undefined,
    },
  };
  const result = init(browserWindowStub);
  expect(result.activeQuery).toEqual("");
  expect(result.queryList).toEqual([]);
});

test("init function should return activeQuery and queryList as 'a' and ['a','b'], when content in localStorage", () => {
  const browserWindowStub = {
    localStorage: {
      getItem: () => JSON.stringify(["a", "b"]),
    },
  };
  const result = init(browserWindowStub);
  expect(result.activeQuery).toEqual("a");
  expect(result.queryList).toEqual(["a", "b"]);
});

describe("reducer actions", () => {
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

  it(`should update querylist, when action type = ${SAVE_QUERY_TO_LOCAL_STORAGE}`, () => {
    const currentState = { activeQuery: "hope", queryList: ["test"] };
    const action = { type: SAVE_QUERY_TO_LOCAL_STORAGE };
    const newState = reducer(currentState, action);
    expect(newState.queryList).toEqual(["hope", "test"]);
  });

  it(`should update showQueryListHistory, when action type = ${TOGGLE_SHOW_QUERY_LIST_HISTORY}`, () => {
    const currentState = { showQueryListHistory: false };
    const action = { type: TOGGLE_SHOW_QUERY_LIST_HISTORY };
    const newState = reducer(currentState, action);
    expect(newState.showQueryListHistory).toEqual(true);
  });

  it(`reducer should return state, when action type if not catered`, () => {
    const currentState = {};
    const action = { type: "hello", payload: "hope" };
    const newState = reducer(currentState, action);
    expect(newState).toEqual(currentState);
  });
});
