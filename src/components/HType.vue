<template>
	<component :is="tagName" :class="classNames">
		<slot></slot>
	</component>
</template>

<script setup>
defineProps({
	tagName: { type: String, default: 'h1' },
	classNames: { type: String, default: '' },
});
</script>
