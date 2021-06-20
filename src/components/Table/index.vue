<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-05-17 16:48:46
 * @LastEditors: Vane
 * @LastEditTime: 2021-06-19 19:01:28
 * @FilePath: \vue-admin\src\components\Table\index.vue
 -->

<template>
	<div>
		<el-table
			v-loading="loading"
			v-bind="$attrs"
			:data="data"
			:header-cell-style="headerCellStyle"
			border
			fit
			element-loading-text="加载中..."
			@selection-change="handleSelectionChange"
		>
			<template v-for="(col, i) in columns" :key="i">
				<el-table-column
					v-bind="col"
					:align="col.align || 'center'"
					:formatter="(row, column, cellValue, index) => formatter(row, column, cellValue, index, col)"
				/>
			</template>
		</el-table>
		<pagination
			v-if="pagination"
			v-show="pagination.total > 0"
			:page-sizes="pagination.pageSizes"
			:page:sync="pagination.page"
			:pageSize:sync="pagination.pageSize"
			:layout="pagination.layout || 'total, sizes, prev, pager, next, jumper'"
			:total="pagination.total"
			:auto-scroll="pagination.autoScroll"
			@pagination="pagination.handle"
		/>
	</div>
</template>

<script lang="ts">
import Pagination from '@/components/Pagination/index.vue';
import { h, toRefs, reactive, computed, getCurrentInstance, onMounted } from 'vue';

export default {
	name: 'Table',
	components: {
		Pagination,
	},
	emits: ['handle-selection-change', 'paginationChange'],
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Array,
			default: null,
		},
		columns: {
			type: Array,
			default: null,
		},
		headerCellStyle: {
			type: Object,
			default: () => ({ background: '#F5F7FA', color: '#888' }),
		},
		maxHeight: {
			type: Number || String,
			default: null,
		},
		pagination: {
			type: Object,
			default: null,
		},
		// 有多选配置就代表存在多选项
		manipulate: {
			type: Object,
			default: null,
		},
		// 绑定key
		rowKey: {
			type: String,
			default: 'id',
		},
		// 是否可选
		allowSelect: {
			type: Boolean,
			default: true,
		},
		// 拖拽事件
		rowMoveFn: {
			type: Function,
			default: null,
		},
	},

	setup(props, { emit }) {
		const state = reactive({
			selected: [],
			rowStyle: {},
		});

		// 页面加载时
		onMounted(() => {
			// console.log(1111);
		});

		// //header多行显示 用,分割
		// const renderHeader = (e:any) => {
		//   const { label }  = e.column
		//   const arr = label.split(',')
		//   return label ? label.split(',').map((v: any) => <span>{v}<br/></span>) : null
		// }

		//格式化 支持render
		const formatter = (row: any, column: any, cellValue: any, i: number, col: any) => {
			const val = typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue;
			return col.render ? col.render({ row, val, i, column }) : cellValue;
		};

		const handleSelectionChange = (val: never[]) => {
			state.selected = val;
			emit('handle-selection-change', val);
		};
		return {
			handleSelectionChange,
			// rowMove,
			formatter,
			...toRefs(state),
		};
	},
};
</script>
