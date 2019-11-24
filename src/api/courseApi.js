import { axiosInstance } from 'api/axiosInstance'

function getCourseByDepartment(id) {
    return axiosInstance.get(`/api/v1/courses/?department=${id}&course=null&format=json`)
    .then((response) => {
        const res = JSON.parse(response.request.response)
        return res
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

function getCourseInfoByCode(id,code) {
    return axiosInstance.get(`/api/v1/courses/?department=${id}&course=${code}&format=json`)
    .then((response) => {
      const res = JSON.parse(response.request.response)
      return res[0]
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export {
  getCourseByDepartment,
  getCourseInfoByCode
}
