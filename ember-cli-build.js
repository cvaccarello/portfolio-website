'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
	const app = new EmberApp(defaults, {
		// 'ember-font-awesome': {
		// 	useScss: true
		// },
		sassOptions: {
			includePaths: ['app', 'node_modules/breakpoint-sass/stylesheets'],
		},
	});

	app.import('node_modules/jquery/dist/jquery.min.js');

	app.import({
		production: 'node_modules/skrollr/dist/skrollr.min.js',
		development: 'node_modules/skrollr/src/skrollr.js',
	});

	app.import('public/ParticleSystem.js');

	return app.toTree();
};
