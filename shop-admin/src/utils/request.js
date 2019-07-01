import axios from 'axios'

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
		return response
	},
	error => {
        console.log(error)
		return Promise.reject(error)
    }
)
export default service