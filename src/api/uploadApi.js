import { axiosInstance } from './axiosInstance';
import $ from 'jquery';

function getUploadsByUser(token) {
  return axiosInstance
    .get(`/uploads`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function uploadFile(token, course, name, filetype, file) {
  const status = 1;
  return $.ajax({
    method: 'POST',
    url: 'http://localhost:8005/api/v1/uploads',
    data: { course, name, status, filetype, file },
    dataType: 'json',
    beforeSend(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    },
  }).done((res) => {
    return res;
  });
}

export { getUploadsByUser, uploadFile };
