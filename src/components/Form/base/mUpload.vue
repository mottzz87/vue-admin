<!--
 * Author       : Zhao Dongxu
 * Desc         : 表单基础组件-上传组件
 * Date         : 2020-11-27 13:37:50
 * @LastEditors: Vane
 * @LastEditTime: 2021-06-22 02:45:48
 * @FilePath: \vue-admin\src\components\Form\base\mUpload.vue
 -->
<!--单张图片上传-->
<!--<Upload :src.sync=""></Upload>-->
<!--导入-->
<!--<Upload type="import" :api="api" :success="cb"></Upload>-->
<!--多张图片上传-->
<!--<Upload :files.sync="" type="picture" :showFileList="true"></Upload>-->
<!--文件上传-->
<!--<Upload :files.sync="" type="file" :showFileList="true"></Upload>-->

<template>
	<span>
		<template v-if="!type">
			<!--上传头像-->
			<el-upload
				:disabled="disabled"
				class="avatar-uploader"
				accept="image/*"
				action
				:show-file-list="false"
				:http-request="uploadFile"
				:on-success="onSuccess"
				:before-upload="beforeFileUpload"
			>
				<img v-if="imgUrl" :src="123" :style="imgStyle" class="avatar" />
				<i v-else class="el-icon-plus avatar-uploader-icon" :style="imgStyle" />
			</el-upload>
		</template>
		<!--导入-->
		<template v-if="type === 'import'">
			<el-upload
				:disabled="disabled"
				class="avatar-uploader"
				:accept="accept || 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
				action
				:on-success="onSuccess"
				:show-file-list="showFileList"
				:http-request="uploadFile"
				:before-upload="beforeFileUpload"
			>
				<el-button size="medium" type="primary" class="m-r-15">{{ buttonlabel }}</el-button>
			</el-upload>
		</template>
		<!--上传多张图片-->
		<template v-if="type === 'picture'">
			<el-upload
				ref="upload"
				action
				:disabled="disabled"
				accept="image/*"
				list-type="picture"
				multiple
				:show-file-list="showFileList"
				:limit="limit"
				:on-exceed="handleExceed"
				:http-request="uploadFile"
				:file-list="fileList"
				:before-upload="beforeFileUpload"
				:on-remove="handleRemove"
				:on-success="onSuccess"
			>
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
		</template>
		<!--上传多张图片-->
		<template v-if="type === 'picture-card'">
			<el-upload
				ref="upload"
				class="picture-card"
				action
				:disabled="disabled"
				accept="image/*"
				list-type="picture-card"
				multiple
				:show-file-list="showFileList"
				:limit="limit"
				:on-exceed="handleExceed"
				:on-preview="handlePictureCardPreview"
				:http-request="uploadFile"
				:file-list="fileList"
				:before-upload="beforeFileUpload"
				:on-remove="handleRemove"
				:on-success="onSuccess"
			>
				<i class="el-icon-plus avatar-uploader-icon" :style="imgStyle" />
			</el-upload>
			<el-dialog v-model:visible="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt />
			</el-dialog>
		</template>
		<!--上传多个文件-->
		<template v-if="type === 'file'">
			<el-upload
				ref="upload"
				class="upload-demo"
				name="upload_name"
				action
				:disabled="disabled"
				multiple
				:show-file-list="showFileList"
				:limit="limit"
				:on-exceed="handleExceed"
				:http-request="uploadFile"
				:file-list="fileList"
				:before-upload="beforeFileUpload"
				:on-remove="handleRemove"
				:on-success="onSuccess"
			>
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
		</template>
	</span>
</template>

<script lang="ts">
// import { IMG_URL } from '@/config/global';
// import { upload } from '@/api/common';
import { ElMessage, ElMessageBox } from 'element-plus';
import { toRefs, reactive, computed, getCurrentInstance, onMounted } from 'vue';

