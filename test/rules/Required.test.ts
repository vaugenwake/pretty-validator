import { Required } from "../../src/rules/Required";

describe("Required Rule", () => {
  test("returns false on empty value", () => {
    const required = new Required();

    expect(required.validate("")).toBeFalsy();
    expect(required.validate(null)).toBeFalsy();
  });

  test("returns true on non empty value", () => {
    const required = new Required();

    expect(required.validate("123")).toBeTruthy();
    expect(required.validate(123)).toBeTruthy();
  });
});
