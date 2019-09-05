<template>
	<div class="layout">
		<header class="header">
			<el-avatar :size="60" src="https://empty">
				<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
			</el-avatar>
		</header>
		<section class="content-wrap">
			<menu></menu>
			<div class="content">
				<router-view></router-view>
			</div>
		</section>
		<el-backtop></el-backtop>
	</div>
</template>
<script>
	import menu from './menu'
	export default {
		name: "layout",
		data() {
			return {

			}
		},
		computed: {

		},
		methods: {

		},
		components: {
			menu
		},
	}
</script>
<style lang="scss" scoped>
	.header {
		height: 60px;
		padding: 5px
	}
	.content-wrap {
		position: relative;
	}
	.menus {
		position: absolute;
		width: 180px;
	}
	.content {
		margin-left: 180px;
	}
</style>