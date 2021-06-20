import { axiosInstance } from './axiosInstance';
import { CONFIG } from 'config/config';
import $ from 'jquery';

function getCourseRequests(token) {
  return axiosInstance
    .get('/admin/courserequests/', {
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

function approveCourseRequest(id, token) {
  return axiosInstance
    .put(
      '/admin/courserequests',
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
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function addCourse(id, token) {
  const status = 3;
  return $.ajax({
    method: 'PUT',
    url: `${CONFIG.nexusRoot}/admin/courserequests`,
    data: { request: id, status: status },
    dataType: 'json',
    beforeSend(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    },
  }).done((res) => {
    return res;
  });
}

function rejectCourseRequest(id, token) {
  return axiosInstance
    .delete('/admin/courserequests', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        request: id,
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

export { getCourseRequests, approveCourseRequest, addCourse, rejectCourseRequest };
