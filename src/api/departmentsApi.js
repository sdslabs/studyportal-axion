const axios = require('axios')
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    baseURL: 'http://127.0.0.1:8000',
  });
  

export default function departmentApi() {
    return axiosInstance.get('/api/v1/departments/?format=json').then(function(response) {
        const res = JSON.parse(response.request.response)
        return res
    })
} 