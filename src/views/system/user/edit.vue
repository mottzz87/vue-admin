<!-- 
 * Author       : Vane
 * Desc         :  
 * Date         : 2021-05-23 02:52:17
 * LastEditors  : Vane
 * LastEditTime : 2021-05-27 14:40:20
 * FilePath     : \src\views\pages\formAdapt\edit.vue
 -->

<template>
	<div>
		<Form ref="edit-form" :config="config" label-width="100px" @submit="save" />
		<!-- <el-divider content-position="left" />
    <div v-if="data" class="current-count">
      当前销量: {{ data.sellNumber }}
    </div> -->
	</div>
</template>

<script lang="ts">
	import Form from '@/components/Form/index.vue'
	import { computed, reactive, toRefs, getCurrentInstance } from 'vue'

	export default {
		name: 'Edit',
		components: { Form },
		props: {
			data: {
				type: Object,
				default: () => {},
			},
		},
		emits: ['submit', 'cancle'],
		setup(props, { emit }) {
			const { proxy } = getCurrentInstance() as any

			const rules = (
				item:
					| {
							prop: string
							label: string
							is?: undefined
							asyncOpts?: undefined
							span?: undefined
					  }
					| {
							prop: string
							label: string
							is: string
							asyncOpts: { name: string }
							span?: undefined
					  }
					| {
							prop: string
							label: string
							is: string
							asyncOpts: { name: string }
							span: number
					  }
			) => [{ required: true, message: '请填写' + item.label }]
			let fields = [
				{ prop: 'id', label: '编号' },
				{ prop: 'specification', label: '药品规格' },
				{ prop: 'name', label: '药品名称' },
				{ prop: 'batchNumber', label: '批号' },
				{ prop: 'medicinePackage', label: '药品包装' },
				{ prop: 'arcUom', label: '单位' },
				{ prop: 'dosageForm', label: '剂型' },
				// { prop: 'medicineClass', label: '药品分类', is: 'select', opts: []},
				// { prop: 'type', label: '药品种类', is: 'select', opts: []},
				// { prop: 'antibioticType', label: '抗生素类型', is: 'select', opts: []},
				{ prop: 'manufacturer', label: '厂家' },
				{ prop: 'registerNumber', label: '批文号' },
				{ prop: 'pinyin', label: '拼音编码' },
				// { prop: 'channelIds', label: '流转渠道', is: 'checkboxGroup', opts: [], span: 23 },
				{
					// <el-divider content-position='left' />
					label: '测试',
					render: (row, val) => {
						console.log(row, val)
						return 123
					},
				},
			]
			fields = fields.map((v) => ({ ...v, rules: rules(v) }))
			const state = reactive({
				config: {
					fields,
					formData: {},
					actions: {
						save: true,
						cancle: () => {
							// console.log(proxy)
							console.log(123)
							emit('cancle')
						},
					},
					attrs: {
						span: 12,
					},
				},
			})

			state.config.formData = computed(() => props.data)

			const save = (params: any) => {
				emit('submit', params)
			}
			return {
				save,
				...toRefs(state),
			}
		},
	}
</script>
<style lang="scss" scoped>
	.current-count {
		font-weight: 600;
		font-size: 16px;
		padding-bottom: 30px;
	}
	.el-divider--horizontal {
		margin-top: 0;
	}
</style>
