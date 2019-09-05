import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import Login from '@/views/login/index'
// import Register from '@/views/login/index'
import notFound from '@/views/not-found/index'
import Home from '@/views/home/index'
import Goods from '@/views/goods/index'

import Cms from '@/views/cms/index'
import Editor from '@/views/editor/index'
import Tinymce from '@/views/tinymce/index'
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
				},
				{
					path: '/goods',
					name: 'Goods',
					component: Goods
				},
				{
					path: '/cms',
					name: 'Cms',
					component: Cms
				},
				{
					path: '/editor',
					name: 'Editor',
					component: Editor
				},
				{
					path: '/tinymce',
					name: 'Tinymce',
					component: Tinymce
				}
			],
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Login
		},
		{
			path: '/notFound',
			name: 'notFound',
			component: notFound
		}
	]
})