export default {
	name: 'mUpload',
	components: {},
	// model: {
	// 	prop: 'value',
	// },
	props: {
		value: {
			type: String,
			default: '',
		},
		files: {
			// 上传文件大小
			type: Array,
			default: () => [],
		},
		imgStyle: {
			// 上传图片大小
			type: Object,
			default: () => {
				return {
					width: '80px',
					height: '80px',
				};
			},
		},
		type: {
			// 上传类型
			type: String,
			default: '',
		},
		limit: {
			// 上传数量限制
			type: Number,
			default: 5,
		},
		maxSize: {
			// 上传文件大小限制
			type: Number,
			default: 100,
		},
		accept: {
			// 上传文件类型
			type: String,
			default: '',
		},
		showFileList: {
			// 是否显示已上传文件列表
			type: Boolean,
			default: false,
		},
		disabled: {
			// 是否显示已上传文件列表
			type: Boolean,
			default: false,
		},
		success: {
			// 上传成功回调函数
			type: Function,
			default: null,
		},
		api: {
			// 上传方法
			type: Function,
			default: () => console.log(123),
		},
		buttonlabel: {
			// 按钮名称
			type: String,
			default: '导入',
		},
	},
	// data() {
	// 	return {
	// 		dialogImageUrl: '',
	// 		dialogVisible: false,
	// 		IMG_URL,
	// 		imgUrl: '',
	// 		fileList: [],
	// 	}
	// },
	// watch: {
	// 	value: {
	// 		handler(newVal, old) {
	// 			console.log(newVal)
	// 			this.imgUrl = newVal
	// 		},
	// 		deep: true,
	// 		immediate: true,
	// 	},
	// 	files: {
	// 		handler(newVal, old) {
	// 			this.fileList = newVal.map((item) => ({
	// 				...item,
	// 				url: item.url.indexOf(IMG_URL) === 0 ? item.url : IMG_URL + item.url,
	// 			}))
	// 		},
	// 		immediate: true,
	// 	},
	// },
	emits: ['update:files'],
	setup(props, { emit }) {
		const { value, files, type, limit, maxSize, accept, showFileList, disabled, success, api, buttonlabel } = props;

		console.log(value, files, type, limit, maxSize, accept, showFileList, disabled, success, api, buttonlabel);

		const state: any = reactive({
			dialogImageUrl: '',
			dialogVisible: false,
			// IMG_URL,
			imgUrl: '',
			fileList: [],
		});

		const beforeFileUpload = (file) => {
			const isLt2M = file.size / 1024 / 1024 < maxSize;
			if (!isLt2M) {
				ElMessage.error(`${['file', 'import'].indexOf(type) !== -1 ? '文件' : '图片'}大小不能超过 ${maxSize}MB!`);
			}
			return isLt2M;
		};
		const uploadFile = (file) => {
			const formData = new FormData();
			formData.append('file', file.file);
			console.log(state.fileList, file);
			// return api(formData);
		};
		const handleRemove = (file, fileList) => {
			state.fileList = fileList;
			emit('update:files', fileList);
		};
		const handlePictureCardPreview = (file) => {
			state.dialogImageUrl = file.url;
			state.dialogVisible = true;
		};
		const onSuccess = ({ data }, file, fileList) => {
			// if (this.success) {
			// 	// 有回调函数执行回调
			// 	this.success(data)
			// } else {
			// 	// 无回调默认
			// 	if (!this.type) {
			// 		// 单张图片
			console.log(1111, data, file, fileList);
			state.imgUrl = data;
			// 		// this.$emit('update:src', data)
			// 	} else {
			// 		file.url = data
			// 		this.$emit('update:files', fileList)
			// 	}
			// }
		};
		const handleExceed = (file) => {
			ElMessage.error(`上传${['file', 'import'].indexOf(type) !== -1 ? '文件' : '图片'}数量不能超过${limit}!`);
		};
		return {
			...toRefs(state),
			beforeFileUpload,
			uploadFile,
			handleRemove,
			handlePictureCardPreview,
			onSuccess,
			handleExceed,
		};
	},
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 20px;
	color: #8c939d;
	line-height: 80px;
	text-align: center;
}
.avatar {
	display: block;
}
</style>
