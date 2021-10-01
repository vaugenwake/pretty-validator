import { Validator } from "../src/Validator";

describe("Validator", () => {

  test('can set initial form data', () => {
    const data = {
      name: "test",
      email: "test@example.com"
    };

    const validator = new Validator({
      name: ['required']
    });

    validator.setData(data);

    expect(validator.all()).toBe(data);
  })

});
