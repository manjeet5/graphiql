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
const createBracket = (depth, isOpen, isLastItem) => {
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
const createSquareBracket = (depth, isOpen, isLastItem) => {
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
const createProperty = (depth, name, value, isLastItem) => {
  const paddingLeft = calculatePaddingLeft(depth);
  let nameElement = <span className="query-result-name">{name}</span>;
  let valueElement = Array.isArray(value)
    ? createSquareBracket(1, true)
    : createBracket(1, true);
  if (typeof value === "number") {
    valueElement = <span className="query-result-type-number">{value}</span>;
  } else if (typeof value === "string") {
    valueElement = <span className="query-result-type-string">{value}</span>;
  }
  const comma = typeof value !== "object" && getComma(isLastItem);
  return (
    <div style={{ paddingLeft }}>
      {nameElement}
      {valueElement}
      {comma}
    </div>
  );
};

const isLastItem = (index, data) => {
  if (Array.isArray(data)) {
    return index === data.length - 1;
  } else {
    return index === Object.keys(data).length - 1;
  }
};

const parseArray = (array, depth) => {
  return array.map((item, index) => {
    const isLastItemInArray = isLastItem(index, array);
    return [
      createBracket(depth + 1, true),
      ...parseResults(item, depth + 1),
      createBracket(depth + 1, false, isLastItemInArray),
    ];
  });
};

const parseObject = (obj, depth) => {
  return Object.keys(obj).reduce((list, key, index) => {
    const isLastItemInObj = isLastItem(index, obj);
    if (typeof obj[key] === "object") {
      const closingBracket = Array.isArray(obj[key])
        ? createSquareBracket(depth + 1, false, isLastItemInObj)
        : createBracket(depth + 1, false, isLastItemInObj);
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
const parseResults = (result, depth = 0) => {
  const list = [];
  if (!depth) list.push(createBracket(depth, true));
  if (Array.isArray(result)) {
    list.push(...parseArray(result, depth));
  } else if (typeof result === "object") {
    list.push(...parseObject(result, depth, list));
  }
  if (!depth) list.push(createBracket(depth, false, true));
  return list;
};

const showLoader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};
const QueryResult = React.memo(({ dispatch, requestBody }) => {
  const queryResultRef = useRef(null);
  const baseUrl = "https://fakeql.com/graphql/eaddf714b3619f67b9495e56cd40dc9e";
  const state = usePostFetch(baseUrl, requestBody);
  useEffect(() => {
    dispatch({ type: ADD_QUERY_RESULT_REF, payload: queryResultRef });
  }, [dispatch]);
  return (
    <div
      key={requestBody.query}
      className="query-editor-results"
      ref={queryResultRef}
    >
      {state.loading && showLoader()}
      {state.data && parseResults(state.data)}
    </div>
  );
});

export default QueryResult;
