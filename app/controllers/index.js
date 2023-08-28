import Controller from '@ember/controller';
import { action } from '@ember/object';
import Ember from 'ember';

export default class Home extends Controller {
	@action
	rendered() {
		this.$ship = $('.hp-ship-001');
		this.ship_height = this.$ship.outerHeight();

		this.MyParticleEmitter = Ember.ParticleSystem.addEmitter(
			new ParticleEmitter({
				id: 'ship-engine--stars',
				max_particles: 100,
				emit_delay: 10,
				element: this.$ship.find('.hp-engine'),
				direction: { min: 180 - 40, max: 180 + 40 },
				particle: {
					append_to: $('body > div'),
					template: '<div class="hp-star-001"></div>',
					time_to_live: 1200,
					speed_amt: 130,
				},
			})
		);

		this.onScrollParticles = this.emitParticlesOnScroll.bind(this);

		// only want to ignite engines when moving upwards (downward scroll)
		// also only ignite engines when the ship is in view
		this.scroll_amt = 0;
		$(document).on('scroll', this.onScrollParticles);
	}

	@action
	remove() {
		$(document).off('scroll', this.onScrollParticles);
		this.MyParticleEmitter.remove();
	}

	emitParticlesOnScroll() {
		var scroll = $(document).scrollTop();
		var offset = this.$ship.offset();

		var ship_pos_on_screen = offset.top - scroll;
		if (
			scroll > this.scroll_amt &&
			ship_pos_on_screen <= screen.height &&
			ship_pos_on_screen >= 0 - this.ship_height
		) {
			this.MyParticleEmitter.trigger(50);
		}

		this.scroll_amt = scroll;
	}
}
