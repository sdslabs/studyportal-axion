import { axiosInstance } from './axiosInstance';

function getUploads() {
  return axiosInstance
    .get('uploads/?format=json')
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function approveUpload(id) {
  return axiosInstance
    .put('uploads', { file_id: id, status: 2 })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function addUpload(id) {
  return axiosInstance
    .put('uploads', { file_id: id, status: 3 })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function deleteUpload(id) {
  return axiosInstance
    .delete('uploads', { request: id })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { getUploads, approveUpload, addUpload, deleteUpload };
