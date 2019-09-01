/* eslint-disable prefer-arrow-callback */
import { axiosInstance } from 'api/axiosInstance'

export default function departmentApi() {
    return axiosInstance.get('/api/v1/departments/?format=json').then(function(response) {
        const res = JSON.parse(response.request.response)
        return res
    })
}
