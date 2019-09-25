import { axiosInstance } from 'api/axiosInstance'

function getDepartmentsList() {
    return axiosInstance.get('/api/v1/departments/?format=json').then((response) => {
        const res = JSON.parse(response.request.response)
        return res
    })
}

function getDepartmentInfoByAbbr(department) {
    return axiosInstance.get(`/api/v1/departments/?department=${department}`).then((response) => {
      const res = JSON.parse(response.request.response)
      return res[0]
    })
}

export {
   getDepartmentsList,
   getDepartmentInfoByAbbr
}
