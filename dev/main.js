require.config({
	urlArgs: "bust=0.44358782726339996",
	baseUrl: "/dev",
	paths: {
		requirejs: "bower_components/requirejs/require",
		text: "bower_components/requirejs-text/text",
		"backbone.collection.queryable": "../backbone.collection.queryable",
		backbone: "bower_components/backbone/backbone",
		jquery: "bower_components/jquery/jquery",
		"requirejs-text": "bower_components/requirejs-text/text",
		underscore: "bower_components/underscore/underscore",
		"underscore.deep": "bower_components/underscore.deep/underscore.deep",
		"underscore.containers": "bower_components/underscore.containers/underscore.containers",
		"backbone.collection.lazy": "bower_components/backbone.collection.lazy/backbone.collection.lazy",
		lazy: "bower_components/lazy.js/lazy"
	},
	shim: {
		backbone: {
			exports: "Backbone",
			deps: [
				"jquery",
				"underscore"
			]
		},
		underscore: {
			exports: "_"
		},
        lazy: {
            exports: "Lazy"
        }
	}
});

(function() {
    var load = window.__load || 'amd-test-runner';
    require([load], function(mod) {
        console.log('Main loading finished.');
    });
})();
