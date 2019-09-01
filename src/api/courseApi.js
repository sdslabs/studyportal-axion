/* eslint-disable prefer-arrow-callback */
import { axiosInstance } from 'api/axiosInstance'

export default function courseApi(id) {
    return axiosInstance.get(`/api/v1/courses/?department=${id}&format=json`).then(function(response) {
        const res = JSON.parse(response.request.response)
        return res
    })
}
