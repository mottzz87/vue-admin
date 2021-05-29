<!-- 
 * Author       : Vane
 * Desc         :  
 * Date         : 2021-05-11 00:18:20
 * LastEditors  : Vane
 * LastEditTime : 2021-05-28 17:58:35
 * FilePath     : \src\components\Form\base\mSelect.vue
 -->
<template>
	<el-select v-bind="$attrs" @change="handleChange">
		<el-option v-for="item in opts" :key="item.value" v-bind="item" />
	</el-select>
</template>
<script lang="ts">
	export default {
		name: 'mSelect',
		components: {},
		props: {
			opts: {
				type: Array,
				default: () => [],
			},
			callback: {
				type: Function,
			},
		},
		setup(props) {
			const { callback } = props
			const handleChange = (e: any) => {
				callback && callback(e)
			}
			return {
				handleChange,
			}
		},
	}
</script>
