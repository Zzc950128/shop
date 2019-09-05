import request from '@/utils/request'

const LOGIN = "/api/login"; // 用户登录
const REGISTER = "/api/user/register"; // 用户登录

// 用户登录
export function userLogin(data) {
    return request({
        url: LOGIN,
        method: 'post',
        data
    })
}

// 用户注册
export function userRegister(data) {
    return request({
        url: REGISTER,
        method: 'post',
        data
    })
}
