import request from '@/utils/request'

// export const UPLOAD_API = "/api/v4/sys/file/local/upload";
export const UPLOAD_API = "";

/**
 * 上传文件
 */
export function uploadFile(data, name, size, uploadUrl) {
    return request({
        url: uploadUrl + '?fid=' + name + '&size=' + size,
        method: 'post',
        headers: { 'Content-Type': 'application/octet-stream' },
        data
    })
}
