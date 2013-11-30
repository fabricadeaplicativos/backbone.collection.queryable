//     UnderscoreDeep
//     (c) simonfan
//     UnderscoreDeep is licensed under the MIT terms.

//     UnderscoreContains
//     (c) simonfan
//     UnderscoreContains is licensed under the MIT terms.

//     document-matcher
//     (c) Simon Fan
//     document-matcher is licensed under the MIT terms.

//     Backbone.Collection.Queryable
//     (c) simonfan
//     Backbone.Collection.Queryable is licensed under the MIT terms.

define("underscore.deep",["underscore"],function(n){n.mixin({deep:function(t,e,r){var u,i=e.replace(/\[(["']?)([^\1]+?)\1?\]/g,".$2").replace(/^\./,"").split("."),c=0,o=i.length;if(arguments.length>2){for(u=t,o--;o>c;)e=i[c++],t=t[e]=n.isObject(t[e])?t[e]:{};t[i[c]]=r,r=u}else{for(;null!=(t=t[i[c++]])&&o>c;);r=o>c?void 0:t}return r}})}),define("underscore.contains",["underscore"],function(n){function t(t,e){return n.all(e,function(e){return n.contains(t,e)})}function e(t,e){return n.any(e,function(e){return n.contains(t,e)})}function r(n,t){return n[0]<t&&t<n[1]}function u(n,t){return n[0]<=t&&t<=n[1]}function i(t,e,i){var c=i?r:u;return c=n.partial(c,t),n.isArray(e)?n.every(e,c):c(e)}return n.mixin({containsAll:t,containsAny:e,between:i}),n}),define("document-matcher",["underscore.deep","underscore.contains","underscore"],function(n,t,e){function r(n,t){return e.isRegExp(n)?n.test(t):n===t}function u(n,t){return e.isArray(t)?e.any(t,function(t){return r(n,t)}):r(n,t)}function i(n,t){return n>t}function c(n,t){return n>=t}function o(n,t){return t>n}function a(n,t){return t>=n}function f(n,t){return e.isArray(t)?e.containsAny(n,t):e.contains(n,t)}function s(n,t){return e.isArray(t)?!e.containsAny(n,t):!e.contains(n,t)}function l(n,t){return e.containsAll(t,n)}function d(){}function y(n,t){return!u(n,t)}function $(){}function p(){}function v(){}function h(){}function m(n,t){return e.isObject(n)&&!e.isRegExp(n)?e.every(n,function(n,e){return A[e](n,t)}):A.$match(n,t)}function g(n,t){return e.every(n,function(n,r){var u=e.deep(t,r);return m(n,u)})}function b(n){return e.partial(g,n)}var A={$matchSingle:r,$match:u,$lt:i,$lte:c,$gt:o,$gte:a,$in:f,$nin:s,$all:l,$e:d,$ne:y,$or:$,$and:p,$exists:v,$where:h};return b.evaluateValue=m,b.evaluateDocument=g,b}),define("backbone.collection.queryable",["backbone.collection.lazy","document-matcher","underscore"],function(n,t,e){var r=n.extend({matcher:t,query:function(n,e){var r=this,u=t(n),i=this.filter(function(n){return u(n.attributes)});return e?i.map(function(n){return r.project(n,e)}):i},queryOne:function(n){var t=this.query(n).take(1).first();return t},project:function(n,t){if(e.isString(t))return n.get(t);var r=this,u={};return e.each(t,function(t,i){if(t){var c=n.get(i);u[i]=e.isObject(t)?r._projectAttribute(c,t):c}}),u}});return r});