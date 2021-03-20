import { axiosInstance } from './axiosInstance';
import { CONFIG } from 'config/config';
import $ from 'jquery';

function getFileRequestsByUser(token) {
  return axiosInstance
    .get(`/filerequests`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.requests;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getCourseRequestsByUser(token) {
  return axiosInstance
    .get(`/courserequests`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.requests;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function requestFiles(token, filetype, title, course) {
  const status = 1;
  return $.ajax({
    method: 'POST',
    url: `${CONFIG.nexusRoot}/filerequests`,
    data: { filetype, status, title, course },
    dataType: 'json',
    beforeSend(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    },
  }).done((res) => {
    return res;
  });
}

function requestCourse(token, department, course, code) {
  const status = 1;
  return $.ajax({
    method: 'POST',
    url: `${CONFIG.nexusRoot}/courserequests`,
    data: { status, department, course, code },
    dataType: 'json',
    beforeSend(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    },
  }).done((res) => {
    return res;
  });
}

export { getFileRequestsByUser, getCourseRequestsByUser, requestFiles, requestCourse };
