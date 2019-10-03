import { axiosInstance } from 'api/axiosInstance'

function getFilesByCourse(id) {
    return axiosInstance.get(`/api/v1/files/?course=${id}&filetype=null&format=json`).then((response) => {
        const res = JSON.parse(response.request.response)
        return res
    })
}

function getFilesByType(id,type) {
  return axiosInstance.get(`/api/v1/files/?course=${id}&filetype=${type}&format=json`).then((response) => {
    const res = JSON.parse(response.request.response)
    return res
  })
}

export {
  getFilesByCourse,
  getFilesByType
}
