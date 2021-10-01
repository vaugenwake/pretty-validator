import isBooly from './isBooly';
import isNumeric from './isNumeric';

export default function (value: any) {
    if (value === null || value == '') return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;

    if (typeof value === 'string' && !isNumeric(value)) return value.length < 0;

    if (isNumeric(value) || isBooly(value)) return false;

    return true;
}