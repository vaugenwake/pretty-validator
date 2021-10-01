import { Validator } from "../src/Validator";

describe('Validator', () => {
  test('can set initial form data', () => {
    const data = {
      name: 'Test',
      email: 'test@example.com'
    };

    const validator = new Validator({
      name: ['required']
    });

    validator.setData(data);

    expect(validator.all()).toBe(data);
  });

  test('can validate valid inputs', () => {
    const data = {
      name: 'Test',
      email: 'test@example.com'
    };

    const validator = new Validator({
      name: ['required'],
      email: ['required', 'email']
    });

    validator.setData(data);

    expect(validator.validate()).toBeTruthy();
    expect(validator.errors().any()).toBeFalsy();
  });

  test('can validate failed inputs', () => {
    const data = {
      name: '',
      email: 'test123'
    };

    const validator = new Validator({
      name: ['required'],
      email: ['required', 'email']
    });

    validator.setData(data);

    expect(validator.validate()).toBeFalsy();
    expect(validator.errors().has('name')).toBeTruthy();
    expect(validator.errors().has('email')).toBeTruthy();
  });

  test('can validate valid inputs with params', () => {
    const data = {
      name: 'Test'
    };

    const validator = new Validator({
      name: ['required', 'min:7']
    });

    validator.setData(data);

    expect(validator.validate()).toBeFalsy();
    expect(validator.errors().any()).toBeTruthy();
    expect(validator.errors().has('name')).toBeTruthy();
  });

  test('can validate valid inputs with string rules', () => {
    const data = {
      name: 'Test'
    };

    const validator = new Validator({
      name: 'required|min:7'
    });

    validator.setData(data);

    expect(validator.validate()).toBeFalsy();
    expect(validator.errors().any()).toBeTruthy();
    expect(validator.errors().has('name')).toBeTruthy();
  });

  test('can validate valid inputs that are not required', () => {
    const data = {
      name: 'Test',
      email: ''
    };

    const validator = new Validator({
      name: ['required'],
      email: ['email']
    });

    validator.setData(data);

    expect(validator.validate()).toBeTruthy();
    expect(validator.errors().any()).toBeFalsy();
    expect(validator.errors().has('email')).toBeFalsy();
  });

  test('can validate valid inputs that are not required by have a value', () => {
    const data = {
      name: 'Test',
      email: 'test'
    };

    const validator = new Validator({
      name: ['required'],
      email: ['email']
    });

    validator.setData(data);

    expect(validator.validate()).toBeFalsy();
    expect(validator.errors().any()).toBeTruthy();
    expect(validator.errors().has('email')).toBeTruthy();
  });
});
