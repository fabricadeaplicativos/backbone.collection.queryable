//     Backbone.Collection.Queryable
//     (c) simonfan
//     Backbone.Collection.Queryable is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Backbone.Collection.Queryable
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var LazyCollection = require('backbone.collection.lazy'),
		objectQuery = require('object-query'),
		_ = require('lodash');


	var Queryable = LazyCollection.extend({
		/**
		 * @class Queryable
		 * @constructor
		 * @param models {Array}
		 */

		/**
		 * A much more powerful 'Backbone.Collection.where'
		 * method that leverages the power provided by mongo
		 * find operators.
		 *
		 * @method find
		 * @param criteria {Object}
		 * @param projection {Object}
		 * @return Lazyjs object
		 */
		find: function find(criteria, projection) {

			var _this = this,
				// build the objectQuery
				findFunc = objectQuery(criteria),

				// filter models using the findFunc func.
				lazyModels = this.filter(function (model) {
					return findFunc(model.attributes);
				});

			return projection ? lazyModels.map(function (model) {
									return _this.project(model.attributes, projection);
								}) : lazyModels;
		},

		/**
		 * Shorthand for
		 * `collection.find(criteria).take(1).first();`
		 *
		 * @method findOne
		 * @param criteria {Object}
		 * @param projection {Object}
		 * @return Model
		 */
		findOne: function findOne(criteria, projection) {
			var res = this.find(criteria).take(1).first();

			return res;
		},

		/**
		 * Instead of returning the model object,
		 * return an object with selected attributes.
		 *
		 * @method project
		 * @param model {Backbone.Model}
		 * @param projection {Object}
		 */
		project: function project(object, projection) {

			if (_.isString(projection)) {
				// projection is a string, just return the value
				// it is a key, just return the corresponding value
				return object[projection];

			} else if (_.isArray(projection)) {
				// projection is an array. assume
				// that only the defined properties are required.
				var res = {};

				_.each(projection, function (key) {
					res[key] = object[key];
				});

				return res;

			} else if (_.isObject(projection)) {
				// projection is object..
				// harder...
				var res = {};

				_.each(projection, _.bind(function (subProjection, key) {

					if (subProjection === true) {
						res[key] = object[key];
					} else {
						// go recursive.
						res[key] = this.project(object[key], subProjection);
					}

				}, this));

				return res;
			}

		},

	});

	return Queryable;
});
