import { axiosInstance } from 'api/axiosInstance'

function getDepartmentsList() {
    return axiosInstance.get('/departments/?format=json')
    .then((response) => {
        const res = JSON.parse(response.request.response)
        return res
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

function getDepartmentInfoByAbbr(department) {
    return axiosInstance.get(`/departments/?department=${department}`)
    .then((response) => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export {
   getDepartmentsList,
   getDepartmentInfoByAbbr
}
