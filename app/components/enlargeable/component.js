import $ from 'jquery';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';

export default class Enlargeable extends Component {
	@tracked dates;

	constructor() {
		super(...arguments);

		this.$dialog = $();
	}

	@action
	enlarge(event) {
		let $currentTarget = $(event.currentTarget);
		let imageSrc = $currentTarget.attr('data-image') || $currentTarget.find('img').attr('data-src');
		let videoSrc = $currentTarget.attr('data-video');

		// remove previous dialog if any exist
		this.$dialog.remove();

		if (videoSrc) {
			this.$dialog = $(`<dialog class="dialog-full-image"><div class="dialog-inner"><video poster="${imageSrc}" controls><source src="${videoSrc}" type="video/mp4"/></video></div></dialog>`).appendTo('body');
		} else {
			this.$dialog = $(`<dialog class="dialog-full-image"><div class="dialog-inner"><img src="${imageSrc}" alt=""/></div></dialog>`).appendTo('body');
		}

		this.$dialog[0].showModal();

		// self removing close event
		let close = (event) => {
			if ($(event.target).closest('.dialog-inner').length) {
				return;
			}

			this.$dialog[0].close();
			$(document).off('click', close);
		};

		// set to next tick so the initial open doesn't also trigger a close
		setTimeout(() => {
			$(document).on('click', close);
		}, 0);
	}

	willDestroy() {
		super.willDestroy();
		this.$dialog.remove();
	}
}
