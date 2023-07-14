'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
	const app = new EmberApp(defaults, {
		// 'ember-font-awesome': {
		// 	useScss: true
		// },
		// sassOptions: {
		// 	includePaths: [
		// 		'app',
		// 		'bower_components/breakpoint-sass/stylesheets'
		// 	]
		// }
	});

	return app.toTree();
};
