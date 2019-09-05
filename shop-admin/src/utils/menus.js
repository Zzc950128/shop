export const initMenu = (menuList) => {
    if (!menuList || menuList.length == 0) {
        Message.error('initMenu failed, please login again')
        return
    }
    let menus = [] // 菜单
    menuList.forEach(item => {
        if (item.type == 'menu') {
            menus.push(item);
        }
    })
    menus = deepCopy(menus)
    menus = transformTree(menus);
    menus = menus.filter((item) => {
        return item.parentId == 0
    })
    menus = menus.sort(compare("sort"))
    menus.forEach(item => {
        if(item.children) {
            item.children = item.children.sort(compare("sort"))
        }
    })
    // console.log(menus)
    menus.unshift({
        name: "首页",
        route: "/dashboard"
    })
    store.commit('SET_MENUS', menus);
}
// 初始化路由
export const initRouter = (router, menuList) => {
        if (!menuList || menuList.length == 0) {
            Message.error('initRouter failed, please login again')
            return
        }
        let routers = []; // 路由
        routers = deepCopy(store.getters.breadcrumb)
        routers = transformTree(routers);
        routers.forEach((parent) => {
            getChildRouters(parent, 1)
        })
        routers = formatRoutes(routers);
        routers.push(unfound);
        router.addRoutes(routers);
        store.commit('SET_ROUTERS', routers);
}
// 获取子路由
function getChildRouters(parent, lev, firstParent) {
    let children = parent.children
    if (lev == 1) {
        firstParent = parent
    }
    if (lev > 2) {
        firstParent.children.push(parent)
    }
    if (lev >= 2) {
        parent.children = null
    }
    if (!children) {
        return
    }
    for (let i in children) {
        let item = children[i]
        getChildRouters(item, lev + 1, firstParent)
    }
}
