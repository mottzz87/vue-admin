<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-05-11 14:09:31
 * LastEditors  : Vane
 * LastEditTime : 2021-05-28 15:29:03
 * FilePath     : \src\components\Form\base\mCheckboxGroup.vue
 -->
<template>
	<div>
		<el-checkbox v-model="checkAll" v-show="hasCheckAll" :indeterminate="isIndeterminate" @change="selectAll">
			全选
		</el-checkbox>
		<el-checkbox-group v-model="modelValue" v-bind="item" @change="handleChange">
			<template v-if="!item.checkBtnType">
				<el-checkbox v-for="v in opts" :key="v.value ? v.value : v" :label="v.value ? v.value : v">
					{{ v.label ? v.label : v }}
				</el-checkbox>
			</template>
			<template v-if="item.checkBtnType === 'btn'">
				<el-checkbox-button v-bind="item" v-for="v in opts" :key="v.value ? v.value : v" :label="v.value ? v.value : v">
					{{ v.label ? v.label : v }}
				</el-checkbox-button>
			</template>
		</el-checkbox-group>
	</div>
</template>

<script lang="ts">
	import { toRefs, reactive, watchEffect } from 'vue'
	export default {
		name: 'CheckboxGroup',
		emits: ['update:modelValue'],
		props: {
			modelValue: {
				type: Array,
				default: () => [],
			},
			item: Object,
			opts: Array,
			hasCheckAll: Boolean, //全选功能
		},
		setup(props, { emit }) {
			let { opts = [], item = {} } = props
			const state = reactive({
				checkAll: false,
				isIndeterminate: false,
			})

			//表单全选状态
			watchEffect(() => {
				const valLen = props.modelValue.length

				if (!valLen) {
					//未选
					state.checkAll = false
					state.isIndeterminate = false
				} else if (valLen === opts.length) {
					//全选
					state.checkAll = true
					state.isIndeterminate = false
				} else {
					//半选
					state.checkAll = false
					state.isIndeterminate = true
				}
			})

			const handleChange = (val: any) => {
				// handle逻辑页面选中状态通过watch判断
				emit('update:modelValue', val)
				item.callback && item.callback(val)
			}

			// 全选更新value值来重置全选状态
			const selectAll = (selected: any) => {
				const value = selected ? opts.map((v: any) => v.value) : []
				state.isIndeterminate = false
				emit('update:modelValue', value)
				item.callback && item.callback(value)
			}

			return {
				selectAll,
				handleChange,
				...toRefs(state),
			}
		},
	}
</script>
