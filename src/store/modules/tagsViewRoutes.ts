/*
 * @Author: Vane
 * @Date: 2021-07-03 02:18:22
 * @LastEditTime: 2021-07-10 17:17:33
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vue-admin\src\store\modules\tagsViewRoutes.ts
 */
import { Module } from 'vuex';

import { TagsViewRoutesState, RootStateTypes } from '@/store/interface/index';

const tagsViewRoutesModule: Module<TagsViewRoutesState, RootStateTypes> = {
	namespaced: true,
	state: {
		tagsViewRoutes: [],
	},
	mutations: {
		// 设置 TagsView 路由
		getTagsViewRoutes(state: any, data: Array<string>) {
			state.tagsViewRoutes = data;
		},
	},
	actions: {
		// 设置 TagsView 路由
		async setTagsViewRoutes({ commit }, data: Array<string>) {
			commit('getTagsViewRoutes', data);
		},
	},
};

export default tagsViewRoutesModule;
