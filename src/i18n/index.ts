import { createI18n } from 'vue-i18n';
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';
import zhtwLocale from 'element-plus/lib/locale/lang/zh-tw';
import { store } from '@/store/index';

import nextZhcn from '@/i18n/lang/zh-cn';
import nextEn from '@/i18n/lang/en';
import nextZhtw from '@/i18n/lang/zh-tw';

import pagesHomeZhcn from '@/i18n/pages/home/zh-cn';
import pagesHomeEn from '@/i18n/pages/home/en';
import pagesHomeZhtw from '@/i18n/pages/home/zh-tw';
import pagesLoginZhcn from '@/i18n/pages/login/zh-cn';
import pagesLoginEn from '@/i18n/pages/login/en';
import pagesLoginZhtw from '@/i18n/pages/login/zh-tw';

// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
	[zhcnLocale.name]: {
		el: zhcnLocale.el,
		message: {
			...nextZhcn,
			...pagesHomeZhcn,
			...pagesLoginZhcn,
		},
	},
	[enLocale.name]: {
		el: enLocale.el,
		message: {
			...nextEn,
			...pagesHomeEn,
			...pagesLoginEn,
		},
	},
	[zhtwLocale.name]: {
		el: zhtwLocale.el,
		message: {
			...nextZhtw,
			...pagesHomeZhtw,
			...pagesLoginZhtw,
		},
	},
};

// 导出语言国际化
export const i18n = createI18n({
	locale: store.state.themeConfig.themeConfig.globalI18n,
	fallbackLocale: zhcnLocale.name,
	messages,
});
