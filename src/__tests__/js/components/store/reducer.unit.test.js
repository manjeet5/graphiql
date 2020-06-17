import {
  reducer,
  init,
  ADD_TEXT_AREA_REF,
  ADD_QUERY_EDITOR_REF,
  UPDATE_ACTIVE_QUERY,
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

test(`reducer should update textAreaRef when action type = ${ADD_TEXT_AREA_REF}`, () => {
  const currentState = {};
  const action = { type: ADD_TEXT_AREA_REF, payload: "hope" };
  const newState = reducer(currentState, action);
  expect(newState.textAreaRef).toEqual("hope");
});

test(`reducer should update queryEditorRef when action type = ${ADD_QUERY_EDITOR_REF}`, () => {
  const currentState = {};
  const action = { type: ADD_QUERY_EDITOR_REF, payload: "hope" };
  const newState = reducer(currentState, action);
  expect(newState.queryEditorRef).toEqual("hope");
});

test(`reducer should update activeQuery when action type = ${UPDATE_ACTIVE_QUERY}`, () => {
  const currentState = {};
  const action = { type: UPDATE_ACTIVE_QUERY, payload: "hope" };
  const newState = reducer(currentState, action);
  expect(newState.activeQuery).toEqual("hope");
});

test(`reducer should return state, when action type if not catered`, () => {
  const currentState = {};
  const action = { type: "hello", payload: "hope" };
  const newState = reducer(currentState, action);
  expect(newState).toEqual(currentState);
});
