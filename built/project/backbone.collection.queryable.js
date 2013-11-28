//     Backbone.Collection.Queryable
//     (c) simonfan
//     Backbone.Collection.Queryable is licensed under the MIT terms.

define(["backbone.collection.lazy","document-matcher","underscore"],function(e,t,n){var r=e.extend({initialize:function(t,r){n.bindAll(this,"query")},query:function(n,r){var i=this,s=t(n),o=this.filter(function(e){return s(e.attributes)});return r?o.map(function(e){return i._projectModel(e,r)}):o},queryOne:function(t,n){var r=this.query(t).take(1).first();return r},_projectModel:function(){}});return r});