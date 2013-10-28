/**
Defines a Backbone.Collection with a query method
that implements the same powerful querying API of mongoDB

@module backbone.collection.queryable
*/
define(["backbone.collection.lazy","underscore","underscore.deep","underscore.containers"],
function(LazyCollection           , undef      , undef           , undef                 ) {

    var Queryable = LazyCollection.extend({
        initialize: function(models, options) {

        },
        /**


        @class Queryable
        @constructor
        @param {Array} models
        @param {Object} options
        */

        query: function(criteria, options) {
            var _this = this,
                options = options || {},
                skip = options.skip || 0,
                limit = options.limit;

                // filter models using the _evaluateModel method.
                filtered = this.filter(function(model) {

                    return _this._evaluateModel(model, criteria);
                });

            if (!_.isUndefined(initial) && !_.isUndefined(pageLength) ) {
                return _.chain(filtered)
                        .rest(initial)
                        .first(pageLength)
                        .value();
            } else {
                return filtered;
            }
        },
        /**
        Equivalent to MongoDB's .find(criteria, [projection]) method.
        The projection parameter is not applied here because the Queryable
        collection does not return array of attributes, but rather an array
        of models.


        @method query
        @param [criteria] {Object|String|Number|Array}
        @param [options] {Object}
            @param [skip] {Number}
            @param [limit] {Number}

        */

        operators: {
            // exact match
            $match: function(expected, value, operators) {
                return _.isArray(value) ? _.contains(value, expected) : value === expected;
            },

            // Range
            $lt: function(expected, value, operators) {
                return value < expected;
            },
            $lte: function(expected, value, operators) {
                return value <= expected;
            },

            $gt: function(expected, value, operators) {
                return value > expected;
            },
            $gte: function(expected, value, operators) {
                return value >= expected;
            },

            // Set
            $in: function(expected, value, operators) {
                return _.contains(expected, value);
            },
            /**
            @method in
            @namespace operators
            @param expected {Array}
            @param value {String|Number}
            */

            $all: function(expected, value, operators) {
                return _.containsAll(expected, value);
            },
            $nin: function(expected, value, operators) {
                return !_.containsAny(expected, value);
            },

            // Boolean
            $ne: function(expected, value, operators) {
                return !operators.$match(expected, value, operators);
            },
            $not: function() {},
            $or: function() {},
            $and: function() {},
            $exists: function() {},

            // Javascript custom
            $where: function() {},
        },
        /**
        Object at which operators are stored.
        May be extended in order to provide additional operators.

        @property {Object} operators
        */

        /**
         * loop through the models properties
         */
        _evaluateModel: function(model, criteria) {
            var _this = this;

            return _.every(criteria, function(criterion, attribute) {
                    // the model's value for the given attribute name / attribute path
                var value = _.deep(model.attributes, attribute);

                return _this._evaluateValue(value, criterion);
            });
        },
        /**
        Evaluates a model against a criteria object.

        @method
        @private
        */

        _evaluateValue: function(value, criterion) {
            /**
             * If the criterion is an object, it demands special behaviour
             */
            if (_.isObject(criterion)) {

                if (_.isRegExp(criterion)) {
                    // RegExp matching.
                    return criterion.test(value);

                } else {
                    // plain object
                    return _.every(criterion, function(expected, operator) {
                        _this.operators[ operator ](expected, value, this.operators);
                    });

                }

            } else {
                // simple comparison
                return _this.operators.$match(expected, value, operators);
            }
        },
        /**
        Applies operators on single value entities.

        @method
        @private
        */

        limit: function(quantity) {

        },

        skip: function(quantity) {

        }
    });

    return Queryable;
});
