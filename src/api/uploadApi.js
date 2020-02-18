import { axiosInstance } from './axiosInstance';

function getUploadsByUser(token) {
  return axiosInstance.get(`/uploads`,
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

function uploadFile(token, course, name, filetype, file) {
  return axiosInstance.post('/uploads', { course, name, filetype, file },
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
  .then((response) => {
    return response;
  })
}

export {
  getUploadsByUser,
  uploadFile
}
