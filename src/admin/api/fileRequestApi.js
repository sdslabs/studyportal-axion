import { axiosInstance } from '../../api/axiosInstance';
import $ from 'jquery';

function getFileRequests(token) {
  return axiosInstance
    .get('/admin/filerequests/', {
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

function approveFileRequest(id, token) {
  return axiosInstance
    .put(
      '/admin/filerequests',
      { request: id, status: 2 },
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

function uploadFile(id, file, name, filetype, token) {
  const status = 3;
  return $.ajax({
    method: 'PUT',
    url: 'http://localhost:8005/api/v1/admin/filerequests',
    data: { request: id, status: status, file: file, name: name, filetype: filetype },
    dataType: 'json',
    beforeSend(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res;
  });
}

function rejectFileRequest(id, token) {
  return axiosInstance
    .delete(
      '/admin/filerequests',
      { request: id },
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
export { getFileRequests, approveFileRequest, uploadFile, rejectFileRequest };