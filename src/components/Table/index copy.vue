<!--
 * Author       : Zhao Dongxu
 * Desc         :
 * Date         : 2020-12-14 17:07:19
 * LastEditors  : Zhao Dongxu
 * LastEditTime : 2020-12-14 17:07:19
 * FilePath     : \src\components\TableList\index_new.vue
 -->
<template>
	<div>
		<el-table
			v-loading="loading"
			:header-cell-style="headerCellStyle"
			:data="data"
			:cell-style="cellStyle"
			:height="height"
			:max-height="maxHeight"
			element-loading-text="加载中..."
			style="width: 100%"
			border
			fit
			highlight-current-row
			:row-style="rowStyle"
			class="m-t-5"
			@selection-change="handleSelectionChange"
		>
			<el-table-column
				v-for="(col, i) in columns"
				:key="col.prop"
				:align="col.align || 'center'"
				:label="col.label"
				:prop="col.prop"
				:show-overflow-tooltip="col.showOverflowTooltip"
				:type="col.type"
				:width="col.width"
				:render-header="renderheader"
				:formatter="
					(row, column, cellValue, index) => (col.render ? col.render(row, index, column, cellValue) : row[col.prop])
				"
			/>
		</el-table>
		<!-- 批量操作 -->
		<div v-if="manipulate" class="m-t-20">
			<el-popover placement="right" :width="manipulate.width || 400" trigger="hover">
				<el-button
					v-for="(item, i) in manipulate.actions"
					:key="item.value || i + 1"
					plain
					round
					size="small"
					:type="item.type"
					@click="item.handle(selected)"
				>
					{{ item.label }}
				</el-button>
				<el-button slot="reference" type="primary">{{ manipulate.label }}</el-button>
			</el-popover>
		</div>

		<!-- 分页器 -->
		<pagination
			v-if="pagination"
			v-show="pagination.total > 0"
			:page-sizes="pagination.pageSizes"
			:page.sync="pagination.page"
			:limit.sync="pagination.limit"
			:layout="pagination.layout || 'total, sizes, prev, pager, next, jumper'"
			:total="pagination.total"
			:auto-scroll="pagination.autoScroll"
			@pagination="pagination.handle"
		/>
	</div>
</template>

<script>
	import { IMG_URL } from '@/config/global'
	import Pagination from '@/components/Pagination'
	import Sortable from 'sortablejs'

	export default {
		name: 'TableList',
		components: {
			Pagination,
		},
		// 批量修改demo事例
		// manipulate: {
		//   label: '批量操作', //按钮显示字符
		//   width: 400, //按钮弹层宽度
		//   actions: [  //按钮行为
		//     {
		//       label: '批量通过',
		//       type: 'warning',
		//       handle: arr => { //arr 选中的数组
		//         if (!arr.length) return this.$message({ message: '请勾选批量操作的数据', type: 'warning' })
		//       }
		//     },
		//     {
		//       label: '批量驳回',
		//       type: 'info',
		//       handle: arr => {
		//         return this.$message({ message: '此功能敬请期待', type: 'warning' })
		//       }
		//     }
		//   ]
		// }
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
			cellStyle: {
				type: Object,
				default: null,
			},
			headerCellStyle: {
				type: Object,
				default: () => ({ background: '#F5F7FA', color: '#888' }),
			},
			height: {
				type: Number || String,
				default: null,
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
			// 拖拽事件
			rowMoveFn: {
				type: Function,
				default: null,
			},
		},

		data() {
			return {
				IMG_URL,
				selected: [],
				rowStyle: {},
			}
		},
		computed: {
			_columns() {
				const _cols = [...this.columns]
				// if (this.manipulate) {
				//   console.log(_cols)
				//   _cols = _cols.unshift({ type: 'selection' })
				// }
				return _cols
			},
		},
		mounted() {
			// 基础拖拽
			if (this.rowMoveFn) {
				this.rowStyle = { cursor: 'move' }
				this.rowMove()
			}
		},
		created() {},
		methods: {
			renderheader(h, { column, $index }) {
				const arr = column.label.split(',')
				return arr.map((v) => (
					<span>
						{v}
						<br />
					</span>
				))
			},
			handleSelectionChange(val) {
				this.selected = val
				this.$emit('handle-selection-change', val)
			},
			rowMove() {
				const _this = this
				const tbody = document.querySelector('.el-table__body-wrapper tbody')
				new Sortable(tbody, {
					ghostClass: 'sortable-ghost',
					sort: true,
					delay: 70,
					// delayOnTouchOnly: true,  //延迟只在移动设备上生效
					// 列表内元素顺序更新的时候触发
					onUpdate: function (evt) {
						/** Event*/
						if (_this.rowMoveFn) {
							_this.rowMoveFn(evt)
						}
					},
				})
			},
		},
	}
</script>
