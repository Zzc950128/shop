import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import Home from '@/views/home/index'
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
	]
})
