import { h, toRefs, reactive, computed, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { beforeSubmit, beforeDetail } from '@/utils'
import components from './base'

export default {
	name: 'Form',
	components: {
		...components,
	},
	props: {
		// config参数配置事例
		config: {
			type: Object,
			default: () => ({
				formData: {}, // 表单数据填充对象
				actions: {},
				// fields: [  //fields：表单渲染字段
				//   { prop: 'keyword', label: '关键字',
				//     show: data => !!data.sort    //show：处理各单个控件联动显示与隐藏
				//   },
				//   { prop: 'sort', label: '排序', is: 'select', opts: sortOpts } //常规获取options事例
				//   { prop: 'sort', label: '排序', is: 'select', asyncOpts: { name: 'dictionary/druglib_index_channels' } } //异步数据字典获取方式 调用方法统一放在dictionary.js下
				// ],
				// formData: {}, //formData：表单数据 需要数据填充的场景初始化字段即可
				// actions: { // actions：必填 表单查询或者保存 查询表单这里仅用作查询
				//   search: {  //查询必传
				//     api: 'getDoctorList',  //api：查询必传 查询api api定义在/src/api目录下 这里自动获取
				//     defaultParams: {},    //defaultParams： 查询需要携带的默认参数 没有留空
				//     extraParams: {},  //extraParams 查询需要携带的额外参数 没有留空
				//     isResetNull: true,  //isResetNull 默认重置到初始的formData状态（此时formData可能有回显的值） isResetNull为true则重置为formData = {}
				//     isResetRouteQuery: true //重置时 是否重置query携带的参数
				//   },
				//   save: true //保存必传
				//   cancle: () => {} //默认不传 跳回上一页
				// },
				// attrs: {
				//   span: 24 // 表单form-item统一的栅栏比例 编辑页适应多种不同布局的表单
				// },
			}),
		},
	},
	emits: ['submit', 'reset'],
	setup(props, { attrs, emit }) {
		let {
			config: { fields, formData, actions },
		} = props
		const { proxy } = getCurrentInstance() as any
		const router = useRouter()
		const route = useRoute()
		const TYPE = {
			select: { is: 'select-bar' },
			checkbox: { is: 'checkbox' },
			// checkboxGroup: { is: 'checkbox-group' },
			// radioGroup: { is: 'radio-group' },
			text: { is: 'el-input' },
			number: { is: 'el-input-number' },
			switch: { is: 'el-switch' },
			auto: { is: 'el-autocomplete' },
			datepicker: {
				is: 'el-date-picker',
				type: 'daterange',
				rangeSeparator: '~',
				startPlaceholder: '开始日期',
				endPlaceholder: '结束日期',
				editable: false,
			},
			timepicker: {
				is: 'el-time-picker',
				type: 'datetimerange',
				rangeSeparator: '~',
				startPlaceholder: '开始时间',
				endPlaceholder: '结束时间',
				editable: false,
			},
			rate: {
				is: 'el-rate',
				showScore: true,
				allowHalf: true,
			},
			// 'select-cascader': {
			//   is: 'cascader',
			//   filterable: true
			// } // 级联选择器
		}
		const state: any = reactive({
			TYPE,
			actions,
			form: beforeDetail(formData || {}, fields),
			config: props.config,
			rules:
				fields && fields.length
					? fields.reduce(
							(r: any, c: { prop: any; rules: any }) => ({
								...r,
								[c.prop]: c.rules ? c.rules : [],
							}),
							{}
					  )
					: {},
			attributes: {
				xl: 4,
				lg: 6,
				md: 8,
				sm: 12,
				xs: 24,
			},
		})
		const widthConfig: any = {
			datepicker: {
				width: 330,
			},
			timepicker: {
				width: 330,
			},
		}

		const renderCusComponent = (x: any, form: any, val: any) => x.render(x, form, val)

		const delCusPropers = (obj: Object) => {
			let propers = { ...obj }
			//删除多余属性（这里不删除会有warn提示）
			const cusPropersArr = ['is', 'prop', 'width', 'label', 'show', 'valueKey', 'span']
			Object.keys(propers).forEach((v: any) => {
				if (cusPropersArr.includes(v)) {
					delete propers[v]
				}
			})
			return propers
		}

		const getComsAttrs = (col: any) => {
			// 重组组件属性
			const { is = 'text', label, disabled } = col
			if (is === 'cusComponent') return {}
			const isSelect = /^(select|timepicker|datepicker|checkbox-group|checkbox)/.test(is)
			const placeholder = (isSelect ? '请选择' : '请输入') + label
			const defaultAttrs = {
				placeholder,
				clearable: true,
			}
			let _attrs = { ...defaultAttrs, disabled, ...state.TYPE[is], ...col }

			return delCusPropers(_attrs)
		}

		const getFormAttrs = computed(() => ({
			size: 'small',
			labelWidth: '100px',
			...attrs,
		}))

		const getElColAttrs = computed(() => {
			const { attrs = state.attributes } = props.config || {}
			return { ...attrs }
		})

		const getElColStyle = (x: { width: string }) => ({
			width: x.width ? x.width + 'px' : ' ',
		})

		const formItems = computed(() => {
			if (!fields || !fields.length) return []
			let _fields = fields
			// 针对筛选条件自定义输入框宽度
			if (actions && actions.search) {
				_fields = fields.map((v: { is: string | number }) => ({
					...(widthConfig[v.is] ? widthConfig[v.is] : { width: 258 }),
					...v,
				}))
			}
			return _fields.map((v: any) => ({ show: true, ...v, is: v.is || 'text' }))
		})

		//空值col显隐
		const isShow = (item: any) => {
			if (!item) return true
			return typeof item.show === 'boolean' ? item.show : item.show(state.form)
		}

		const reload = (path: string) => router.push(path)

		//重置为空
		const resetNull = () => {
			state.form = {}
		}

		//重置
		const reset = () => {
			const { query, path } = route
			// 重置query参数 若后续业务存在是否重置query参数的场景 可在actions.search里扩展 同下文isResetNull
			// isResetRouteQuery: 是否需要重置路由携带的参数
			if (Object.keys(query).length && actions.search && actions.search.isResetRouteQuery) {
				return reload(path)
			}
			// reset表单
			if (proxy.$refs.formRef) {
				state.form = {}
				proxy.$refs.formRef.resetFields()
				state.form =
					fields && fields.length
						? fields.reduce(
								(r: any, c: any) =>
									Object.assign(r, {
										[c.prop]: formData[c.prop] ? formData[c.prop] : c.is ? state.TYPE[c.is].defaultValue || '' : '',
									}),
								{}
						  )
						: {}
			}
			// 默认重置为初始字段 若isResetNull存在 则重置所有字段为空
			if (actions && actions.search && actions.search.isResetNull) {
				resetNull()
			}
			emit('reset')
		}

		// 提交
		const submit = () => {
			proxy.$refs.formRef.validate((valid: any) => valid && emit('submit', beforeSubmit(state.form, fields)))
		}

		const cancle = () => {
			const { cancle } = actions
			cancle ? cancle(state.form) : router.go(-1)
		}
		console.log(formItems, components)
		return () => (
			<el-form ref='formRef' {...{ props: { model: state.form } }}>
				<el-row gutter={10}>
					{formItems.value &&
						formItems.value.map((x, i) => {
							return isShow(x) ? (
								<el-col
									{...(x.span ? { span: x.span } : getElColAttrs.value)}
									style={getElColStyle(x)}
									class='col mb20'>
									<el-form-item {...x} class='width-full'>
										{!x.render ? (
											h(state.TYPE[x.is].is, getComsAttrs(x))
										) : (
											<div>{renderCusComponent(x, state.form, state.form[x.prop])}</div>
										)}
									</el-form-item>
								</el-col>
							) : null
						})}
				</el-row>
			</el-form>
		)
	},
}
