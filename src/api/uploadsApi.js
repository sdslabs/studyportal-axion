import { axiosInstance } from './axiosInstance';

function getUploads(token) {
  return axiosInstance
    .get('/admin/uploads/', {
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

function approveUpload(id, token) {
  return axiosInstance
    .put(
      '/admin/uploads',
      { file_id: id, status: 2 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function addUpload(id, token) {
  return axiosInstance
    .put(
      '/admin/uploads',
      { upload: id, status: 3 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function deleteUpload(id, token) {
  return axiosInstance
    .delete('/admin/uploads', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        upload: id,
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

export { getUploads, approveUpload, addUpload, deleteUpload };
