import { Min } from "../../src/rules/Min";

describe("Min Rule", () => {
  test('it can validate length of strings', () => {

    const minmum = new Min();

    expect(minmum.validate("abcde", 4)).toBeTruthy();
    expect(minmum.validate("abc", 4)).toBeFalsy();
    expect(minmum.validate("6", 4)).toBeTruthy();
    expect(minmum.validate("3", 4)).toBeFalsy();

  })

  test('it can validate min value of numbers', () => {

    const minmum = new Min();

    expect(minmum.validate(6, 4)).toBeTruthy();
    expect(minmum.validate(2, 4)).toBeFalsy();
    expect(minmum.validate(BigInt(10), 4)).toBeTruthy();

  })
});
