import isNumber from './isNumber';
import isBigInt from './isBigInt';

export default function(value:any) {
    return (isNumber(value) || typeof Number(value) === 'number' || isBigInt(value));
}