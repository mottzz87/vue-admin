/*
 * @Author: Vane
 * @Date: 2021-05-29 22:21:36
 * @LastEditTime: 2021-05-31 16:27:38
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vue-admin\vite.config.ts
 */
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { loadEnv } from './src/utils/viteBuild.ts';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv();

const alias: Record<string, string> = {
	'@': pathResolve('/src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

const viteConfig: UserConfig = {
	plugins: [
		vue({
			// template: {
			// 	compilerOptions: {
			// 		isCustomElement: (tag) => {
			// 			console.log(tag);
			// 			return /^m-/.test(tag);
			// 		},
			// 	},
			// },
		}),
		vueJsx({
			// options are passed on to @vue/babel-plugin-jsx
		}),
	],
	root: process.cwd(),
	resolve: { alias },
	base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
	optimizeDeps: {
		include: [
			'element-plus/lib/locale/lang/zh-cn',
			'element-plus/lib/locale/lang/en',
			'element-plus/lib/locale/lang/zh-tw',
		],
	},
	// esbuild: {
	// 	jsxFactory: 'h',
	// 	jsxFragment: 'Fragment',
	// },
	server: {
		host: '0.0.0.0',
		port: VITE_PORT,
		open: VITE_OPEN,
		proxy: {
			'/gitee': {
				target: 'https://gitee.com',
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/gitee/, ''),
			},
			// '/admin-cdn': {
			// 	target: 'https://gitee.com/vaned/admin-cdn',
			// 	ws: true,
			// 	changeOrigin: true,
			// 	rewrite: (path) => path.replace(/^\/admin-cdn/, ''),
			// }
		},
	},
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		sourcemap: false,
	},
	define: {
		__VUE_I18N_LEGACY_API__: JSON.stringify(false),
		__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
		__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
	},
};

export default viteConfig;
