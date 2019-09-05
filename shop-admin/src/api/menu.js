import request from '@/utils/request'

const GET_MENUS = "/api/menus/get"; // 用户登录

// 用户登录
export function getMenus(params) {
    return request({
        url: GET_MENUS,
        method: 'get',
        params
    })
}