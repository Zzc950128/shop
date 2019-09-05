import request from '@/utils/request'

const GET_USERINFO = "/api/user/get"; // 用户登录

// 用户登录
export function getUserInfo(params) {
    return request({
        url: GET_USERINFO,
        method: 'get',
        params
    })
}