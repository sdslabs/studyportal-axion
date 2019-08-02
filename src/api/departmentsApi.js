const axios = require('axios')
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    baseURL: 'http://nexus.sdslabs.local',
  });
  

export default function departmentApi() {
    return axiosInstance.get('/api/v1/departments/?format=json').then(function(response) {
        const res = JSON.parse(response.request.response)
        return res
    })
} 