/*
 * @Author       : Zhao Dongxu
 * @Desc         :
 * @Date         : 2021-04-29 13:22:12
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-29 23:19:08
 * @FilePath: \vue-next-admin\src\utils\index.ts
 */

// import { formatToDate, dateUtil } from './dateUtil';
/**
 * @description: 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 * @return {*}
 */
export const deepCopy = (obj: any, cache: any = []): any => {
	// typeof [] => 'object'
	// typeof {} => 'object'
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	// 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
	/**
	 * 类似下面这种
	 * var a = {b:1}
	 * a.c = a
	 * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
	 */
	const hit = cache.filter((c: { original: any }) => c.original === obj)[0];
	if (hit) {
		return hit.copy;
	}

	let copy: any = Array.isArray(obj) ? [] : {};
	// 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
	cache.push({
		original: obj,
		copy,
	});
	Object.keys(obj).forEach((key) => {
		copy[key] = deepCopy(obj[key], cache);
	});

	return copy;
};

/*
 * description: Form组件提交前 部分公共字段格式处理
 * param {*} fields: form表单项数组
 * param {*} formData: form表单绑定对象
 * return {*}
 */
export const beforeSubmit = (formData: any, fields: any) => {
	let form = { ...formData };
	// const pickerTypes = ['datepicker', 'timepicker']
	// fields.length &&
	// 	fields.forEach((v: any) => {
	// 		// 调整类型为datepicker和timepicker的筛选数据 输出为两个字段的时间字符串
	// 		if (v.is && pickerTypes.includes(v.is)) {
	// 			// v.valueKey即为要输出的['gmtStart', 'gmtEnd']形式字符串数组
	// 			if (form[v.prop] instanceof Array) {
	// 				const [start, end] = v.valueKey || ['gmtStart', 'gmtEnd']
	// 				const [startVal, endVal] = form[v.prop]
	// 				form[start] = formatToDate(startVal)
	// 				form[end] = formatToDate(endVal)
	// 				delete form[v.prop]
	// 			} else {
	// 				form[v.prop] = formatToDate(form[v.prop])
	// 				//单个日期或者多个日期初始值为空值时 删除属性
	// 				if (!form[v.prop]) delete form[v.prop]
	// 			}
	// 		}
	// 	})
	return form;
};

/*
 * description: Form组件获取详情前 部分公共字段格式处理 同上提交
 * param {*} fields: form表单项数组
 * param {*} formData: form表单绑定对象
 * return {*}
 */
export const beforeDetail = (formData: any, fields = []) => {
	let form = { ...formData };
	if (!Object.keys(form).length) return {};
	const pickerTypes = ['datepicker', 'timepicker'];
	fields.length &&
		fields.forEach((v: any) => {
			// 调整类型为daterange和datetimerange的筛选数据 输出为两个字段的时间字符串
			if (v.is && pickerTypes.includes(v.is)) {
				// v.valueKey即为要输出的['gmtStart', 'gmtEnd']形式字符串数组
				if (form[v.prop] instanceof Array) {
					const [startVal, endVal] = form[v.prop] || [];
					const value = startVal && endVal ? [startVal, endVal] : [];
					form[v.prop] = value;
				}
			}
		});
	return form;
};
