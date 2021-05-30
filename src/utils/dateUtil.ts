/*
 * @Author       : Vane
 * @Desc         :
 * @Date         : 2021-05-10 21:49:09
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-30 02:53:01
 * @FilePath: \vue-admin\src\utils\dateUtil.ts
 */
/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date: moment.MomentInput = null, format = DATE_TIME_FORMAT): string {
	return date ? moment(date).format(format) : '';
}

export function formatToDate(date: moment.MomentInput = null, format = DATE_FORMAT): string {
	return date ? moment(date).format(format) : '';
}

export const dateUtil = moment;
