<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-05-11 14:09:31
 * LastEditors  : Vane
 * LastEditTime : 2021-05-27 19:19:33
 * FilePath     : \src\components\Form\base\mCheckbox.vue
 -->
<template>
	<el-checkbox v-bind="$attrs" @change="item.callback">
		{{ desc }}
	</el-checkbox>
</template>

<script lang="ts">
	export default {
		name: 'Checkbox',
		props: {
			item: Object,
			desc: String,
		},
		setup() {
			return {}
		},
	}
</script>
