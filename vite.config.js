import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				includePaths: [path.resolve(__dirname, 'node_modules/breakpoint-sass/stylesheets')],
			},
		},
	},
	server: {
		port: 5173,
	},
	build: {
		outDir: 'dist',
	},
});
