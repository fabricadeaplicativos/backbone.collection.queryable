require.config({
	urlArgs: 'bust=0.012264262419193983',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'backbone.collection.queryable': 'index',
		'backbone.collection.lazy': '../bower_components/backbone.collection.lazy/built/backbone.collection.lazy',
		backbone: '../bower_components/backbone/backbone',
		containers: '../bower_components/containers/built/containers',
		deep: '../bower_components/deep/built/deep',
		itr: '../bower_components/itr/built/itr',
		jquery: '../bower_components/jquery/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'object-query': '../bower_components/object-query/built/object-query',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		underscore: '../bower_components/underscore/underscore',
		lazy: '../bower_components/lazy.js/lazy'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		lazy: {
			exports: 'Lazy'
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
