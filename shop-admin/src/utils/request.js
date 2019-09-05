import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 60000,
});

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
	response => {
        const res = response.data
        if (res.code && res.code !== 0 && res.msg) {
          Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          });
        }
        if(res.code && res.code == -1) {
            router.push({
                path: "/login"
            });
        }
		return response
	},
	error => {
        console.log(error)
		return Promise.reject(error)
    }
)
export default service