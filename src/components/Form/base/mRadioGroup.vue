<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-05-11 14:09:31
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-31 01:48:29
 * @FilePath: \vue-admin\src\components\Form\base\mRadioGroup.vue
 -->
<template>
	<div>
		<el-radio-group v-bind="$attrs" @change="(e) => item.callback?.(e)">
			<template v-if="!item.checkBtnType">
				<el-radio v-for="v in opts" :key="v.value ? v.value : v" :label="v.value ? v.value : v">
					{{ v.label ? v.label : v }}
				</el-radio>
			</template>
			<template v-if="item.checkBtnType === 'btn'">
				<el-radio-button v-bind="item" v-for="v in opts" :key="v.value ? v.value : v" :label="v.value ? v.value : v">
					{{ v.label ? v.label : v }}
				</el-radio-button>
			</template>
		</el-radio-group>
	</div>
</template>

<script lang="ts">
export default {
	name: 'mRadioGroup',
	props: {
		item: Object,
		opts: Array,
	},
	setup() {
		return {};
	},
};
</script>
