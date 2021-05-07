import { Min } from "../../src/rules/Min";

describe("Min Rule", () => {
  test("returns false on invalid value", () => {
    const required = new Min();

    expect(required.validate("abc", "7")).toBeFalsy();
    expect(required.validate(5, "7")).toBeFalsy();
  });

  test("returns true on valid value", () => {
    const required = new Min();

    expect(required.validate("abcdefgh", "7")).toBeTruthy();
    expect(required.validate(20, "7")).toBeTruthy();
  });
});
