import Controller from '@ember/controller';
import { action } from '@ember/object';
import Ember from 'ember';

export default class Home extends Controller {
	constructor() {
		super(...arguments);
		let This = this;

		// create particle system and save in Ember namespace
		Ember.ParticleSystem = new ParticleSystem();

		// initialize skrollr plugin
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

		// need to set up this resize function so that the context of this class can be used
		this.windowResize = function () {
			Ember.s.refresh();
		};

		// watch for screen resizing
		$(window).on('resize', this.windowResize);
	}

	@action
	rendered() {
		$('.hp-image').one('load', () => {
			Ember.s.refresh();
		});
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
