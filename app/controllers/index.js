import $ from 'jquery';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import Ember from 'ember';

export default class Home extends Controller {
	constructor() {
		super(...arguments);

		// need to set up this resize function so skrollr can update on resize
		this.windowResize = function () {
			Ember.s?.refresh();
		};

		// watch for screen resizing
		$(window).on('resize', this.windowResize);
	}
	@action
	async rendered() {
		let This = this;
		let originalScrollPosition = $(document).scrollTop();

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

		await new Promise((resolve) => {
			// once the home page profile image loads, we need to update skrollr b/c of how it takes up dimension
			$('.hp-image').one('load', () => {
				// TODO: some day look into why we need to initialize the skrollr on the next tick, if you are pre-scrolled when it initializes and you don't have this, things get messed up for some reason
				setTimeout(resolve, 0);
			});
		});

		// initialize skrollr plugin (has to happen after ember.js html is appended to DOM
		Ember.s = skrollr.init({
			forceHeight: false,
			constants: {
				shb_line: function () {
					return $('#skrollr-history-bar-line').outerHeight();
				},
			},
			render(options) {
				// get all pivot points so that their children, if they exist, can be counter-rotated
				var $moon = $('.hp-moon');
				$moon.each(function () {
					let $this = $(this);
					let $parent = $this.parent();
					let rotation = 0 - This.getRotationDegrees($parent);

					$this.css({
						transform: 'rotate(' + rotation + 'deg)',
					});
				});
			},
		});

		// skrollr by default will try to reset scrolling back to the top, whereas ember tries to maintain where you are, the result is a fight to the death :P additionally skrollr has really weird mobile behavior due to apparent browser optimization issues on scroll, so this code is trying to play nice with everything
		if (Ember.s.isMobile()) {
			Ember.s.setScrollTop(originalScrollPosition, true);
			$(document).scrollTop(0);
		}
	}

	@action
	remove() {
		$(document).off('scroll', this.onScrollParticles);
		this.MyParticleEmitter.remove();
		Ember.s?.destroy();
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

	getRotationDegrees(obj) {
		var matrix =
			obj.css('-webkit-transform') ||
			obj.css('-moz-transform') ||
			obj.css('-ms-transform') ||
			obj.css('-o-transform') ||
			obj.css('transform');
		var angle;
		if (matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
		} else {
			angle = 0;
		}
		//return (angle < 0) ? angle + 360 : angle;
		return angle;
	}
}
