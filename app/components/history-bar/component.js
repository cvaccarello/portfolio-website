import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';

export default class HistoryBar extends Component {
	@tracked dates;

	constructor() {
		super(...arguments);
		var This = this;
		var data = this.args.model;
		console.log(data);

		// sort data such the most recent activity is always first
		data.sort(function (a, b) {
			if (a.date.to === b.date.to) {
				return a.date.from < b.date.from;
			} else {
				return a.date.to < b.date.to;
			}
		});

		// need to set up this resize function so that the context of this class can be used
		this.windowResize = function () {
			This.recalc();
		};

		// watch for screen resizing
		$(window).on('resize', this.windowResize);

		this.setDates();
	}

	setDates() {
		var data = this.args.model;

		let min_date = data[0].date.from;
		let max_date = data[0].date.to;

		for (let i = 1; i < data.length; i++) {
			let org_date = data[i].date;
			min_date = Math.min(min_date, org_date.from);
			max_date = Math.max(max_date, org_date.to);
		}

		// create a list of dates for timeline template
		var dates = [];
		for (let i = max_date; i > min_date; i--) {
			dates.push(i);
		}

		// set dates for template use
		this.dates = dates;
	}

	willDestroy() {
		super.willDestroy();
		$(window).off('resize', this.windowResize);
	}

	@action
	recalc() {
		var $el = $('.history-bar-timeline');
		var $organizations = $el.find('.history-bar-organization');
		var el_top = $el.offset().top;

		$organizations.each(function (i) {
			var $this = $(this);
			var height = $this.outerHeight();
			var date_from = JSON.parse($this.attr('data-date-from'));
			var date_to = JSON.parse($this.attr('data-date-to'));

			var $date_marker_from = $el.find(
				'.history-bar-marker[data-date="' + date_from + '"]'
			);
			var $date_marker_to = $el.find(
				'.history-bar-marker[data-date="' + date_to + '"]'
			);

			var start_top = $date_marker_to.offset().top;
			var end_bottom = $date_marker_from.offset().top;
			var date_range_height = end_bottom - start_top;

			// multiplies the centering effect by this number, 1 = nothing, 0.5 means less, 2 means more.. basically acts like an overflow amount
			var center_mult_offset = 0.5;

			// center this organization within the give timeframe on the timeline
			$this.css({ top: 0 });
			var new_top =
				start_top -
				el_top -
				($this.offset().top - el_top) -
				((height - date_range_height) / 2) * center_mult_offset;
			$this.css({ top: new_top + 'px' });
		});
	}
}
