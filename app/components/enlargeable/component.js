import $ from 'jquery';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Enlargeable extends Component {
	@tracked dates;

	constructor() {
		super(...arguments);

		this.$dialog = $();
	}

	@action
	enlarge(event) {
		let $currentTarget = $(event.currentTarget);
		let imageSrc =
			$currentTarget.data('image') ||
			$currentTarget.find('img').data('src');
		let videoSrc = $currentTarget.data('video');

		// remove previous dialog if any exist
		this.$dialog.remove();

		if (videoSrc && videoSrc.match('youtube.com')) {
			// special case for youtube videos
			this.$dialog = $(`
				<dialog class="dialog-full-image"><iframe class="dialog-inner" width="100%" src="${videoSrc}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></dialog>
			`).appendTo('body');
		} else if (videoSrc) {
			this.$dialog = $(`
				<dialog class="dialog-full-image"><video class="dialog-inner" poster="${imageSrc}" controls><source src="${videoSrc}" type="video/mp4"/></video></dialog>
			`).appendTo('body');
		} else {
			this.$dialog = $(`
				<dialog class="dialog-full-image"><img class="dialog-inner" src="${imageSrc}" alt=""/></dialog>
			`).appendTo('body');
		}

		this.$dialog[0].showModal();

		// self removing close event
		let close = (event) => {
			if ($(event.target).closest('.dialog-inner').length) {
				return;
			}

			this.$dialog[0].close();
			this.$dialog.remove();
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
