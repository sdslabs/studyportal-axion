import { axiosInstance } from 'api/axiosInstance'

function departmentApi() {
    return axiosInstance.get('/api/v1/departments/?format=json').then((response) => {
        const res = JSON.parse(response.request.response)
        return res
    })
}

function singleDepartmentApi(department) {
    return axiosInstance.get(`/api/v1/departments/?department=${department}`).then((response) => {
      const res = JSON.parse(response.request.response)
      return res[0]
    })
}

export {
   departmentApi,
   singleDepartmentApi
}
