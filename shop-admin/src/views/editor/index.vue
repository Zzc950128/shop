<template>
	<div class="editor">
		<ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
	</div>
</template>
<script>
	import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
	export default {
		name: "editor",
		data() {
			window.vue = this
			let handler = this
			return {
				editor: ClassicEditor,
				editorData: '<p>Content of the editor.</p><br><img src="https://cdn.emojics.com/v1.0.0/emojis/like/symbols/1f60a-color.png"></>',
				editorConfig: {},
			}
		},
		computed: {
		},
		methods: {
		},
		components: {
		},
	}
</script>
<style lang="scss" scoped>
</style>