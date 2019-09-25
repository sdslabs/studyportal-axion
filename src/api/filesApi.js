import { axiosInstance } from 'api/axiosInstance'

export default function getFilesByCourse(id) {
    return axiosInstance.get(`/api/v1/files/?course=${id}&format=json`).then((response) => {
        const res = JSON.parse(response.request.response)
        return res
    })
}
