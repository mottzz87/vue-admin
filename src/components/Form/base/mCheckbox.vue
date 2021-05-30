<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-05-11 14:09:31
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-31 02:03:36
 * @FilePath: \vue-admin\src\components\Form\base\mCheckbox.vue
 -->
<template>
	<el-checkbox v-bind="$attrs" @change="item.callback">
		{{ desc }}
	</el-checkbox>
</template>

<script lang="ts">
export default {
	name: 'mCheckbox',
	props: {
		item: Object,
		desc: String,
	},
	setup() {
		return {};
	},
};
</script>
