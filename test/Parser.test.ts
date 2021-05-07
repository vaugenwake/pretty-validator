import { Parser } from "../src/Parser";

describe("Parser", () => {
  test("can parse string runner definitions into array", () => {
    const parser = new Parser();

    expect(parser.runner("required|min:3")).toStrictEqual([
      "required",
      "min:3",
    ]);
    expect(parser.runner(["required", "email"])).toStrictEqual([
      "required",
      "email",
    ]);
  });

  test("can parse rule parameters into tupel", () => {
    const parser = new Parser();

    expect(parser.rule("min:3")).toStrictEqual(["min", "3"]);
    expect(parser.rule("something:123,123")).toStrictEqual([
      "something",
      "123,123",
    ]);
  });

  test("can parse error relevant error messages", () => {
    const parser = new Parser();

    expect(
      parser.message("required", "first_name", "", ":attribute is required")
    ).toEqual("First Name is required");

    expect(
      parser.message(
        "min",
        "first_name",
        "",
        ":attribute cannot be less than :param",
        5
      )
    ).toEqual("First Name cannot be less than 5");

    expect(
      parser.message(
        "email",
        "email_address",
        "test@example",
        ":value is not a valid email-address"
      )
    ).toEqual("test@example is not a valid email-address");
  });

  test("can parse customer error messages", () => {
    const parser = new Parser({
      "first_name.required": "First is required testing",
    });

    expect(
      parser.message("required", "first_name", "", ":attribute is required")
    ).toEqual("First is required testing");
  });
});
