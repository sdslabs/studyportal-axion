import { axiosInstance } from '../../api/axiosInstance';
import $ from 'jquery';

function getFileRequests(token) {
  return axiosInstance
    .get('filerequests/', {
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

function approveFileRequest(id) {
  return axiosInstance
    .put('filerequests', { request: id, status: 2 })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function uploadFile(id, file, name, filetype) {
  const status = 3;
  return $.ajax({
    method: 'PUT',
    url: 'http://localhost:8005/api/v1/admin/filerequests',
    data: { request: id, status: status, file: file, name: name, filetype: filetype },
    dataType: 'json',
  }).done((res) => {
    console.log(res);
    return res;
  });
}

function rejectFileRequest(id) {
  return axiosInstance
    .delete('filerequests', { request: id })
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
