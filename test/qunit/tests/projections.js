define(['backbone.collection.queryable','dataset'], function(Queryable, dataset) {

return function() {

    module('Projections');

    test('simple', function() {
        var fruits = new Queryable(dataset.fruits),
            fruitsArr = fruits.query(
                            { price: { $gt: 40 }},
                            { name: 1, price: 1 }
                        ).toArray();

        deepEqual(fruitsArr, [
            { name: 'Apple', price: 49 },
            { name: 'Watermelon', price: 55 }
        ]);
    });


    test('plucking attribute', function() {
        var fruits = new Queryable(dataset.fruits),
            fruitsNames = fruits.query({ price: { $gt: 40 }}, 'name').toArray();

        deepEqual(fruitsNames, ['Apple','Watermelon']);
    });

}
});
