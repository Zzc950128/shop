<template>
	<div class="tinymce-component">
		<div class="tinymce-container tinymce-editor-container" :class="{'tinymce-fullscreen': fullscreen}">
			<textarea class="tinymce-textarea" :id="tinymceId"></textarea>
		</div>
	</div>
</template>
<script>
	import plugins from './plugins'
	import toolbar from './toolbar'
	export default {
		name: "tinymce-component",
		props: {
			value: {
				type: String,
				default: ''
			},
		},
		data() {
			window.vue = this
			let handler = this
			return {
      			hasInit: false,
				hasChange: false,
				fullscreen: false,
				tinymceId: 'vue-tinymce-' + +new Date(),
			}
		},
		computed: {
		},
		mounted() {
			this.initTinymce()
		},
		destroyed() {
			this.destroyTinymce()
		},
		methods: {
			initTinymce() {
				const _this = this
				window.tinymce.init({
					selector: `#${this.tinymceId}`,
					height: 350,
					body_class: 'panel-body ',
					object_resizing: false,
					toolbar: toolbar,
        			menubar: {default: 'file edit insert view format table'},
        			plugins: plugins,
					end_container_on_empty_block: true,
					powerpaste_word_import: 'clean',
					code_dialog_height: 450,
        			code_dialog_width: 1000,
        			advlist_bullet_styles: 'square',
        			advlist_number_styles: 'default',
        			// imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        			default_link_target: '_blank',
        			link_title: false,
        			nonbreaking_force_tab: true,
					init_instance_callback: editor => {
						if (_this.value) {
							editor.setContent(_this.value)
						}
						_this.hasInit = true
						editor.on('NodeChange Change KeyUp SetContent', () => {
							this.hasChange = true
							this.$emit('input', editor.getContent())
						})
					},
					setup(editor) {
						editor.on('FullscreenStateChanged', (e) => {
							_this.fullscreen = e.state
						})
					}
				})
			},
			destroyTinymce() {
				if (window.tinymce.get(this.tinymceId)) {
					window.tinymce.get(this.tinymceId).destroy()
				}
			},
			getContent() {
				window.tinymce.get(this.tinymceId).getContent()
			},
			setContent(value) {
				window.tinymce.get(this.tinymceId).setContent(value)
			},
		},
		components: {
		},
	}
</script>
<style lang="scss" scoped>
	.tinymce-container {
		position: relative;
		.tinymce-textarea {
			visibility: hidden;
			z-index: -1;
		}
	}
</style>