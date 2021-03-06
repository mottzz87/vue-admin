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
					{ prop: 'keyword', label: '?????????' },
					{
						prop: 'sort',
						label: '??????',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '????????????', is: 'select', opts: [] },
					{ prop: 'keyword', label: '?????????' },
					{
						prop: 'sort',
						label: '??????',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '????????????', is: 'select', opts: [] },
					{
						prop: 'sort',
						label: '??????',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '????????????', is: 'select', opts: [] },
					{
						prop: 'sort',
						label: '??????',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '????????????', is: 'select', opts: [] },
					{
						prop: 'sort',
						label: '??????',
						is: 'select',
						opts: sortOpts,
						clearable: false,
					},
					{ prop: 'channelId', label: '????????????', is: 'select', opts: [] },
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
				// ??????????????????
				columns: Object.freeze([
					{ label: '??????', render: (row: any, val: any, i: number) => i + 1 },
					{ label: '????????????', prop: 'id' },
					{ label: '????????????', prop: 'specification' },
					{ label: '??????', prop: 'batchNumber' },
					{ label: '??????', prop: 'medicinePackage' },
					{ label: '????????????', render: (row: any) => 111 },
					{ label: '??????', prop: 'manufacturer' },
					{ label: '??????', prop: 'dosageForm' },
					{ label: '?????????', prop: 'sellNumber' },
					{ label: '??????', width: 200, render: (row: any, i: any) => 111 },
				]),
				pagination: {
					page: 1,
					pageSize: 20,
					pageSizes: [10, 20, 30, 40],
					total: 99,
					handle: (params: Object) => {},
				},
				// // ??????????????????
				// tableHandle: [{
				//   label: '????????????',
				//   action: 'download',
				//   api: 'druglibDownload'
				// }, {
				//   label: '??????',
				//   action: 'upload',
				//   api: 'druglibImport',
				//   confirmApi: 'druglibImportConfirm',
				//   confirmProper: 'importList', // ????????????????????????????????????????????????????????????????????????key??????
				//   confirmDefaultParams: {}, // ?????????????????????
				//   columns: [
				//     { label: '??????', prop: 'code' },
				//     { label: '????????????', prop: 'name' },
				//     { label: '????????????', prop: 'specification' },
				//     { label: '??????', prop: 'batchNumber' },
				//     { label: '??????', prop: 'medicinePackage' },
				//     { label: '??????', prop: 'arcUom' },
				//     { label: '??????', prop: 'dosageForm' },
				//     { label: '????????????', render: row => this.renderRowkey('druglib_index_typeOpts3', row.type) },
				//     { label: '??????', render: row => this.renderRowkey('druglib_index_typeOpts2', row.medicineClass) },
				//     { label: '???????????????', render: row => this.renderRowkey('druglib_index_typeOpts1', row.antibioticType) },
				//     { label: '????????????', prop: 'registerNumber' },
				//     { label: '????????????', prop: 'pinyin' },
				//     { label: '????????????', render: row => row.channelIdsStr ? row.channelIdsStr.split(',').filter(v => v).join('???') : '--' },
				//     { label: '??????', prop: 'manufacturer' }
				//   ]
				// }, {
				//   type: 'success',
				//   label: '??????',
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
			ElMessageBox.confirm('??????????????????????????????', '??????', {
				confirmButtonText: '??????',
				cancelButtonText: '??????',
				type: 'warning',
			}).then(() => {
				//   Api.delDruglib({ medicineId: row.id }).then(res => {
				ElNotification({
					title: '??????',
					message: '????????????',
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
			//     title: '??????',
			//     message: this.editData ? '????????????' : '????????????',
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
