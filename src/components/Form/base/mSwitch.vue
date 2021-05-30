<!--
 * @Author: Vane
 * @Date: 2021-05-31 01:03:54
 * @LastEditTime: 2021-05-31 01:10:09
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\mSwitch.vue
-->
<template>
	<el-switch v-bind="$attrs" @change="item.callback" />
</template>

<script lang="js">
export default {
	name: 'mSwitch',
	props: {
		item: Object,
	},
	setup() {
		return {};
	},
};
</script>
