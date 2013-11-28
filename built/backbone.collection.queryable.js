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

define("underscore.deep",["underscore"],function(n){n.mixin({deep:function(e,t,r){var u,i=t.replace(/\[(["']?)([^\1]+?)\1?\]/g,".$2").replace(/^\./,"").split("."),c=0,o=i.length;if(arguments.length>2){for(u=e,o--;o>c;)t=i[c++],e=e[t]=n.isObject(e[t])?e[t]:{};e[i[c]]=r,r=u}else{for(;null!=(e=e[i[c++]])&&o>c;);r=o>c?void 0:e}return r}})}),define("underscore.contains",["underscore"],function(n){function e(e,t){return n.all(t,function(t){return n.contains(e,t)})}function t(e,t){return n.any(t,function(t){return n.contains(e,t)})}function r(n,e){return n[0]<e&&e<n[1]}function u(n,e){return n[0]<=e&&e<=n[1]}function i(e,t,i){var c=i?r:u;return c=n.partial(c,e),n.isArray(t)?n.every(t,c):c(t)}return n.mixin({containsAll:e,containsAny:t,between:i}),n}),define("document-matcher",["underscore.deep","underscore.contains","underscore"],function(n,e,t){function r(n,e){return t.isRegExp(n)?n.test(e):n===e}function u(n,e){return t.isArray(e)?t.any(e,function(e){return r(n,e)}):r(n,e)}function i(n,e){return n>e}function c(n,e){return n>=e}function o(n,e){return e>n}function a(n,e){return e>=n}function f(n,e){return t.isArray(e)?t.containsAny(n,e):t.contains(n,e)}function s(n,e){return t.isArray(e)?!t.containsAny(n,e):!t.contains(n,e)}function l(n,e){return t.containsAll(e,n)}function d(){}function y(n,e){return!u(n,e)}function $(){}function p(){}function v(){}function h(){}function m(n,e){return t.isObject(n)&&!t.isRegExp(n)?t.every(n,function(n,t){return g[t](n,e)}):g.$match(n,e)}function b(n,e){return t.every(n,function(n,r){var u=t.deep(e,r);return m(n,u)})}function A(n){return t.partial(b,n)}var g={$matchSingle:r,$match:u,$lt:i,$lte:c,$gt:o,$gte:a,$in:f,$nin:s,$all:l,$e:d,$ne:y,$or:$,$and:p,$exists:v,$where:h};return A.evaluateValue=m,A.evaluateDocument=b,A}),define("backbone.collection.queryable",["backbone.collection.lazy","document-matcher","underscore"],function(n,e,t){var r=n.extend({initialize:function(){t.bindAll(this,"query")},query:function(n,t){var r=this,u=e(n),i=this.filter(function(n){return u(n.attributes)});return t?i.map(function(n){return r._projectModel(n,t)}):i},queryOne:function(n){var e=this.query(n).take(1).first();return e},_projectModel:function(){}});return r});