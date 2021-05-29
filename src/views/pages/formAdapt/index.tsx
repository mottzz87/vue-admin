import { toRefs, reactive, getCurrentInstance, onMounted } from 'vue'
import Form from '@/components/Form/index.vue'
import Table from '@/components/Table/index.vue'
import FormTable from '@/components/FormTable/index.vue'
import Edit from './edit.vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { sortOpts } from './data'

export default {
	name: 'pagesFormAdapt',
	components: {
		Form,
		Table,
		FormTable,
		Edit,
	},
	setup() {
		const { proxy } = getCurrentInstance() as any
		const randomArr = (n: number) => Array.from({ length: n }, () => ({ id: Math.floor(Math.random() * 100) }))
		onMounted(() => {
			// state.list = randomArr(20) as any
			state.list = [
				{
					date: '2016-05-03',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
				},
				{
					date: '2016-05-02',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
				},
				{
					date: '2016-05-04',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
				},
				{
					date: '2016-05-01',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
				},
				{
					date: '2016-05-08',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
				},
				{
					date: '2016-05-06',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
				},
				{
					date: '2016-05-07',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
				},
			]
		})
		const state = reactive({
			showEdit: false,
			editData: null,
			loading: false,
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',
			},
			formConfig: {
				fields: [
					{ prop: 'keyword', label: '关键字' },
					{
						prop: 'sort',
						label: '排序',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '流转渠道', is: 'select', opts: [] },
					{ prop: 'keyword', label: '关键字' },
					{
						prop: 'sort',
						label: '排序',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '流转渠道', is: 'select', opts: [] },
					{
						prop: 'sort',
						label: '排序',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '流转渠道', is: 'select', opts: [] },
					{
						prop: 'sort',
						label: '排序',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '流转渠道', is: 'select', opts: [] },
					{
						prop: 'sort',
						label: '排序',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '流转渠道', is: 'select', opts: [] },
				],
				formData: {
					sort: 4,
				},
				actions: {
					search: {
						api: 'getDruglibList',
						defaultParams: {},
						extraParams: {},
						isResetNull: true,
					},
				},
			},
			tableConfig: {
				// 构建列表表格
				columns: Object.freeze([
					{ label: '编号', render: (row: any, val: any, i: number) => i + 1 },
					{ label: '药品名称', prop: 'id' },
					{ label: '药品规格', prop: 'specification' },
					{ label: '批号', prop: 'batchNumber' },
					{ label: '包装', prop: 'medicinePackage' },
					{ label: '药品种类', render: (row: any) => 111 },
					{ label: '厂家', prop: 'manufacturer' },
					{ label: '剂型', prop: 'dosageForm' },
					{ label: '总销量', prop: 'sellNumber' },
					{ label: '操作', width: 200, render: (row: any, i: any) => 111 },
				]),
				pagination: {
					page: 1,
					pageSize: 20,
					pageSizes: [10, 20, 30, 40],
					total: 99,
					handle: (params: Object) => {},
				},
				// // 附加操作按钮
				// tableHandle: [{
				//   label: '下载模板',
				//   action: 'download',
				//   api: 'druglibDownload'
				// }, {
				//   label: '导入',
				//   action: 'upload',
				//   api: 'druglibImport',
				//   confirmApi: 'druglibImportConfirm',
				//   confirmProper: 'importList', // 导入确认接口字段定义（数据提交后端的列表键值对的key值）
				//   confirmDefaultParams: {}, // 请求携带的参数
				//   columns: [
				//     { label: '编号', prop: 'code' },
				//     { label: '药品名称', prop: 'name' },
				//     { label: '药品规格', prop: 'specification' },
				//     { label: '批号', prop: 'batchNumber' },
				//     { label: '包装', prop: 'medicinePackage' },
				//     { label: '单位', prop: 'arcUom' },
				//     { label: '剂型', prop: 'dosageForm' },
				//     { label: '药品种类', render: row => this.renderRowkey('druglib_index_typeOpts3', row.type) },
				//     { label: '分类', render: row => this.renderRowkey('druglib_index_typeOpts2', row.medicineClass) },
				//     { label: '抗生素类型', render: row => this.renderRowkey('druglib_index_typeOpts1', row.antibioticType) },
				//     { label: '批准文号', prop: 'registerNumber' },
				//     { label: '拼音编码', prop: 'pinyin' },
				//     { label: '流转渠道', render: row => row.channelIdsStr ? row.channelIdsStr.split(',').filter(v => v).join('、') : '--' },
				//     { label: '厂家', prop: 'manufacturer' }
				//   ]
				// }, {
				//   type: 'success',
				//   label: '新增',
				//   icon: 'el-icon-edit',
				//   handle: () => {
				//     this.toEdit(null)
				//   }
				// }]
			},
			list: [],
		})

		const getList = () => {
			const { getList } = proxy.$refs['form-table']
			getList()
		}

		const toEdit = (row: any) => {
			state.editData = row ? { ...row } : {}
			state.showEdit = true
		}

		const cancle = () => {
			state.showEdit = false
		}

		const handleDelete = (row: any) => {
			const { beforeDelete } = proxy.$refs['form-table']
			ElMessageBox.confirm('确定要删除此药品吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				//   Api.delDruglib({ medicineId: row.id }).then(res => {
				ElNotification({
					title: '成功',
					message: '删除成功',
					type: 'success',
					duration: 2000,
				})
				beforeDelete()
				//   }).catch((e) => {
				//     console.log(e)
				//   })
			})
		}

		const save = (params: any) => {
			console.log(params)
			state.showEdit = false
			// const { validate, model } = proxy.$refs['index-edit-form'].$refs['edit-form'].$refs['form']
			// validate(valid => {
			// if (valid) {
			// state.loading = true
			// const data = {
			//   ...model,
			//   channelList: model.channelList
			// }
			// const updateApi = state.editData ? Api.updateDruglib : Api.addDruglib
			// updateApi(model).then(res => {
			//   this.loading = false
			//   this.$notify({
			//     title: '成功',
			//     message: this.editData ? '保存成功' : '新建成功',
			//     type: 'success',
			//     duration: 2000
			//   })
			//   this.showEdit = false
			//   this.getList()
			// }).catch(error => {
			//   console.log(error)
			//   this.loading = false
			// })
			//   }
			// })
		}

		return () => (
			<>
				<Form ref='search-form' config={state.formConfig} />
				<Table
					v-loading={state.loading}
					data={state.list}
					columns={state.tableConfig.columns}
					pagination={state.tableConfig.pagination}
				/>
			</>
		)
	},
}
