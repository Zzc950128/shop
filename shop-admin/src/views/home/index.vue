<template>
	<div class="cms-content">
		<h2>CMS内容编辑器</h2>
		<editor :content="editorContent" :uploadUrl="uploadUrl" @editorContentChange="editorContentChange"></editor>
		<h2>CMS内容</h2>
		<p>{{ editorContent }}</p>
	</div>
</template>
<script>
	import editor from "@/components/editor"

	export default {
		name: "cms-content",
		data() {
			window.vue = this
			let handler = this
			return {
				uploadUrl: "",
				editorContent: "",
			}
		},
		computed: {

		},
		methods: {
			editorContentChange(val) {
				this.editorContent = val
			}
		},
		components: {
			editor
		},
	}
</script>
<style lang="scss" scoped>
	
</style>