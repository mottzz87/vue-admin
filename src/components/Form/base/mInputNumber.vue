<!--
 * @Author: Vane
 * @Date: 2021-05-28 22:06:14
 * @LastEditTime: 2021-05-30 16:52:55
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\mInputNumber.vue
-->

<template>
	<el-input-number v-bind="$attrs" @input="item.callback" />
</template>

<script lang="ts">
export default {
	name: 'mInputNumber',
	props: {
		item: Object,
	},
	setup() {
		return {};
	},
};
</script>
