import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: '/',
	server: {
		port: 5173,
		proxy: {
			'/api': {
				target: 'http://localhost:4001',
				changeOrigin: true,
				secure: false
			},
			'/uploads': {
				target: 'http://localhost:4001',
				changeOrigin: true,
				secure: false
			}
		}
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				manualChunks: undefined
			}
		}
	}
}); 