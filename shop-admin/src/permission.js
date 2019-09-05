import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { initMenu, initRouter } from "@/utils/menus"
import { initUser } from "@/utils/user"
import { getMenus } from "@/api/menu"
import { getUserInfo } from "@/api/user"

const whiteList = ['/notFound', '/login', '/register']; // 不重定向白名单
router.beforeEach((to, from, next) => {
    if(to.hasOwnProperty('meta') && to.meta.hasOwnProperty('name') && to.meta.name) {
        document.title = `SHOP管理系统-${to.meta.name}`
    }
    NProgress.start();
    if (Cookies.get("token")) {
        if (!store.getters.refreshFlag) {
            store.dispatch('refreshViewRouter', true); // 用于判断刷新的标志
            getMenus().then(res => {
                if(res.data.code == 0) {
                    initMenu(res.data.data)
                    initRouter(res.data.data)
                }
            }).catch(err => {
                console.log(err)
            })
            getLoginInfo().then(res => {
                if(res.data.code == 0) {
                    initUser(res.data.data)
                }
            }).catch(err => {
                console.log(err)
            })
            next({...to, replace: true })
        } else {
            next()
        }
    }else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        }else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})