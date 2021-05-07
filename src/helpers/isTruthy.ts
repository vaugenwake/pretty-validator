export default function(value: any) {
    const truthy = [
        1, '1',
        'on', 'On', 'ON',
        'yes', 'Yes', 'YES',
        true, 'true', 'True', 'TRUE'
    ];

    return truthy.includes(value);
}