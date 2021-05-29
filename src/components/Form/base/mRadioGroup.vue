<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-05-11 14:09:31
 * LastEditors  : Vane
 * LastEditTime : 2021-05-28 15:29:03
 * FilePath     : \src\components\Form\base\mRadioGroup.vue
 -->
<template>
	<div>
		<el-radio-group v-model="modelValue" v-bind="item" @change="handleChange">
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
	import { toRefs, reactive, watchEffect } from 'vue'
	export default {
		name: 'CheckboxGroup',
		emits: ['update:modelValue'],
		props: {
			modelValue: {
				type: String || Number,
				default: '',
			},
			item: Object,
			opts: Array,
		},
		setup(props, { emit }) {
			let { opts = [], item = {} } = props
			const state = reactive({})

			const handleChange = (val: any) => {
				emit('update:modelValue', val)
				item.callback && item.callback(val)
			}

			return {
				handleChange,
				...toRefs(state),
			}
		},
	}
</script>
