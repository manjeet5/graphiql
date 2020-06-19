import React from "react";
import QueryResult, {
  getComma,
  calculatePaddingLeft,
  createCurlyBracket,
  createSquareBracket,
  createProperty,
  isLastItem,
  parseArray,
  parseObject,
  parseResults,
  showLoader,
} from "../../../../js/components/editor/QueryResult";
import {
  COMMA,
  OPEN_CURLY_BRACKET,
  CLOSE_CURLY_BRACKET,
  OPEN_SQUARE_BRACKET,
  CLOSE_SQUARE_BRACKET,
} from "../../../../js/components/constants/graphiqlConstants";
import { shallow } from "../../../../enzyme";
import { render, screen, waitForElement } from "@testing-library/react";
const mockFetch = (mockData) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
};

describe("utility functions", () => {
  it("calculatePaddingLeft should return 2rem", () => {
    expect(calculatePaddingLeft(2)).toEqual("2rem");
  });

  it('showLoader should render ".loader-container" class', () => {
    const loader = showLoader();
    expect(loader.props.className).toEqual("loader-container");
  });

  describe("getComma", () => {
    it("should return null - when isLastItem = true", () => {
      expect(getComma(true)).toEqual(null);
    });
    it(`should return "'${COMMA}" - when isLastItem = false`, () => {
      expect(getComma(false)).toEqual(COMMA);
    });
  });

  describe("createCurlyBracket", () => {
    it(`should create ${OPEN_CURLY_BRACKET} when isOpen is true`, () => {
      const element = createCurlyBracket(1, true, false);
      expect(element.props.children).toEqual(OPEN_CURLY_BRACKET);
    });
    it(`should render "${CLOSE_CURLY_BRACKET}" and ${COMMA} when isOpen and isLastItem is false`, () => {
      const element = createCurlyBracket(1, false, false);
      expect(element.props.children[0]).toEqual(CLOSE_CURLY_BRACKET);
      expect(element.props.children[1]).toEqual(COMMA);
    });
  });

  describe("createSquareBracket", () => {
    it(`should render ${OPEN_SQUARE_BRACKET} and className="query-result-open-square-bracket", when isOpen is true`, () => {
      const element = createSquareBracket(1, true, false);
      expect(element.props.className).toEqual(
        "query-result-open-square-bracket"
      );
      expect(element.props.children).toEqual(OPEN_SQUARE_BRACKET);
    });
    it(`should render "${CLOSE_SQUARE_BRACKET}" and ${COMMA} when isOpen and isLastItem is false`, () => {
      const element = createSquareBracket(1, false, false);
      expect(element.props.children[0]).toEqual(CLOSE_SQUARE_BRACKET);
      expect(element.props.children[1]).toEqual(COMMA);
    });
  });

  describe("createProperty", () => {
    describe("value is type of string", () => {
      const element = createProperty(1, "test", "yolo", false);
      const [nameElement, valueElement, comma] = element.props.children;
      it('nameElement should render className="query-result-name"', () => {
        expect(nameElement.props.className).toEqual("query-result-name");
      });
      it('valueElement should render className="query-result-type-string"', () => {
        expect(valueElement.props.className).toEqual(
          "query-result-type-string"
        );
      });
      it('comma value should ",", when isLastItem is false', () => {
        expect(comma).toEqual(COMMA);
      });
    });
    describe("value is type of object", () => {
      const element = createProperty(1, "test", {}, false);
      const [nameElement, valueElement, comma] = element.props.children;
      it('nameElement should render className="query-result-name"', () => {
        expect(nameElement.props.className).toEqual("query-result-name");
      });
      it("valueElement should render open curly bracket", () => {
        expect(valueElement.props.children[0]).toEqual(OPEN_CURLY_BRACKET);
      });
      it('comma value should "false"', () => {
        expect(comma).toEqual(false);
      });
    });
    describe("value is type of number", () => {
      const element = createProperty(1, "test", 1, true);
      const [nameElement, valueElement, comma] = element.props.children;
      it('nameElement should render className="query-result-name"', () => {
        expect(nameElement.props.className).toEqual("query-result-name");
      });
      it('valueElement should render className="query-result-type-number"', () => {
        expect(valueElement.props.className).toEqual(
          "query-result-type-number"
        );
      });
      it('comma value should "null", when isLastItem is true', () => {
        expect(comma).toEqual(null);
      });
    });
  });

  describe("isLastItem", () => {
    describe("object", () => {
      const obj = { a: "a", b: "b" };
      it("should return true, when traversing through lastItem in object", () => {
        expect(isLastItem(1, obj)).toEqual(true);
      });
      it("should return false, when not traversing through lastItem in object", () => {
        expect(isLastItem(0, obj)).toEqual(false);
      });
    });
    describe("array", () => {
      const arr = ["a", "b"];
      it("should return true, when traversing through lastItem in array", () => {
        expect(isLastItem(1, arr)).toEqual(true);
      });
      it("should return false, when not traversing through lastItem in array", () => {
        expect(isLastItem(0, arr)).toEqual(false);
      });
    });
  });

  describe("parseArray", () => {
    const array = [{ a: "test" }];
    let result, openCurlyBracket, content, closingCurlyBracket;
    beforeEach(() => {
      result = parseArray(array, 1);
      [openCurlyBracket, content, closingCurlyBracket] = result;
    });
    it("should return 3 items", () => {
      expect(result.length).toEqual(3);
    });

    it(`openCurlyBracket should render ${OPEN_CURLY_BRACKET}`, () => {
      expect(openCurlyBracket.props.children).toEqual(OPEN_CURLY_BRACKET);
    });
    it(`content should render "query-result-type-string"`, () => {
      const wrapper = shallow(content);
      expect(wrapper.props().children[1].props.className).toEqual(
        "query-result-type-string"
      );
    });
    it(`closingCurlyBracket should render ${CLOSE_CURLY_BRACKET}`, () => {
      expect(closingCurlyBracket.props.children[0]).toEqual(
        CLOSE_CURLY_BRACKET
      );
    });
  });
  describe("parseObject", () => {
    describe("object does not have nested object", () => {
      let result;
      const obj = { a: "test" };
      beforeEach(() => {
        result = parseObject(obj);
      });
      it("result should have 1 item", () => {
        expect(result.length).toEqual(1);
      });
      it('the item should have className="query-result-type-string"', () => {
        const wrapper = shallow(result[0]);
        expect(wrapper.props().children[1].props.className).toEqual(
          "query-result-type-string"
        );
      });
    });
    describe("object has nested object", () => {
      let result, nameAndOpenCurlyBracket, content, closingCurlyBracket;
      const obj = { a: { test: "world" } };
      beforeEach(() => {
        result = parseObject(obj, 1);
        [nameAndOpenCurlyBracket, content, closingCurlyBracket] = result;
      });
      it("result should have 3 items", () => {
        expect(result.length).toEqual(3);
      });
      it(`nameAndOpenCurlyBracket should have name and ${OPEN_CURLY_BRACKET}`, () => {
        const wrapper = shallow(nameAndOpenCurlyBracket);
        expect(wrapper.props().children[0].props.children).toEqual("a");
        expect(wrapper.props().children[1].props.children).toEqual(
          OPEN_CURLY_BRACKET
        );
      });
      it('content should render ".query-result-type-string"', () => {
        const wrapper = shallow(content);
        expect(wrapper.props().children[1].props.className).toEqual(
          "query-result-type-string"
        );
      });

      it(`closingCurlyBracket should render ${CLOSE_CURLY_BRACKET}`, () => {
        expect(closingCurlyBracket.props.children[0]).toEqual(
          CLOSE_CURLY_BRACKET
        );
      });
    });
  });
  describe("parseResults", () => {
    it("should render open and curly bracket when depth = 0 and result is an empty object", () => {
      const result = parseResults({}, 0);
      expect(result[0].props.children).toEqual(OPEN_CURLY_BRACKET);
      expect(result[1].props.children[0]).toEqual(CLOSE_CURLY_BRACKET);
    });
    it("should render 3 items when result is array", () => {
      const result = parseResults([{ a: "b" }], 1);
      expect(result.length).toEqual(3);
    });
    it("should render 1 item when result is obj", () => {
      const result = parseResults({ a: "b" }, 1);
      expect(result.length).toEqual(1);
    });
  });
});

describe("QueryResult", () => {
  let dispatch;
  const requestBody = { query: "hi" };
  jest.useFakeTimers();
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it("render successfully", async () => {
    const useApiFetchMock = { a: "b" };
    mockFetch(useApiFetchMock);
    render(
      <QueryResult dispatch={dispatch} requestBody={requestBody} baseUrl="" />
    );
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live");
    const contentElement = await waitForElement(() =>
      screen.getAllByTestId("content-element")
    );
    expect(contentElement.length).toEqual(3);
  });
});
