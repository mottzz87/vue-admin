<!-- 
 * Author       : Vane
 * Desc         :  
 * Date         : 2021-05-27 17:52:23
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-29 19:07:38
 * @FilePath: \vue-admin\src\components\Form\base\mInput.vue
 -->
<template>
	<el-input v-bind="$attrs" show-word-limit @input="item.callback" />
</template>

<script lang="js">
	export default {
		name: 'mInput',
		props: {
			item: Object,
		},
		setup() {
			return {};
		},
	};
</script>
