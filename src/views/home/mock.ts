/*
 * @Author       : Zhao Dongxu
 * @Desc         :
 * @Date         : 2021-04-25 16:19:43
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-30 01:14:33
 * @FilePath: \vue-admin\src\views\home\mock.ts
 */
// 最顶部 card
export const topCardItemList = [
	{
		title: '今日访问人数',
		titleNum: '123',
		tip: '在场人数',
		tipNum: '911',
		color: '#F95959',
		iconColor: '#F86C6B',
		icon: 'iconfont ant-icon-jinridaiban',
	},
	{
		title: '实验室总数',
		titleNum: '123',
		tip: '使用中',
		tipNum: '611',
		color: '#8595F4',
		iconColor: '#92A1F4',
		icon: 'iconfont ant-icon-shiyanshi',
	},
	{
		title: '申请人数（月）',
		titleNum: '123',
		tip: '通过人数',
		tipNum: '911',
		color: '#FEBB50',
		iconColor: '#FDC566',
		icon: 'iconfont ant-icon-shenqingkaiban',
	},
];

// 环境监测
export const environmentList = [
	{
		icon: 'iconfont ant-icon-yangan',
		label: '烟感',
		value: '2.1%OBS/M',
		iconColor: '#F72B3F',
	},
	{
		icon: 'iconfont ant-icon-wendu',
		label: '温度',
		value: '30℃',
		iconColor: '#91BFF8',
	},
	{
		icon: 'iconfont ant-icon-shidu',
		label: '湿度',
		value: '57%RH',
		iconColor: '#88D565',
	},
	{
		icon: 'iconfont ant-icon-zaosheng',
		label: '噪声',
		value: '57DB',
		iconColor: '#FBD4A0',
	},
];

// 动态信息
export const activitiesList = [
	{
		time1: '今天',
		time2: '12:20:30',
		title: '更名',
		label: '正式更名为 vue-admin',
	},
	{
		time1: '02-17',
		time2: '12:20:30',
		title: '页面',
		label: '完成对首页的开发',
	},
	{
		time1: '02-14',
		time2: '12:20:30',
		title: '页面',
		label: '新增个人中心',
	},
];
