import React, { useRef, useEffect } from "react";
import { ADD_QUERY_RESULT_REF } from "../store/reducer";
import usePostFetch from "../common/usePostFetch";
import {
  COMMA,
  OPEN_CURLY_BRACKET,
  CLOSE_CURLY_BRACKET,
  OPEN_SQUARE_BRACKET,
  CLOSE_SQUARE_BRACKET,
} from "../constants/graphiqlConstants";

export const getComma = (isLastItem) => {
  return isLastItem ? null : COMMA;
};
export const calculatePaddingLeft = (depth) => {
  return depth + "rem";
};
export const createCurlyBracket = (depth, isOpen, isLastItem) => {
  const paddingLeft = calculatePaddingLeft(depth);
  if (isOpen) {
    return <span style={{ paddingLeft }}>{OPEN_CURLY_BRACKET}</span>;
  }
  return (
    <div style={{ paddingLeft }}>
      {CLOSE_CURLY_BRACKET}
      {getComma(isLastItem)}
    </div>
  );
};
export const createSquareBracket = (depth, isOpen, isLastItem) => {
  if (isOpen) {
    return (
      <span className="query-result-open-square-bracket">
        {OPEN_SQUARE_BRACKET}
      </span>
    );
  } else {
    const paddingLeft = calculatePaddingLeft(depth);
    return (
      <span style={{ paddingLeft }}>
        {CLOSE_SQUARE_BRACKET}
        {getComma(isLastItem)}
      </span>
    );
  }
};
export const createProperty = (depth, name, value, isLastItem) => {
  let valueElement,
    showComma = true;
  switch (typeof value) {
    case "object": {
      if (value === null) {
        valueElement = `null`;
      } else {
        valueElement = Array.isArray(value)
          ? createSquareBracket(1, true)
          : createCurlyBracket(1, true);
      }
      showComma = false;
      break;
    }
    case "number": {
      valueElement = <span className="query-result-type-number">{value}</span>;
      break;
    }
    case "string": {
      valueElement = <span className="query-result-type-string">{value}</span>;
      break;
    }
    default:
      break;
  }
  const comma = showComma && getComma(isLastItem);
  const paddingLeft = calculatePaddingLeft(depth);
  let nameElement = <span className="query-result-name">{name}</span>;
  return (
    <div style={{ paddingLeft }}>
      {nameElement}
      {valueElement}
      {comma}
    </div>
  );
};

export const isLastItem = (index, data) => {
  if (Array.isArray(data)) {
    return index === data.length - 1;
  }
  return index === Object.keys(data).length - 1;
};

export const parseArray = (array, depth) => {
  return array.reduce((list, item, index) => {
    const isLastItemInArray = isLastItem(index, array);
    return [
      ...list,
      createCurlyBracket(depth + 1, true),
      ...parseResults(item, depth + 1),
      createCurlyBracket(depth + 1, false, isLastItemInArray),
    ];
  }, []);
};

export const parseObject = (obj, depth) => {
  return Object.keys(obj).reduce((list, key, index) => {
    const isLastItemInObj = isLastItem(index, obj);
    if (obj[key] === null) {
      return [...list, createProperty(depth + 1, key, obj[key])];
    } else if (typeof obj[key] === "object") {
      const closingBracket = Array.isArray(obj[key])
        ? createSquareBracket(depth + 1, false, isLastItemInObj)
        : createCurlyBracket(depth + 1, false, isLastItemInObj);
      return [
        ...list,
        createProperty(depth + 1, key, obj[key]),
        ...parseResults(obj[key], depth + 1),
        closingBracket,
      ];
    } else {
      return [
        ...list,
        createProperty(depth + 1, key, obj[key], isLastItemInObj),
      ];
    }
  }, []);
};
export const parseResults = (result, depth = 0) => {
  const list = [];
  if (!depth) list.push(createCurlyBracket(depth, true));
  if (Array.isArray(result)) {
    list.push(...parseArray(result, depth));
  } else if (typeof result === "object") {
    list.push(...parseObject(result, depth));
  }
  if (!depth) list.push(createCurlyBracket(depth, false, true));
  return list;
};

export const showLoader = () => {
  return (
    <div
      id="loader"
      className="loader-container"
      aria-live="assertive"
      role="alert"
    >
      <div className="loader"></div>
    </div>
  );
};

export const showError = ({ error }) => {
  return (
    <div id="error" className="error-container" role="alert">
      {error}
    </div>
  );
};
export const addLineNumbers = (list) => {
  return list.map((item, index) => (
    <div
      tabIndex="0"
      key={index}
      data-testid={"content-element"}
      className="list-with-line-numbers"
    >
      <span className="line-numbers">{index}</span>
      {item}
    </div>
  ));
};
const QueryResult = React.memo(({ baseUrl, dispatch, requestBody }) => {
  const queryResultRef = useRef(null);
  const state = usePostFetch(baseUrl, requestBody);
  console.log("state", state);
  useEffect(() => {
    dispatch({ type: ADD_QUERY_RESULT_REF, payload: queryResultRef });
  }, [dispatch]);
  let withLineNumbers = [];
  if (state.data) {
    const list = parseResults(state.data);
    withLineNumbers = addLineNumbers(list);
  }
  return (
    <div
      tabIndex="0"
      key={requestBody.query}
      className="query-editor-results"
      ref={queryResultRef}
    >
      {state.error && <h1>Oopsy, Please Check your Query</h1>}
      {state.isLoading && showLoader()}
      {state.error && showError(state.error)}
      {withLineNumbers}
    </div>
  );
});

export default QueryResult;
