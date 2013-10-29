define(['backbone.collection.queryable','dataset'], function(Queryable, dataset) {

return function() {

    module('Base');

    test('Initialization', function() {;

        var collection = new Queryable(dataset.fruits);

        ok(collection);
    });

    test('queryOne(criteria, options)', function() {
        var fruits = new Queryable(dataset.fruits);

        equal(fruits.queryOne({ name: 'Apple' }).get('name'), 'Apple');
    });

    test('query(criteria, options), simple criteria', function() {
        var fruits = new Queryable(dataset.fruits),
            yellow = fruits.query({ color: 'yellow' }).toArray(),
            yellowIds = _.map(yellow, function(fr) { return fr.get('id') });

        deepEqual(yellowIds, [1,2,4,5]);
    })
}
});
