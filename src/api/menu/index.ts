/*
 * @Author: Vane
 * @Date: 2021-05-29 22:21:36
 * @LastEditTime: 2021-05-29 23:58:43
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vue-admin\src\api\menu\index.ts
 */
import request from '@/utils/request';

/**
 * 后端控制菜单模拟json，路径在 https://gitee.com/vaned/admin-cdn/raw/master/v3/menu
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 */
// 获取后端动态路由菜单(admin)
export function getMenuAdmin(params?: object) {
	return request({
		url: '/gitee/vaned/admin-cdn/raw/master/v3/menu/adminMenu.json',
		method: 'get',
		params,
	});
}

// 获取后端动态路由菜单(test)
export function getMenuTest(params?: object) {
	return request({
		url: '/gitee/vaned/admin-cdn/raw/master/v3/menu/testMenu.json',
		method: 'get',
		params,
	});
}
