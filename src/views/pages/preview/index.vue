<template>
	<div class="preview-container">
		<el-card shadow="hover" header="element-plus 大图预览">
			<el-image style="width: 100px; height: 100px; border-radius: 5px" :src="url" :preview-src-list="srcList" title="点击查看大图预览"> </el-image>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
export default {
	name: 'pagesPreview',
	setup() {
		const state = reactive({
			url: 'https://gitee.com/vaned/admin-cdn/raw/master/v3/user/photo.jpg',
			srcList: ['https://gitee.com/vaned/admin-cdn/raw/master/v3/user/photo.jpg'],
		});
		return {
			...toRefs(state),
		};
	},
};
</script>
