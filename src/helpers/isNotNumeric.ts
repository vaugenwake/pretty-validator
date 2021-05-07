import isBigInt from "./isBigInt";

export default function(value:any) {
    return Number.isNaN(Number(value)) && !isBigInt(value);
}