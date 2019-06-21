import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Home from '@/components/home'

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
