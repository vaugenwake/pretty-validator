import isBool from './isBool';
import isFalsy from './isFalsy';
import isTruthy from './isTruthy';

/**
 * Value is boolean, truthy, falsy
 * 
 * @param value 
 * @returns boolean
 */

export default function(value:any)
{
    return isBool(value) || isFalsy(value) || isTruthy(value);
}