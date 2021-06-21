<!-- 
 * Author       : m
 * Desc         :  
 * Date         : 2021-05-27 17:35:01
 * @LastEditors: Vane
 * @LastEditTime: 2021-06-22 02:30:09
 * @FilePath: \vue-admin\src\components\Form\base\index.vue
 -->
<template>
	<component :is="is()" :item="item" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mInput from './mInput.vue';
import mRadioGroup from './mRadioGroup.vue';
import mCheckbox from './mCheckbox.vue';
import mCheckboxGroup from './mCheckboxGroup.vue';
import mDatePicker from './mDatePicker.vue';
import mInputNumber from './mInputNumber.vue';
import mSelect from './mSelect.vue';
import mRate from './mRate.vue';
import mTag from './mTag.vue';
import mSwitch from './mSwitch.vue';
import mLink from './mLink.vue';
import mUpload from './mUpload.vue';

export default defineComponent({
	name: 'components',
	components: {
		mInput,
		mRadioGroup,
		mCheckbox,
		mCheckboxGroup,
		mDatePicker,
		mInputNumber,
		mSelect,
		mRate,
		mTag,
		mSwitch,
		mLink,
		mUpload,
	},
	props: {
		item: Object,
	},
	setup(props) {
		const is = () => (props.item?.is.includes('el-') ? `${props.item.is}` : `m${props.item?.is}`);
		if (props.item?.is.includes('el-')) {
			console.log(props.item.is);
		}
		return {
			is,
		};
	},
});
</script>
