define(['backbone.collection.queryable'], function(Queryable) {

return function() {

    module('Base');

    test('Initialization', function() {
        var fruits = [
            { id: 1, name: 'Banana', color: ['yellow','green'], flavor: ['sweet'] },
            { id: 2, name: 'Apple', color: ['green','yellow','red'], flavor: ['sweet','citric'] },
            { id: 3, name: 'Watermelon', color: ['green'], flavor: ['sweet'] },
            { id: 4, name: 'Melon', color: ['yellow'], flavor: ['sweet'] },
            { id: 5, name: 'Lemon', color: ['yellow','green'], flavor: ['citric'] }
        ];

        var collection = new Queryable(fruits);

        ok(collection);
    });

}
});
