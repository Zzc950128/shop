<template>
	<div class="menu">
		<h2>menu</h2>
		<el-menu :collapse="isCollapse" mode="vertical">
			<menuItem v-for="(menu, index) in menus" :item="menu" :key="index"></menuItem>
		</el-menu>
	</div>
</template>
<script>
	export default {
		name: "menu",
		data() {
			return {
				isCollapse: false,
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
	.menu {
		width: 180px;
		height: calc(100vh - 70px);
	}
</style>