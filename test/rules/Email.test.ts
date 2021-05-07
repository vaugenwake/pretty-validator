import { Email } from "../../src/rules/Email";

describe("Email Rule", () => {
  test("returns false on invalid value", () => {
    const required = new Email();

    expect(required.validate("abc")).toBeFalsy();
    expect(required.validate("exmaple@example")).toBeFalsy();
  });

  test("returns true on valid value", () => {
    const required = new Email();

    expect(required.validate("email@example.com")).toBeTruthy();
    expect(required.validate("email@example.co.uk")).toBeTruthy();
  });
});
