<!--
 * @Author: Vane
 * @Date: 2021-05-31 01:02:10
 * @LastEditTime: 2021-05-31 01:02:43
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\mRate.vue
-->
<template>
	<el-rate v-bind="$attrs" @change="item.callback" />
</template>

<script lang="js">
export default {
	name: 'mRate',
	props: {
		item: Object,
	},
	setup() {
		return {};
	},
};
</script>
