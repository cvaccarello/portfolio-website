import { createApp } from 'vue';
import $ from 'jquery';
import App from './App.vue';
import router from './router';
import './styles/app.scss';

window.$ = window.jQuery = $;

// Load sparkle particle system (depends on jQuery), then mount app
const sparkleScript = document.createElement('script');
sparkleScript.src = '/vendor/particle-system.min.js';
sparkleScript.async = false;
const mountApp = () => {
	app.use(router);
	app.mount('#app');
};
sparkleScript.onload = mountApp;
sparkleScript.onerror = mountApp;
document.head.appendChild(sparkleScript);

const app = createApp(App);
