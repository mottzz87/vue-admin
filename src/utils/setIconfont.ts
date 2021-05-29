/*
 * @Author: Vane
 * @Date: 2021-05-29 22:21:36
 * @LastEditTime: 2021-05-29 23:22:52
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vue-next-admin\src\utils\setIconfont.ts
 */
// 字体图标 url
const cssCdnUrlList: Array<string> = [
	'//at.alicdn.com/t/font_2471493_g4n5cyqz50v.css',
	'//cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
];
// 第三方 js url
const jsCdnUrlList: Array<string> = [];

// 动态设置字体图标
export function setCssCdn() {
	if (cssCdnUrlList.length <= 0) return false;
	cssCdnUrlList.map((v) => {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = v;
		link.crossOrigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(link);
	});
}

// 批量设置第三方js
export function setJsCdn() {
	if (jsCdnUrlList.length <= 0) return false;
	jsCdnUrlList.map((v) => {
		let link = document.createElement('script');
		link.src = v;
		document.body.appendChild(link);
	});
}

// 设置执行函数
const setIntroduction = {
	cssCdn: () => {
		setCssCdn();
	},
	jsCdn: () => {
		setJsCdn();
	},
};

// 导出函数方法
export default setIntroduction;
