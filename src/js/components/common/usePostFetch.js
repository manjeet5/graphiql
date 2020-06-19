import { useReducer, useEffect } from "react";
const FETCH_STARTED = "FETCH_STARTED";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

const initialState = {
  isLoading: null,
  error: null,
  data: null,
};

function reducer(state, action) {
  switch (action.type) {
    case FETCH_STARTED: {
      if (state.isLoading) {
        //cancel existing request
        state.requestAbortController.abort();
      }
      return {
        ...state,
        isLoading: true,
        requestAbortController: action.payload.abortController,
        requestBody: action.payload.requestBody,
        error: null,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    }
    case FETCH_ERROR: {
      if (action.error === "DOMException: The user aborted a request.") {
        return state;
      }
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
function usePostFetch(baseUrl, requestBody) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (requestBody) {
      const abortController = new AbortController();
      dispatch({
        type: FETCH_STARTED,
        payload: {
          abortController,
          requestBody,
        },
      });
      fetch(baseUrl, {
        signal: abortController.signal,
        body: requestBody,
        method: "POST",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((data) => dispatch({ type: FETCH_SUCCESS, payload: data }))
        .catch((error) => dispatch({ type: FETCH_ERROR, error }));
    }
  }, [baseUrl, requestBody]);
  const { isLoading, data, error } = state;
  return { isLoading, data, error };
}

export default usePostFetch;
