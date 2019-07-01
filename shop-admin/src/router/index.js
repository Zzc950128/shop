import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import Home from '@/views/home/index'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: "/home",
			component: Layout,
			children: [
				{
					path: '/home',
					name: 'Home',
					component: Home
				}
			],
		},
	]
})
