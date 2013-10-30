define([], function() {

	var data = {};

	data.fruits = [
        {
            id: 1,
            name: 'Banana',
            color: ['yellow'],
            flavor: ['sweet'],
            price: 29,
        },
        {
            id: 2,
            name: 'Apple',
            color: ['green','yellow','red'],
            flavor: ['sweet','citric'],
            price: 49,
        },
        {
            id: 3,
            name: 'Watermelon',
            color: ['green'],
            flavor: ['sweet'],
            price: 55
        },
        {
            id: 4,
            name: 'Melon',
            color: ['yellow'],
            flavor: ['sweet'],
            price: 30
        },
        {
            id: 5,
            name: 'Lemon',
            color: ['yellow','green'],
            flavor: ['citric'],
            price: 25
        }
    ];


    // people
    data.people = [
        {
            id: 0,
            name: 'Ana',
            occupation: 'student',
        },
        {
            id: 1,
            name: 'Joao',
        }
    ];

    return data;
})
