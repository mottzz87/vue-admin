<!--
 * @Author: Vane
 * @Date: 2021-05-28 22:24:27
 * @LastEditTime: 2021-05-29 19:14:34
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\mDatePicker.vue
-->
<template>
	<el-date-picker
		v-model="value1"
		type="monthrange"
		range-separator="至"
		start-placeholder="开始月份"
		end-placeholder="结束月份"
	/>
</template>
