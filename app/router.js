import EmberRouter from '@ember/routing/router';
import config from 'portfolio-website/config/environment';

export default class Router extends EmberRouter {
	location = config.locationType;
	rootURL = config.rootURL;
}

Router.map(function () {
	this.route('projects');
	this.route('artwork');
	this.route('sneaky-seamus');
	this.route('models');
});
