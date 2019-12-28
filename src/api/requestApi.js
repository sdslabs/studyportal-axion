import { axiosInstance } from './axiosInstance';

function requestFiles(user,filetype,title,course) {
  const status = 1;
  return axiosInstance.post('/api/v1/requests', { user,filetype,status,title,course })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

function updateRequestStatus(request,status) {
  return axiosInstance.put('/api/v1/requests', { request,status })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

export {
  requestFiles,
  updateRequestStatus
}
