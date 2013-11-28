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

define(['backbone.collection.lazy', 'document-matcher', 'underscore'],
function (LazyCollection          , matcher           , _           ) {

	'use strict';


	var Queryable = LazyCollection.extend({
		/**
		 * @class Queryable
		 * @constructor
		 * @param models {Array}
		 */

		/**
		 * Simple reference to matcher.
		 * @method matcher
		 */
		matcher: matcher,

		/**
		 * A much more powerful 'Backbone.Collection.where'
		 * method that leverages the power provided by mongo
		 * query operators.
		 *
		 * @method query
		 * @param criteria {Object}
		 * @param projection {Object}
		 * @return Lazyjs object
		 */
		query: function query(criteria, projection) {

			var _this = this,
				// build the document matcher
				match = matcher(criteria),

				// filter models using the match func.
				lazyModels = this.filter(function (model) {
					return match(model.attributes);
				});

			return projection ? lazyModels.map(function (model) {
									return _this.project(model, projection);
								}) : lazyModels;
		},

		/**
		 * Shorthand for
		 * `collection.query(criteria).take(1).first();`
		 *
		 * @method queryOne
		 * @param criteria {Object}
		 * @param projection {Object}
		 * @return Model
		 */
		queryOne: function queryOne(criteria, projection) {
			var res = this.query(criteria).take(1).first();

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
		project: function project(model, projection) {

			if (_.isString(projection)) {
				return model.get(projection);

			} else {
				var _this = this,
					r = {};

				_.each(projection, function(requirement, attributeName) {

					if (requirement) {
							// get the value.
						var attribute = model.get(attributeName);

						if (_.isObject(requirement)) {
							// set
							r[ attributeName ] = _this._projectAttribute(attribute, requirement);
						} else {
							r[ attributeName ] = attribute;
						}

					}
				});

				return r;
			}

		},

	});

	return Queryable;
});
