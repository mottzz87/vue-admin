<!--
 * Author       : Zhao Dongxu
 * Desc         : 表单基础组件-上传组件
 * Date         : 2020-11-27 13:37:50
 * LastEditors  : Zhao Dongxu
 * LastEditTime : 2020-12-07 09:55:49
 * FilePath     : \src\components\form\base\mUpload.vue
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
				<img v-if="imgUrl" :src="IMG_URL + imgUrl" :style="imgStyle" class="avatar" />
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
			<el-dialog :visible.sync="dialogVisible">
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
	import { IMG_URL } from '@/config/global'
	import { upload } from '@/api/common'

	export default {
		name: 'mUpload',
		components: {},
		model: {
			prop: 'value',
		},
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
					}
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
				default: upload,
			},
			buttonlabel: {
				// 按钮名称
				type: String,
				default: '导入',
			},
		},
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				IMG_URL,
				imgUrl: '',
				fileList: [],
			}
		},
		watch: {
			value: {
				handler(newVal, old) {
					console.log(newVal)
					this.imgUrl = newVal
				},
				deep: true,
				immediate: true,
			},
			files: {
				handler(newVal, old) {
					this.fileList = newVal.map((item) => ({
						...item,
						url: item.url.indexOf(IMG_URL) === 0 ? item.url : IMG_URL + item.url,
					}))
				},
				immediate: true,
			},
		},
		methods: {
			beforeFileUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < this.maxSize
				if (!isLt2M) {
					this.$message.error(
						`${['file', 'import'].indexOf(this.type) !== -1 ? '文件' : '图片'}大小不能超过 ${this.maxSize}MB!`
					)
				}
				return isLt2M
			},
			uploadFile(file) {
				const formData = new FormData()
				formData.append('file', file.file)
				return this.api(formData)
			},
			handleRemove(file, fileList) {
				this.fileList = fileList
				this.$emit('update:files', fileList)
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url
				this.dialogVisible = true
			},
			onSuccess({ data }, file, fileList) {
				if (this.success) {
					// 有回调函数执行回调
					this.success(data)
				} else {
					// 无回调默认
					if (!this.type) {
						// 单张图片
						this.imgUrl = data
						// this.$emit('update:src', data)
					} else {
						file.url = data
						this.$emit('update:files', fileList)
					}
				}
			},
			handleExceed(file) {
				this.$message.error(
					`上传${['file', 'import'].indexOf(this.type) !== -1 ? '文件' : '图片'}数量不能超过${this.limit}!`
				)
			},
		},
	}
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

	.picture-card {
		/deep/ .el-upload--picture-card {
			width: 80px !important;
			height: 80px !important;
		}
		/deep/ .el-upload {
			width: 80px;
			height: 80px;
			line-height: 80px;
		}
		/deep/ .el-upload-list--picture-card .el-upload-list__item {
			width: 80px;
			height: 80px;
			line-height: 80px;
		}
		/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
			width: 80px;
			height: 80px;
			line-height: 80px;
		}
		/deep/ .el-upload-list--picture-card .el-upload-list__item-status-label {
			right: -7.5px;
			top: -3px;
			width: 20px;
			height: 12px;
		}
		/deep/ .avatar {
			width: 80px;
			height: 80px;
		}
	}
</style>
