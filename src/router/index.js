import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		meta: { title: 'Chris Vaccarello' },
	},
	{
		path: '/projects',
		name: 'Projects',
		component: () => import('@/views/Projects.vue'),
	},
	{
		path: '/artwork',
		name: 'Artwork',
		component: () => import('@/views/Artwork.vue'),
	},
	{
		path: '/sneaky-seamus',
		name: 'SneakySeamus',
		component: () => import('@/views/SneakySeamus.vue'),
	},
	{
		path: '/models',
		name: 'Models',
		component: () => import('@/views/Models.vue'),
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

router.afterEach((to) => {
	document.title = to.meta.title || 'Chris Vaccarello';
});

export default router;
