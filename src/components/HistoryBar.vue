<template>
	<div ref="timelineRef" class="history-bar-timeline">
		<div
			v-for="(organization, index) in sortedModel"
			:key="index"
			class="row"
		>
			<div
				class="history-bar-organization columns five"
				:class="{ 'offset-by-seven': index % 2 === 1 }"
				:data-250-center-top="
					(index % 2 === 1 ? 'right' : 'left') +
					': -80px; opacity: 0;'
				"
				:data--50-center-top="
					(index % 2 === 1 ? 'right' : 'left') + ': 0px; opacity: 1;'
				"
				:data-date-from="organization.date.from"
				:data-date-to="organization.date.to"
			>
				<HType
					:tag-name="heading1"
					class-names="org-date t-fsize-smaller"
					>{{ organization.date.from }} -
					{{ organization.date.to }}</HType
				>
				<HType :tag-name="heading2" class-names="org-name t-shadow">{{
					organization.name
				}}</HType>
				<HType :tag-name="heading3" class-names="org-title t-shadow">{{
					organization.title
				}}</HType>
				<hr />
				<ul>
					<li
						v-for="(acc, i) in organization.accomplishments"
						:key="i"
					>
						{{ acc }}
					</li>
				</ul>
			</div>
		</div>

		<div id="skrollr-history-bar-line" class="history-bar-line">
			<table class="history-bar-markers">
				<tbody>
					<tr v-for="(date, index) in dates" :key="date">
						<td>
							<div class="history-bar-marker" :data-date="date">
								<i>{{ date }}</i>
							</div>
							<div
								v-if="index === dates.length - 1"
								class="history-bar-marker history-bar-marker-last"
								:data-date="date - 1"
							>
								<i>{{ date - 1 }}</i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div
				class="history-bar-fill"
				data-center-top="height: 0%;"
				data-_shb_line-center-top="height: 100%;"
			>
				<div class="history-bar-indicator"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import $ from 'jquery';
import HType from './HType.vue';

const props = defineProps({
	model: { type: Array, required: true },
	heading1: { type: String, default: 'h3' },
	heading2: { type: String, default: 'h4' },
	heading3: { type: String, default: 'h5' },
});

const timelineRef = ref(null);

const sortedModel = computed(() => {
	const data = [...props.model];
	data.sort((a, b) => {
		if (a.date.to === b.date.to) {
			return a.date.from < b.date.from ? 1 : -1;
		}
		return a.date.to < b.date.to ? 1 : -1;
	});
	return data;
});

const dates = computed(() => {
	const data = props.model;
	if (!data.length) return [];
	let min_date = data[0].date.from;
	let max_date = data[0].date.to;
	for (let i = 1; i < data.length; i++) {
		const org_date = data[i].date;
		min_date = Math.min(min_date, org_date.from);
		max_date = Math.max(max_date, org_date.to);
	}
	const arr = [];
	for (let i = max_date; i > min_date; i--) {
		arr.push(i);
	}
	return arr;
});

function recalc() {
	const $el = $('.history-bar-timeline');
	const $organizations = $el.find('.history-bar-organization');
	const el_top = $el.offset().top;

	$organizations.each(function () {
		const $this = $(this);
		const height = $this.outerHeight();
		const date_from = parseInt($this.attr('data-date-from'), 10);
		const date_to = parseInt($this.attr('data-date-to'), 10);

		const $date_marker_to = $el.find(
			'.history-bar-marker[data-date="' + date_to + '"]'
		);
		const $date_marker_from = $el.find(
			'.history-bar-marker[data-date="' + date_from + '"]'
		);

		const start_top = $date_marker_to.offset().top;
		const end_bottom = $date_marker_from.offset().top;
		const date_range_height = end_bottom - start_top;
		const center_mult_offset = 0.5;

		$this.css({ top: 0 });
		const new_top =
			start_top -
			el_top -
			($this.offset().top - el_top) -
			((height - date_range_height) / 2) * center_mult_offset;
		$this.css({ top: new_top + 'px' });
	});
}

let windowResize = () => {};

onMounted(() => {
	windowResize = () => recalc();
	$(window).on('resize', windowResize);
	setTimeout(recalc, 100);
});

watch(
	() => props.model,
	() => {
		setTimeout(recalc, 50);
	},
	{ deep: true }
);

onUnmounted(() => {
	$(window).off('resize', windowResize);
});
</script>
