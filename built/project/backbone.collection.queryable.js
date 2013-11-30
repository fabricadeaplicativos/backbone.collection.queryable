//     Backbone.Collection.Queryable
//     (c) simonfan
//     Backbone.Collection.Queryable is licensed under the MIT terms.

define(["backbone.collection.lazy","document-matcher","underscore"],function(e,t,n){var r=e.extend({matcher:t,query:function(n,r){var i=this,s=t(n),o=this.filter(function(e){return s(e.attributes)});return r?o.map(function(e){return i.project(e,r)}):o},queryOne:function(t,n){var r=this.query(t).take(1).first();return r},project:function(t,r){if(n.isString(r))return t.get(r);var i=this,s={};return n.each(r,function(e,r){if(e){var o=t.get(r);n.isObject(e)?s[r]=i._projectAttribute(o,e):s[r]=o}}),s}});return r});