import request from '@/utils/request'

export const UPLOAD_API = "";

export function uploadFile(data, name, size, uploadUrl) {
    return request({
        url: uploadUrl + '?fid=' + name + '&size=' + size,
        method: 'post',
        headers: { 'Content-Type': 'application/octet-stream' },
        data
    })
}
