define(['backbone.collection.queryable','dataset','underscore.containers'], function(Queryable, dataset, undef) {


function pluck(models, attr) {
    return _.map(models, function(m) {
        return m.get(attr);
    })
}

return function() {

    module('Operators.set');

    test('$in, simple', function() {
        var fruits = new Queryable(dataset.fruits),
            melonOrBanana = fruits.query({ name: { $in: ['Melon','Banana'] }}).toArray();

        melonOrBanana = _.map(melonOrBanana, function(fr) { return fr.get('name') });

        ok(_.contains(melonOrBanana, 'Melon') && _.contains(melonOrBanana, 'Banana') && melonOrBanana.length === 2);
    });

    test('$in, for array keys', function() {
        var fruits = new Queryable(dataset.fruits),
            redOrGreen = fruits.query({ color: { $in: ['red','green'] } }).toArray();

        redOrGreen = _.map(redOrGreen, function(fr) { return fr.get('name') });

        ok(_.containsAll(redOrGreen, ['Apple','Watermelon','Lemon']))
    });


    test('$nin', function() {
        var fruits = new Queryable(dataset.fruits),
            notRedNorGreen = fruits.query({ color: { $nin: ['red','green'] } }).toArray(),

            resultColors = _.union( _.flatten( pluck(notRedNorGreen,'color') ) );

        ok(!_.containsAny(resultColors, ['red','green']));
        deepEqual(resultColors, ['yellow'])
    })


    test('$all', function() {
        var fruits = new Queryable(dataset.fruits),
            redAndGreen = fruits.query({ color: { $all: ['red','green'] } }).toArray();

        redAndGreen = pluck(redAndGreen, 'name');

        deepEqual(redAndGreen, ['Apple']);
    });

}
});
