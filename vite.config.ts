/*
 * @Author: Vane
 * @Date: 2021-05-29 22:21:36
 * @LastEditTime: 2021-07-06 05:52:11
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vue-admin\vite.config.ts
 */
import { resolve } from 'path';
import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
// import { wrapperEnv } from './src/utils/viteBuild';
import { wrapperEnv } from './build/utils';

import pkg from './package.json';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'@': pathResolve('./src/'),
	'~': pathResolve('./'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

const { dependencies, devDependencies, name, version } = pkg;

export default ({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();

	const env = loadEnv(mode, root);

	// The boolean type read by loadEnv is a string. This function can be converted to boolean type
	const viteEnv = wrapperEnv(env);

	const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

	const isBuild = command === 'build';
	return {
		root: process.cwd(),
		resolve: { alias },
		base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',

		server: {
			host: '0.0.0.0',
			port: VITE_PORT,
			open: VITE_OPEN,
			proxy: {
				// '/gitee': {
				// 	target: 'https://gitee.com',
				// 	ws: true,
				// 	changeOrigin: true,
				// 	rewrite: (path: string) => path.replace(/^\/gitee/, ''),
				// },
				'/admin-cdn': {
					target: 'https://gitee.com/vaned/admin-cdn',
					ws: true,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/admin-cdn/, ''),
				}
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
		plugins: createVitePlugins(viteEnv, isBuild),
		optimizeDeps: {
			include: [
				'element-plus/lib/locale/lang/zh-cn',
				'element-plus/lib/locale/lang/en',
				'element-plus/lib/locale/lang/zh-tw',
			],
		},
	};
};
