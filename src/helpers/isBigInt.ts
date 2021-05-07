export default function(value:any) {
    return typeof value === 'bigint' || typeof BigInt(value) === 'bigint';
}