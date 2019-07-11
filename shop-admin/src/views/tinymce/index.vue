<template>
    <div class="tinymce">
    	<Tinymce ref="editor" v-model="editorContent" />
    </div>
</template>
<script>
	import Tinymce from '@/components/Tinymce'
	export default {
		name: "tinymce",
		data() {
			return {
				editorContent: ""
			}
		},
		computed: {
		},
		mounted() {
		},
		methods: {
		},
		components: {
			Tinymce
		},
	}
</script>
<style lang="scss" scoped>
</style>