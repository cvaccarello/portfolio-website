import Controller from '@ember/controller';
import { action } from '@ember/object';
import Ember from 'ember';

export default class Home extends Controller {
	constructor() {
		super(...arguments);

		// create particle system and save in Ember namespace
		Ember.ParticleSystem = new ParticleSystem();
	}

	@action
	rendered() {
	}
}
