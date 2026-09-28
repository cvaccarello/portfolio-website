<template>
	<div>
		<button
			v-if="text"
			class="btn btn-primary"
			type="button"
			:data-image="image"
			:data-video="video"
			@click="enlarge"
		>
			{{ text }}
		</button>
		<button
			v-else
			class="btn enlarge-image"
			type="button"
			:data-image="image"
			:data-video="video"
			@click="enlarge"
		>
			<img v-if="image && !thumbnail" :src="image" alt="thumbnail" />
			<img v-else-if="thumbnail" :src="thumbnail" alt="thumbnail" />
		</button>
	</div>

	<dialog ref="dialogRef" class="dialog-media" @click="onDialogClick">
		<button class="close-btn" @click="closeDialog">&times;</button>
		<div class="media-container" @click.stop>
			<iframe
				v-if="dialogVideo && isYoutube(dialogVideo)"
				width="100%"
				:src="dialogVideo"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
			<video v-else-if="dialogVideo" :poster="dialogImage" controls>
				<source :src="dialogVideo" type="video/mp4" />
			</video>
			<img v-else-if="dialogImage" :src="dialogImage" alt="" />
		</div>
	</dialog>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
	image: { type: String, default: '' },
	video: { type: String, default: '' },
	text: { type: String, default: '' },
	thumbnail: { type: String, default: '' },
});

const dialogRef = ref(null);
const dialogImage = ref('');
const dialogVideo = ref('');

function isYoutube(src) {
	return src && src.includes('youtube.com');
}

function enlarge(ev) {
	const btn = ev.currentTarget;
	dialogImage.value =
		btn.dataset.image || btn.querySelector('img')?.src || '';
	dialogVideo.value = btn.dataset.video || '';

	if (dialogRef.value) {
		dialogRef.value.showModal();
		setTimeout(() => {
			document.addEventListener('click', closeDialog);
		}, 0);
	}
}

function closeDialog(ev) {
	if (ev.target.closest('.media-container')) return;
	if (dialogRef.value) {
		dialogRef.value.close();
		dialogVideo.value = '';
	}
	document.removeEventListener('click', closeDialog);
}

function onDialogClick(ev) {
	if (ev.target === dialogRef.value) {
		closeDialog(ev);
	}
}
</script>
