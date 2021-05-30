<!--
 * @Author: Vane
 * @Date: 2021-05-31 01:47:47
 * @LastEditTime: 2021-05-31 03:22:39
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\mTag.vue
-->
<template>
	<div>
		<el-tag v-bind="$attrs" v-for="(v, i) in modelValue" :key="v" @close="(e) => handleClose(v, i)">
			{{ v }}
		</el-tag>
		<el-input
			class="input-new-tag"
			v-if="inputVisible"
			v-model="inputValue"
			ref="saveTagInput"
			size="small"
			@keyup.enter="handleInputConfirm"
			@blur="handleInputConfirm"
		/>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">+ {{ item.addLabel || '新增' }}</el-button>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, getCurrentInstance, nextTick, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
export default {
	name: 'mTag',
	emits: ['update:modelValue', 'handleInputConfirm'],
	props: {
		modelValue: {
			type: Array,
			default: () => [],
		},
		item: Object,
	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			inputValue: '',
			inputVisible: false,
		});

		watchEffect(() => {
			//重置时会出现值为[undefined]的值 这里监听并清空value
			if (props.modelValue?.length && !props.modelValue?.filter((v) => v).length) {
				updateValue([]);
			}
		});

		//更新value
		const updateValue = (val: any) => {
			emit('update:modelValue', val);
		};

		//删除
		const handleClose = (tag: any) => {
			if (!props.item?.closable) return;
			updateValue(props.modelValue.filter((v) => tag && v !== tag));
		};

		// 输入
		const showInput = () => {
			state.inputVisible = true;
			nextTick(() => {
				proxy.$refs.saveTagInput.$refs.input.focus();
			});
		};

		//添加
		const handleInputConfirm = () => {
			const { inputValue } = state;

			const arr = props.modelValue || [];
			if (!inputValue) return ElMessage.warning('请输入内容');
			if (props.modelValue?.includes(inputValue)) return ElMessage.warning(props.item?.warnMsg || '请勿重复添加');

			arr.push(inputValue);
			updateValue(arr);

			state.inputVisible = false;
			state.inputValue = '';
		};

		return {
			handleClose,
			showInput,
			handleInputConfirm,
			...toRefs(state),
		};
	},
};
</script>
<style scoped>
.el-tag + .el-tag {
	margin-left: 10px;
}
.button-new-tag {
	margin-left: 10px;
	height: 32px;
	color: var(--color-success);
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90px;
	margin-left: 10px;
	/* vertical-align: bottom; */
}
</style>
