import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@components': path.resolve(__dirname, './src/components'),
			'@queries': path.resolve(__dirname, './src/queries'),
		},
	},
	plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react()],
});
