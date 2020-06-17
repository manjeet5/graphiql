import { getWindow } from "../../../../js/components/utils/EnvironmentUtils";

test("getWindow should return window", () => {
  const browserWindow = getWindow();
  expect(browserWindow).toEqual(window);
});
