<!--
 * @Author: Vane
 * @Date: 2021-05-31 03:24:17
 * @LastEditTime: 2021-05-31 04:44:55
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\mLink.vue
-->
<template>
	<el-link v-for="v in opts" :key="v.label" v-bind="v" @click="handleClick">{{ v.label }}</el-link>
</template>

<script lang="ts">
export default {
	name: 'm-link',
	props: {
		item: Object,
		opts: Array,
	},
	emits: ['click'],
	setup(props, { attrs, emit }) {
		const handleClick = (e) => {
			if (!attrs.href) {
				console.log(1111);
				emit('click', e);
			}
		};
		return {
			handleClick,
		};
	},
};
</script>

<style scoped>
.el-link + .el-link {
	margin-left: 10px;
}
</style>
