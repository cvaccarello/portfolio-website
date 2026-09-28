<template>
	<div id="home-page" ref="homeRef">
		<section>
			<div class="container">
				<div class="ci-combo-container">
					<div class="hp-content ci-combo-content">
						<header>
							<h1 class="hp-who-am-i t-shadow t-margin-smallest">
								Who Am I?
							</h1>
							<div class="hp-me t-shadow">CHRIS VACCARELLO</div>
							<div class="hp-profession t-shadow">
								Lead Full Stack Node JS Developer
							</div>
						</header>
						<hr />
						<h2 class="t-fsize-smallest t-margin-smallest">
							About Me
						</h2>
						<p>
							The objective of this site is to highlight my
							abilities and accomplishments, and provide an
							opportunity for employment. I am looking to expand
							my knowledge and skills by adding value to an
							organization. I would describe myself as being very
							self-motivated and eager to learn.
						</p>
						<p>
							On a more personal note, I enjoy reading articles on
							space, technology, and video games. When I have free
							time, I like to either play video games, or create
							them.
						</p>
						<a
							class="btn btn-primary btn-shiny btn-large"
							href="/Resume.pdf"
						>
							<i class="fa-solid fa-download"></i> Resume (.pdf)
						</a>
					</div>
					<img
						class="hp-image ci-combo-image"
						src="/images/me.png"
						alt="profile"
						@load="onImageLoad"
					/>
				</div>
			</div>
		</section>

		<section class="ui-theme-inverted">
			<div class="container">
				<h2 class="hp-title t-fsize-smaller">My Skills</h2>
				<p class="u-text-center">
					The following is a list of my strongest skills, rating from
					1-10, where 10 is my most knowledgeable.
				</p>
				<div class="rchart-container">
					<div
						v-for="(chart, i) in my_skills"
						:key="i"
						class="hp-chart-frameworks rchart-box"
					>
						<label class="rchart-label">{{ chart.title }}</label>
						<Radar
							:data="chartData(chart)"
							:options="chartOptions"
							:style="{ width: '260px', height: '260px' }"
						/>
					</div>
				</div>
			</div>
		</section>

		<section class="parallax-container-outer">
			<div class="parallax-container-inner">
				<div
					class="parallax-clouds cloud-type-001"
					data-bottom-top="background-position: 700px 0px, -400px 300px;"
					data-top-bottom="background-position: 700px 1500px, -400px 2500px;"
				></div>
				<div
					class="parallax-clouds cloud-type-002"
					data-bottom-top="background-position: 0px 500px, 150px 970px;"
					data-top-bottom="background-position: 0px 2800px, 150px 2500px;"
				></div>
				<div
					class="parallax-clouds cloud-type-003"
					data-bottom-top="background-position: 500px 400px, -800px -500px;"
					data-top-bottom="background-position: 500px 3000px, -800px 2200px;"
				></div>
			</div>
			<div class="parallax-container-inner">
				<div
					class="hp-planet hp-planet-001"
					data--400-bottom-top="transform: translateY(150px);"
					data--100-top-bottom="transform: translateY(300px);"
				></div>
				<div
					class="hp-planet hp-planet-002"
					data--300-bottom-top="transform: translateY(150px) rotate(360deg);"
					data--100-top-bottom="transform: translateY(300px) rotate(80deg);"
				>
					<div class="hp-moon"></div>
				</div>
				<div
					class="hp-planet hp-planet-003"
					data-bottom-top="transform: translateY(-100px);"
					data-top-bottom="transform: translateY(100px);"
				></div>
			</div>
			<div class="parallax-container-inner">
				<div
					ref="shipRef"
					class="hp-ship hp-ship-001"
					data-bottom-top="transform: translateY(0px);"
					data-top-bottom="transform: translateY(-1500px);"
				>
					<div class="hp-engine" ref="hp-engine"></div>
				</div>
			</div>
			<div class="container">
				<h2 class="hp-title t-fsize-smaller">My History</h2>
				<HistoryBar
					:model="my_history"
					heading1="h3"
					heading2="h4"
					heading3="h5"
				/>
			</div>
			<div class="hp-planet-earth">
				<div class="hp-planet-earth-image"></div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue';
