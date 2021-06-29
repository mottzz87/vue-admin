<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-04-29 09:18:16
 * @LastEditors: Vane
 * @LastEditTime: 2021-06-22 02:29:14
 * @FilePath: \vue-admin\src\views\system\user\index.vue
 -->
<template>
	<div class="form-adapt-container">
		<form-table ref="form-table" :form-config="formConfig" :table-config="tableConfig" />
		<!-- 编辑、新建 -->
		<el-dialog
			:title="editData ? '编辑' : '新增'"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			v-model="showEdit"
		>
			1233
		</el-dialog>
	</div>
</template>
<script lang="tsx">
import { toRefs, reactive, getCurrentInstance } from 'vue';
import FormTable from '@/components/FormTable/index.vue';
import components from '@/components/Form/base/index.vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import MLink from '@/components/Form/base/mLink.vue';
export default {
	name: 'pagesFormAdapt',
	components: {
		FormTable,
		...{ ...components.components },
		MLink,
		// Edit
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const opts = [
			{ label: '篮球111', value: '11' },
			{ label: '乒乓球', value: '22' },
			{ label: '橄榄球', value: '33' },
			{ label: '网球', value: '44' },
		];
		const state = reactive({
			showEdit: false,
			editData: null,
			loading: false,
			formConfig: {
				fields: [
					{ prop: 'keyword', label: '关键字', type: 'textarea', rows: 1, maxlength: 100 },
					{ prop: 'sort', label: '单个复选', is: 'Checkbox', desc: '全选' },
					{ prop: 'channelId', label: '多选', span: 12, is: 'CheckboxGroup', hasCheckAll: true, opts },
					{ prop: 'sort1', label: '下拉多选', is: 'Select', multiple: true, opts, clearable: false },
					{ prop: 'sort2', label: '单选', is: 'RadioGroup', checkBtnType: 'btn', opts, span: 24 },
					{ prop: 'sort3', label: '排序', is: 'InputNumber' },
					{ prop: 'sort4', label: '日期', is: 'DatePicker', type: 'daterange', format: 'YYYY-MM-DD' },
					{ prop: 'sort5', label: '评分', is: 'Rate' },

					{
						prop: 'sort6',
						label: '切换',
						is: 'Switch',
					},
					{ prop: 'sort7', label: '热搜词', is: 'Tag', opts },
					{
						prop: 'sort8',
						label: '热搜词',
						render: ({ row }) => <span style={{ color: 'red' }}>热搜词</span>,
					},
					{ prop: 'sort9', label: '图片', is: 'Upload' },
				],
				formData: {
					keyword: "['teset', 'safs']",
					channelId: ['11'],
					sort: '11',
					sort1: ['11'],
					sort2: '11',
					sort3: 10,
					gmtEnd: '2021-06-27',
					gmtStart: '2021-05-28',
					sort7: opts.map((v) => v.label),
				},
				attrs: {
					span: 24,
				},
				actions: {
					search: {
						api: 'getDruglibList',
						defaultParams: {},
						extraParams: {},
						// isResetNull: true,
					},
				},
			},
			tableConfig: {
				// 构建列表表格
				columns: Object.freeze([
					{ label: 'ID', render: ({ row }) => row.num },
					{ label: '用户名', prop: 'name' },
					{
						label: '头像',
						prop: 'zip',
						render: ({ row, val }) => (
							<el-avatar size={60} src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
						),
					},
					{ label: '手机号', prop: 'phone' },
					{ label: '邮箱', prop: 'email' },
					{ label: '性别', prop: 'sex' },
					{ label: '加入时间', prop: 'time' },
					{
						label: '操作',
						width: 200,
						render: ({ row, val }) => <span onClick={() => toEdit(row, val)}>编辑</span>,
					},
				]),
				pagination: {},
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
		});
		const getList = () => {
			const { getList } = proxy.$refs['form-table'];
			getList();
		};

		const toEdit = (row: any) => {
			console.log(row);
			console.log(123123);

			state.editData = row ? { ...row } : {};
			state.showEdit = true;
		};

		const cancle = () => {
			state.showEdit = false;
		};

		const handleDelete = (row: any) => {
			const { beforeDelete } = proxy.$refs['form-table'];
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
				});
				beforeDelete();
				//   }).catch((e) => {
				//     console.log(e)
				//   })
			});
		};

		return {
			getList,
			toEdit,
			cancle,
			handleDelete,
			...toRefs(state),
		};
	},
};
</script>
