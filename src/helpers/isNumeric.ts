import isNumber from './isNumber';
import isBigInt from './isBigInt';

export default function (value: any) {


    if (typeof value === 'string' && Number.isNaN(+value)) {
        // Is a string of a number like "2" or "1234567"
        return false;
    }

    return (isNumber(value) || typeof Number(value) === 'number' || isBigInt(value));
}