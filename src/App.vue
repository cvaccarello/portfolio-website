<template>
	<div id="skrollr-body">
		<NavHeader />
		<main>
			<router-view />
		</main>
		<NavFooter />
	</div>
</template>

<script setup>
import NavHeader from '@/components/NavHeader.vue';
import NavFooter from '@/components/NavFooter.vue';
</script>
