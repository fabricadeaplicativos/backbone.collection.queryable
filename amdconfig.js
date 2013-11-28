require.config({
	urlArgs: 'bust=0.13601986528374255',
	baseUrl: '/',
	paths: {
		requirejs: 'bower_components/requirejs/require',
		text: 'bower_components/requirejs-text/text',
		'backbone.collection.queryable': 'src/backbone.collection.queryable',
		backbone: 'bower_components/backbone/backbone',
		'backbone.collection.lazy': 'bower_components/backbone.collection.lazy/src/backbone.collection.lazy',
		jquery: 'bower_components/jquery/jquery',
		'requirejs-text': 'bower_components/requirejs-text/text',
		underscore: 'bower_components/underscore/underscore',
		lazy: 'bower_components/lazy.js/lazy',
		'mongo-query-operators': 'bower_components/mongo-query-operators/src/mongo-query-operators',
		'underscore.contains': 'bower_components/underscore.contains/src/underscore.contains',
		'underscore.deep': 'bower_components/underscore.deep/src/underscore.deep',
		'document-matcher': 'bower_components/document-matcher/src/document-matcher',
		dataset: 'test/qunit/dataset'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		lazy: {
			exports: 'Lazy'
		}
	}
});
