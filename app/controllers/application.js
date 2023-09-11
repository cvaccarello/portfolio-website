import Controller from '@ember/controller';
import { action } from '@ember/object';
import Ember from 'ember';

export default class Home extends Controller {
	constructor() {
		super(...arguments);

		// create particle system and save in Ember namespace
		Ember.ParticleSystem = new ParticleSystem();

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

		await new Promise((resolve) => {
			// once the home page profile image loads, we need to update skrollr b/c of how it takes up dimension
			$('.hp-image').one('load', () => {
				// TODO: some day look into why we need to initialize the skrollr on the next tick, if you are pre-scrolled when it initializes and you don't have this, things get messed up for some reason
				setTimeout(resolve, 0);
			});
		});

		let originalScrollPosition = $(document).scrollTop();

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
