import { axiosInstance } from 'api/axiosInstance'

function getFilesByCourse(id) {
    return axiosInstance.get(`/files/?course=${id}&filetype=null&format=json`)
    .then((response) => {
        const res = JSON.parse(response.request.response)
        return res
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

function getFilesByType(id,type) {
  return axiosInstance.get(`/files/?course=${id}&filetype=${type}&format=json`)
  .then((response) => {
    const res = JSON.parse(response.request.response)
    return res
  })
  .catch((error) => {
    return Promise.reject(error)
  })
}

export {
  getFilesByCourse,
  getFilesByType
}
