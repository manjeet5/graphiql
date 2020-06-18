import { renderHook, act } from "@testing-library/react-hooks";
import usePostFetch from "../../../../js/components/common/userPostFetch";
import EnvironmentUtils from "../../../../js/components/utils/EnvironmentUtils";

const mockFetch = (mockData) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
};

const mockFetchError = (error) => {
  global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

const mockFetchCleanUp = () => {
  global.fetch.mockClear();
  delete global.fetch;
};

describe("usePostFetch", () => {
  beforeAll(() => {});
  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });
  it("initial and success state", async () => {
    const useApiFetchMock = "hope";
    mockFetch(useApiFetchMock);
    const { result, waitForNextUpdate } = renderHook(() =>
      usePostFetch("test.com", "world")
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.error).toEqual(null);
    expect(result.current.data).toEqual(null);

    await waitForNextUpdate();
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual(null);
    expect(result.current.data).toEqual("hope");

    mockFetchCleanUp();
  });

  it("initial and error state", async () => {
    mockFetchError("error");
    const { result, waitForNextUpdate } = renderHook(() =>
      usePostFetch("test.com", "world")
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.error).toEqual(null);
    expect(result.current.data).toEqual(null);

    await waitForNextUpdate();
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual("error");
    expect(result.current.data).toEqual(null);

    mockFetchCleanUp();
  });
});
