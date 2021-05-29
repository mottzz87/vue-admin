/*
 * @Author: Vane
 * @Date: 2021-05-30 00:44:16
 * @LastEditTime: 2021-05-30 01:32:33
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vue-admin\shim.d.ts
 */
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
