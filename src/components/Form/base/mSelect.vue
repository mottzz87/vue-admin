<!-- 
 * Author       : Vane
 * Desc         :  
 * Date         : 2021-05-11 00:18:20
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-30 16:52:09
 * @FilePath: \vue-admin\src\components\Form\base\mSelect.vue
 -->
<template>
	<el-select v-bind="$attrs" @change="(e) => item.callback?.(e)">
		<el-option v-for="v in opts" :key="v.value" v-bind="v" />
	</el-select>
</template>
<script lang="ts">
export default {
	name: 'mSelect',
	components: {},
	props: {
		item: Object,
		opts: {
			type: Array,
			default: () => [],
		},
		callback: Function,
	},
	setup() {
		return {};
	},
};
</script>
