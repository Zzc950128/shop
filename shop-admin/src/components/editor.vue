<template>
	<div class="editor">
		<el-upload
            class="uploader"
            ref="uploader"
            accept="image/*"
            action=""
            :show-file-list="false"
            :before-upload="beforeUpload"
            :http-request="uploadImgFile"
            :on-success="uploadOnSuccess"
            :on-error="uploadOnError"
            :auto-upload="true"
        ></el-upload>
        <div v-loading="uploadLoading">
			<quill-editor ref="cmsEditor"
				v-model="editorContent"
				:options="editorOptions"
				@blur="onEditorBlur($event)"
				@focus="onEditorFocus($event)"
				@ready="onEditorReady($event)">
			</quill-editor>
        </div>
	</div>
</template>
<script>
	import { editorConfig } from "@/utils/editorConfig"
	import { uploadFile } from "@/api/upload"

	export default {
		name: "editor",
		props: {
			content: {
	            type: String,
	            required: true
	        },
	        uploadUrl: {
	        	type: String,
	            required: true
	        },
	        config: {
				type: Array,
	            required: false
	        },
		},
		data() {
			window.vue = this
			let handler = this
			let config = null
			return {
				uploadLoading: false,
				editorContent: this.content,
				editorOptions: {
					theme: 'snow',
					placeholder: '请输入内容...',
					modules: {
						toolbar: {
							container: this.config ? this.config : editorConfig,
							handlers: {
								'image': function (value) {
									if (value) {
										document.querySelector('.uploader input').click()
									} else {
										this.editor.format('image', false);
									}
								}
							}
						},
						// imageResize: {
						// 	displayStyles: {
						// 		backgroundColor: 'black',
						// 		border: 'none',
						// 		color: 'white'
						// 	},
						// }
					}
				},
			}
		},
		watch: {
	        content(val) {
	            this.editorContent = val;
	        },
	        editorContent(val) {
	        	this.$emit("editorContentChange", val);
	        }
	    },
		computed: {
			editor() {
				return this.$refs.cmsEditor.quill
			}
		},
		methods: {
			beforeUpload(file) {
				this.uploadLoading = true
                const isPic = (file.type.indexOf('image') > -1);
                const isLow = file.size / 1024 / 1024 < 10;
                if (!isPic) {
                    this.$message.error('图片格式不正确!');
                }
                if (!isLow) {
                    this.$message.error('图片大小不得超过10兆!');
                }
                return isPic && isLow;
			},
			uploadOnSuccess(fid, file){
				console.log("——————————success——————————")
				console.log("上传成功")
				let quill = this.editor
				let length = quill.getSelection().index;
				// quill.insertEmbed(length, 'image', this.fileUrl+"/"+fid+"&isOrigin=true")
				quill.insertEmbed(length, 'image', "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg")
				quill.setSelection(length + 1)
				this.$message.success("上传成功")
				// setTimeout(() => {
				this.uploadLoading = false
				// }, 2000)
			},
			uploadOnError(e, file) {
				console.log("——————————error——————————")
				console.log("上传失败")
				this.$message.error("上传失败")
				// setTimeout(() => {
				this.uploadLoading = false
				// }, 2000)
			},
			uploadImgFile(params) {
				console.log("------------");
				console.log(params)
				let date = new Date().getTime();
				let suffix = params.file.name.slice(params.file.name.lastIndexOf('.'))
				let fid = this.$md5((params.file.lastModified+"").substr(0,10)+"_"+params.file.size+"_"+params.file.name+'_'+date)+suffix;
				uploadFile(
					params.file,
					fid,
					params.file.size,
					this.uploadUrl
				).then(res => {
					if ( res.data.status == 0 ) {
						params.onSuccess(res.data.data.fid);
					} else {
						params.onError();
					}
				}).catch(err => {
					params.onSuccess();
					console.log(err);
				});
			},
			onEditorReady(editor) {
				// console.log('editor ready!', editor)
			},
			onEditorFocus(editor) {
				// console.log('editor focus!', editor)
			},
			onEditorBlur(editor) {
				// console.log('editor blur!', editor)
			},
		},
	}
</script>