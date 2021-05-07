import {Validator} from '../src/Validator';

describe('Validator', () => {

    test('Sample Test', () => {
        const hello = new Validator();
        expect(hello.helloWorld()).toBe('Hello World');
    })

})