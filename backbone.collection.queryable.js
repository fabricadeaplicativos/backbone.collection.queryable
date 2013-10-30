/**
Defines a Backbone.Collection with a query method
that implements the same powerful querying API of mongoDB

@module backbone.collection.queryable
*/
define(["backbone.collection.lazy","underscore","underscore.deep","underscore.containers"],
function(LazyCollection           , undef      , undef           , undef                 ) {

    var Queryable = LazyCollection.extend({
        initialize: function(models, options) {
            // bind methods
            _.bindAll(this,'query','_evaluateModel','_evaluateValue');
        },
        /**


        @class Queryable
        @constructor
        @param {Array} models
        @param {Object} options
        */

        queryOne: function(criteria, projection) {
            var res = this.query(criteria).take(1).first();

            return res;
        },

        query: function(criteria, projection) {
            var _this = this,
                // filter models using the _evaluateModel method.
                lazyModels = this.filter(function(model) {
                    return _this._evaluateModel(model, criteria);
                });

            return projection ? lazyModels.map(function(model) {
                                    return _this._projectModel(model, projection)
                                }) : lazyModels;
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

        /**
         * QUERY OPERATORS
         */
        operators: {
            // match values
            $match: function(expected, value, operators) {

                if (_.isArray(value)) {
                    return _.any(value, function(v) {
                        return _.isRegExp(expected) ? expected.test(v) : expected === v;
                    });

                } else {
                    return _.isRegExp(expected) ? expected.test(value) : expected === value;
                }

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
                return _.isArray(value) ? _.containsAny(expected, value) : _.contains(expected, value);
            },
            /**
            @method in
            @namespace operators
            @param expected {Array}
            @param value {String|Number}
            */

            $nin: function(expected, value, operators) {
                return _.isArray(value) ? !_.containsAny(expected, value) : !_.contains(expected, value);
            },

            $all: function(expected, value, operators) {
                return _.containsAll(value, expected);
            },

            // Boolean
            $e: function(expected, value, operators) {

            },
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
            var _this = this;

            /**
             * If the criterion is an object, it demands special behaviour
             */
            if (_.isObject(criterion) && !_.isRegExp(criterion)) {
                // plain object
                return _.every(criterion, function(expected, operator) {
                    return _this.operators[ operator ](expected, value, this.operators);
                });

            } else {
                // simple comparison
                return this.operators.$match(criterion, value, this.operators);
            }
        },
        /**
        Applies operators on single value entities.

        @method
        @private
        */


        /**
         * PROJECTION OPERATORS
         */

        _projectModel: function(model, projection) {
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
