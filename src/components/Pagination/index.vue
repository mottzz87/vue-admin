<!-- 
 * Author       : Zhao Dongxu
 * Desc         :  
 * Date         : 2021-05-17 17:12:41
 * LastEditors  : Vane
 * LastEditTime : 2021-05-27 14:34:01
 * FilePath     : \src\components\Pagination\index.vue
 -->
<template>
	<div class="pagination-container">
		<el-pagination
			:background="background"
			v-if="show"
			v-bind="attrs"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script lang="ts">
	import { scrollTo } from '@/utils/scroll.ts'
	import { toRefs, reactive } from 'vue'

	export default {
		name: 'Pagination',
		emits: ['pagination'],
		props: {
			currentPage: {
				type: Number,
				default: 1,
			},
			pageSizes: {
				type: Array,
				default() {
					return [10, 20, 30, 50]
				},
			},
			pageSize: {
				type: Number,
				default: 20,
			},
			layout: {
				type: String,
				default: 'total, sizes, prev, pager, next, jumper',
			},
			total: {
				required: true,
				type: Number,
				default: 0,
			},
			background: {
				type: Boolean,
				default: true,
			},
			autoScroll: {
				type: Boolean,
				default: true,
			},
			show: {
				type: Boolean,
				default: true,
			},
		},
		setup(props, { emit, attrs }) {
			const state = reactive({})
			const { currentPage, pageSize, autoScroll } = props
			const handleSizeChange = (val: any) => {
				emit('pagination', { page: currentPage, pageSize: val })
				if (autoScroll) {
					scrollTo(0, 800)
				}
			}
			const handleCurrentChange = (val: any) => {
				emit('pagination', { page: val, pageSize })
				if (autoScroll) {
					scrollTo(0, 800)
				}
			}
			return {
				attrs: { ...props },
				handleSizeChange,
				handleCurrentChange,
				...toRefs(state),
			}
		},
	}
</script>

<style scoped>
	.pagination-container {
		background: #fff;
		padding: 32px 16px;
	}
	.pagination-container.hidden {
		display: none;
	}
</style>
