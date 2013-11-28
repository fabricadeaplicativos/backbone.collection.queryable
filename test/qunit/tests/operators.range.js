define(['backbone.collection.queryable','dataset','underscore'],
function(Queryable                     , dataset , undef      ) {

return function() {

    module('Operators.range');

    test('$lt and $lte', function() {
        var fruits = new Queryable(dataset.fruits),
            priceBelow30 = fruits.query({
                price: { $lt: 30 }
            }).toArray();

        ok(_.every(priceBelow30, function(fruit) {
            return fruit.get('price') < 30;
        }));

    });

    test('$gt and $gte', function() {
        var fruits = new Queryable(dataset.fruits),
            priceOver30 = fruits.query({
                price: { $gt: 30 }
            }).toArray();

        ok(_.every(priceOver30, function(fruit) {
            return fruit.get('price') > 30;
        }))
    })
}
});
