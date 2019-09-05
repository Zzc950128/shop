<template>
	<div class="menu-item">
		<el-submenu :index="item.route">
			<template slot="title">
				<i :class="'el-icon-'+item.icon" v-if="item.icon"></i>
				<span slot="title">{{ item.name }}</span>
			</template>
			<el-menu-item v-if="!item.children" @click="clickHandle(item.route)" :index="item.route">
		    	<i :class="'el-icon-'+item.icon" v-if="item.icon"></i>
				<span slot="title">{{ item.name }}</span>
	    	</el-menu-item>
		</el-submenu>
	    <el-menu-item v-if="!item.children" @click="clickHandle(item.route)" :index="item.route">
	    	<i :class="'el-icon-'+item.icon" v-if="item.icon"></i>
			<span slot="title">{{ item.name }}</span>
	    </el-menu-item>
	</div>
</template>
<script>
	export default {
		name: "menu-item",
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
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
	.menu-item {
	}
</style>