import $ from 'jquery';
import { Radar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
import {
	my_skills,
	my_history,
	chartOptions as baseChartOptions,
} from '@/data/homeData';
import HistoryBar from '@/components/HistoryBar.vue';
import skrollr from 'skrollr';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

const chartOptions = {
	...baseChartOptions,
};
function chartData(chart) {
	return {
		labels: chart.labels,
		datasets: chart.datasets,
	};
}

const homeRef = ref(null);
const shipRef = ref(null);
const shipEngine = useTemplateRef('hp-engine');
let skrollrInstance = null;
let particleEmitter = null;
let onScrollParticles = null;
let windowResize = () => {};
let scroll_amt = 0;
let ship_height = 0;

function getRotationDegrees(obj) {
	const $el = $(obj);
	const matrix =
		$el.css('-webkit-transform') ||
		$el.css('-moz-transform') ||
		$el.css('-ms-transform') ||
		$el.css('-o-transform') ||
		$el.css('transform');
	if (matrix === 'none') return 0;
	const values = matrix.split('(')[1].split(')')[0].split(',');
	const a = values[0];
	const b = values[1];
	return Math.round(
		Math.atan2(parseFloat(b), parseFloat(a)) * (180 / Math.PI)
	);
}

function emitParticlesOnScroll() {
	const scroll = $(document).scrollTop();
	const $ship = $('.hp-ship-001');
	const offset = $ship.offset();
	const ship_pos_on_screen = offset.top - scroll;
	if (
		scroll > scroll_amt &&
		ship_pos_on_screen <= screen.height &&
		ship_pos_on_screen >= 0 - ship_height
	) {
		particleEmitter.trigger(50);
	}
	scroll_amt = scroll;
}

function onImageLoad() {
	setTimeout(initSkrollr, 0);
}

function initSkrollr() {
	const originalScrollPosition = $(document).scrollTop();
	skrollrInstance = skrollr.init({
		forceHeight: false,
		constants: {
			shb_line: () => $('#skrollr-history-bar-line').outerHeight(),
		},
		render() {
			$('.hp-moon').each(function () {
				const $this = $(this);
				const $parent = $this.parent();
				const rotation = 0 - getRotationDegrees($parent[0]);
				$this.css({ transform: 'rotate(' + rotation + 'deg)' });
			});
		},
	});
	if (skrollrInstance?.isMobile()) {
		skrollrInstance.setScrollTop(originalScrollPosition, true);
		$(document).scrollTop(0);
	}
}

onMounted(() => {
	windowResize = () => skrollrInstance?.refresh();
	$(window).on('resize', windowResize);

	const $ship = $('.hp-ship-001');
	ship_height = $ship.outerHeight();

	window.particleSystem = new window.ParticleSystem();

	particleEmitter = window.particleSystem.addEmitter(
		new window.ParticleEmitter({
			id: 'ship-engine--stars',
			max_particles: 100,
			emit_delay: 10,
			element: $(shipEngine.value),
			direction: { min: 180 - 40, max: 180 + 40 },
			particle: {
				append_to: document.getElementById('app'),
				template: '<div class="hp-star-001"></div>',
				time_to_live: 1200,
				speed_amt: 130,
			},
		})
	);

	onScrollParticles = emitParticlesOnScroll;
	$(document).on('scroll', onScrollParticles);

	const img = document.querySelector('.hp-image');
	if (img?.complete) {
		onImageLoad();
	}
});

onUnmounted(() => {
	$(document).off('scroll', onScrollParticles);
	$(window).off('resize', windowResize);
	particleEmitter.remove();
	if (skrollrInstance) {
		skrollrInstance.destroy();
		skrollrInstance = null;
	}
});
</script>
