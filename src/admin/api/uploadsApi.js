import { axiosInstance } from '../../api/axiosInstance';

function getUploads(token) {
  return axiosInstance
    .get('uploads/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
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
