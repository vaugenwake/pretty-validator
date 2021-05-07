import isTruthy from '../../src/helpers/isTruthy';
import isFalsy from '../../src/helpers/isFalsy';
import isNotNull from '../../src/helpers/isNotNull';
import isBool from '../../src/helpers/isBool';
import isBooly from '../../src/helpers/isBooly';
import isNumber from '../../src/helpers/isNumber';
import isBigInt from '../../src/helpers/isBigInt';
import isNumeric from '../../src/helpers/isNumeric';
import isEmpty from '../../src/helpers/isEmpty';
import isNotEmpty from '../../src/helpers/isNotEmpty';
import isFunction from '../../src/helpers/isFunction';

describe('Helpers', () => {

    test("values to be truthy", () => {
        expect(isTruthy(1)).toBeTruthy();
        expect(isTruthy('1')).toBeTruthy();
        expect(isTruthy('on')).toBeTruthy();
        expect(isTruthy('On')).toBeTruthy();
        expect(isTruthy('ON')).toBeTruthy();
        expect(isTruthy('yes')).toBeTruthy();
        expect(isTruthy('Yes')).toBeTruthy();
        expect(isTruthy('YES')).toBeTruthy();
        expect(isTruthy(true)).toBeTruthy();
        expect(isTruthy('true')).toBeTruthy();
        expect(isTruthy('True')).toBeTruthy();
        expect(isTruthy('TRUE')).toBeTruthy();
    })

    test("values to be falsy", () => {
        expect(isFalsy(0)).toBeTruthy();
        expect(isFalsy('0')).toBeTruthy();
        expect(isFalsy('off')).toBeTruthy();
        expect(isFalsy('Off')).toBeTruthy();
        expect(isFalsy('OFF')).toBeTruthy();
        expect(isFalsy('no')).toBeTruthy();
        expect(isFalsy('No')).toBeTruthy();
        expect(isFalsy('NO')).toBeTruthy();
        expect(isFalsy(false)).toBeTruthy();
        expect(isFalsy('false')).toBeTruthy();
        expect(isFalsy('False')).toBeTruthy();
        expect(isFalsy('FALSE')).toBeTruthy();
    })

    test("value is not null", () => {
        expect(isNotNull('test')).toBeTruthy();
        expect(isNotNull('null')).toBeFalsy();
    })

    test("value is not null", () => {
        expect(isFunction(() => {})).toBeTruthy();
        expect(isFunction('string')).toBeFalsy();
    })

    test("value is bool", () => {
        expect(isBool(true)).toBeTruthy();
        expect(isBool(false)).toBeTruthy();
    })

    test("value is booly", () => {
        expect(isBooly(true)).toBeTruthy();
        expect(isBooly(false)).toBeTruthy();
        expect(isBooly(1)).toBeTruthy();
        expect(isBooly('0')).toBeTruthy();
        expect(isBooly('testing')).toBeFalsy();
    })

    test("value is number", () => {
        expect(isNumber(1)).toBeTruthy();
        expect(isNumber('2')).toBeFalsy();
    })

    test("value is bigint", () => {
        expect(isBigInt(BigInt(9007199254740991))).toBeTruthy();
    })

    test("value is numeric", () => {
        expect(isNumeric(BigInt(10))).toBeTruthy();
        expect(isNumeric(12)).toBeTruthy();
    })

    test("value is empty", () => {
        expect(isEmpty('')).toBeTruthy();
        expect(isEmpty({})).toBeTruthy();
        expect(isEmpty([])).toBeTruthy();
        expect(isEmpty(false)).toBeTruthy();
        expect(isEmpty(true)).toBeFalsy();
        expect(isEmpty('a')).toBeFalsy();
    })

    test("value is not empty", () => {
        expect(isNotEmpty('test')).toBeTruthy();
        expect(isNotEmpty({key: 'item'})).toBeTruthy();
        expect(isNotEmpty([{}])).toBeTruthy();
        expect(isNotEmpty(true)).toBeTruthy();
        expect(isNotEmpty('')).toBeFalsy();
    })

})