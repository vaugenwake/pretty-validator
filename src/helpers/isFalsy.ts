export default function(value:any) {
    const falsy = [
        0, '0',
        'no', 'No', 'NO',
        'off', 'Off', 'OFF',
        false, 'false', 'False', 'FALSE'
    ];

    return falsy.includes(value);
}