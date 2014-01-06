(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'backbone.collection.queryable',
		// dependencies for the test
		deps = [mod, 'should', 'lodash'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(Queryable, should, _) {
	'use strict';

	describe('Queryable base', function () {
		beforeEach(function () {
			this.fruits = [
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
		});

		it('initializes', function () {
			var queryable = new Queryable(this.fruits);

			queryable.should.be.type('object');
		});

		describe('find(criteria)', function () {
			beforeEach(function () {
				this.queryableFruits = new Queryable(this.fruits);
			});

			it('range queries', function () {
				var priceBelow30 = this.queryableFruits.find({
					price: { $lt: 30 }
				}).toArray();

				_.every(priceBelow30, function (m) {
					return m.get('price') < 30;
				}).should.be.true;
			});

			it('set queries', function () {
				var melonOrBanana = this.queryableFruits.find({
					name: {
						$in: ['Melon', 'Banana']
					}
				}).toArray();

				_.every(melonOrBanana, function (f) {
					console.log(f.get('name'))
					return _.contains(['Melon', 'Banana'], f.get('name'));
				}).should.be.true;
			});
		});

		describe('findOne(criteria)', function () {

		});

		describe('find(criteria, projection)', function () {
			beforeEach(function () {
				this.queryableFruits = new Queryable(this.fruits);
			});

			it('simple string projection', function () {
				var fruitsNames = this.queryableFruits.find({
						price: { $gt: 40 }
					}, 'name').toArray();

				fruitsNames.should.eql(['Apple','Watermelon']);
			});

			it('object projection', function () {
				var fruitsArr = this.queryableFruits.find(
					{ price: { $gt: 40 }},		// criteria
					{ name: true, price: true }	// projection
				).toArray();

				fruitsArr.should.eql([
					{ name: 'Apple', price: 49 },
					{ name: 'Watermelon', price: 55 }
				]);
			})
		});
	});
});
