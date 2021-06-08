<!-- 
 * Author       : Vane
 * Desc         :  
 * Date         : 2021-05-23 00:35:56
 * @LastEditors: Vane
 * @LastEditTime: 2021-06-07 04:31:09
 * @FilePath: \vue-admin\src\components\FormTable\index.vue
 -->
<template>
	<div class="form-table">
		<el-card shadow="never" class="search-form">
			<Form ref="search-form" :config="formConfig" @submit="getFormParams" @reset="getList()" />
		</el-card>
		<Table
			v-loading="loading"
			:data="list"
			:columns="tableConfig.columns"
			:pagination="{ ...pagination, ...tableConfig.pagination }"
			:manipulate="tableConfig.manipulate"
			@handle-selection-change="handleSelectionChange"
		/>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import Form from '@/components/Form/index.vue';
import Table from '@/components/Table/index.vue';
export default {
	name: 'FormTable',
	components: {
		Form,
		Table,
	},
	props: {
		// form参数配置
		formConfig: {
			type: Object,
			default: () => {},
		},
		// table参数配置
		tableConfig: {
			type: Object,
			default: () => ({
				columns: [],
				list: [],
				tableHandle: [],
				pagination: {
					autoScroll: true, // 刷新数据是否自动滚动
				},
			}),
		},
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;

		const state = reactive({
			// 列表数据
			list: [],
			loading: false,
			// 列表多选操作的值
			selectionValue: [],

			// 分页器设置
			pagination: {
				page: 1,
				pageSize: 20,
				pageSizes: [10, 20, 30, 40],
				total: 99,
				handle: (params: Object) => {
					console.log(params);
					state.pagination = {
						...state.pagination,
						...params,
					};
					getList();
				},
			},
		});

		onMounted(() => getList());

		//获取列表
		const getList = (params?: any) => {
			const { actions = {} } = props.formConfig;

			const form = proxy.$refs['search-form'] ? proxy.$refs['search-form'].form : {};

			const { page, pageSize } = state.pagination;
			const formParams = params || form;
			const { defaultParams = {}, extraParams = {}, api } = actions.search;
			if (!actions.search || !api) {
				state.loading = false;
				ElMessage.warning('缺少接口api地址');
				return;
			}
			console.log(formParams, 11);
			const data = {
				page,
				size: pageSize,
				...formParams,
				...defaultParams,
				...extraParams,
			};
			state.loading = true;
			// Request.default[api](data).then(({ data }) => {
			//   state.list = data.records
			//   state.pagination.total = data.total || 0
			//   state.loading = false
			// }).catch((error: any) => {
			//   console.log(error)
			//   state.loading = false
			// })
			const initTableData = (n: number) =>
				Array.from({ length: n }, (x, i) => ({
					id: Math.floor(Math.random() * 100),
					num: `00${i + 1}`,
					name: (Math.round(Math.random() * 20901) + 19968).toString(16),
					photo: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1633081619,2004077072&fm=26&gp=0.jpg',
					phone: Math.floor(Math.random() * 10000000000),
					email: `${Math.floor(Math.random() * 1000)}@qq.com`,
					sex: i % 2 === 0 ? '男' : '女',
					time: new Date().toLocaleDateString(),
					zip: 'CA 90036',
				}));
			setTimeout(() => {
				state.list = Object.freeze(initTableData(20) as any);
				state.pagination.total = state.list.length || 0;
				state.loading = false;
			}, 300);
		};

		//query
		const getFormParams = (params: any) => {
			// console.log(params)
			// 再次查询初始化页码
			state.pagination.page = 1;
			getList(params);
		};

		// 列表多选值
		const handleSelectionChange = (val: never[]) => {
			state.selectionValue = val;
		};

		const beforeDelete = () => {
			// 删除第二页只有一条的数据时 重置page
			const { page, pageSize, total } = state.pagination;
			const totalPage = Math.ceil((total - 1) / pageSize) || 1; // 删除一条数据之后的总页数
			state.pagination.page = page > totalPage ? totalPage : page;
			getList();
		};

		return {
			getList,
			getFormParams,
			handleSelectionChange,
			beforeDelete,
			...toRefs(state),
		};
	},
};
</script>
<style scoped>
.search-form {
	margin-bottom: 20px;
}
</style>
