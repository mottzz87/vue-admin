<!-- 
 * Author       : m
 * Desc         :  
 * Date         : 2021-05-27 17:35:01
 * @LastEditors: Vane
 * @LastEditTime: 2021-05-29 19:31:25
 * @FilePath: \vue-admin\src\components\Form\base\index.vue
 -->
<template>
	<component :is="`m${item.is}`" :item="item" @callback="(e) => item.callback(e)"> </component>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	// import mButton from "./mButton.vue";
	import mInput from './mInput.vue'
	// import mRadio from "./mRadio.vue";
	import mRadioGroup from './mRadioGroup.vue'
	import mCheckbox from './mCheckbox.vue'
	import mCheckboxGroup from './mCheckboxGroup.vue'
	// import mCheckButton from "./mCheckButton.vue";
	// import mDatePicker from "./mDatePicker.vue";
	import mInputNumber from './mInputNumber.vue'
	import mSelect from './mSelect.vue'
	// import mSlider from "./mSlider.vue";
	// import mSpan from "./mSpan.vue";
	// import mIcon from "./mIcon.vue";
	// import mColorPicker from "./mColorPicker.vue";
	// import mRate from "./mRate.vue";
	// import mTimePicker from "./mTimePicker.vue";
	// import mTag from "./mTag.vue";
	// import mSwitch from "./mSwitch.vue";

	export default defineComponent({
		name: 'components',
		components: {
			// mButton,
			mInput,
			// mRadio,
			mRadioGroup,
			mCheckbox,
			mCheckboxGroup,
			// mCheckButton,
			// mDatePicker,
			mInputNumber,
			mSelect,
			// mSlider,
			// mSpan,
			// mIcon,
			// mColorPicker,
			// mRate,
			// mTimePicker,
			// mTag,
			// mSwitch
		},
		props: {
			item: {},
			callback: Function,
		},
		setup() {
			return {}
		},
	})
</script>
