<!--
 * @Author: Vane
 * @Date: 2021-05-28 22:24:27
 * @LastEditTime: 2021-05-31 00:59:16
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\mDatePicker.vue
-->

<template>
	<el-date-picker
		v-bind="$attrs"
		range-separator="~"
		:start-placeholder="item.startPlaceholder || '开始日期'"
		:end-placeholder="item.endPlaceholder || '结束日期'"
		@change="(e) => item.callback?.(e)"
	/>
</template>

<script lang="ts">
export default {
	name: 'mDatePicker',
	emits: ['callback'],
	props: {
		item: {
			type: Object,
			default: () => {
				// type:'year/month/date/dates/week/datetime/datetimerange/daterange/monthrange'
			},
		},
	},
	setup() {
		return {};
	},
};
</script>

<style scoped></style>
