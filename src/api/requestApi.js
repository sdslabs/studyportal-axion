import { axiosInstance } from './axiosInstance';

function getRequestsByUser(token) {
  return axiosInstance.get(`/requests`,
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

function requestFiles(token,filetype,title,course) {
  const status = 1;
  return axiosInstance.post('/requests', { filetype,status,title,course },
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

function updateRequestStatus(request,status) {
  return axiosInstance.put('/requests', { request,status })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

export {
  getRequestsByUser,
  requestFiles,
  updateRequestStatus
}
