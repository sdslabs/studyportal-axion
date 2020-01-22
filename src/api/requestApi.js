import { axiosInstance } from './axiosInstance';

function requestFiles(user,filetype,title,course) {
  const status = 1;
  return axiosInstance.post('/requests', { user,filetype,status,title,course })
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
  requestFiles,
  updateRequestStatus
}