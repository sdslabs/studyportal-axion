import { axiosInstance } from '../../api/axiosInstance';
import $ from 'jquery';

function getCourseRequests(token) {
  return axiosInstance
    .get('courserequests/', {
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

function approveCourseRequest(id) {
  return axiosInstance
    .put('courserequests', { request: id, status: 2 })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function addCourse(id) {
  const status = 3;
  return $.ajax({
    method: 'PUT',
    url: 'http://localhost:8005/api/v1/admin/courserequests',
    data: { request: id, status: status },
    dataType: 'json',
  }).done((res) => {
    console.log(res);
    return res;
  });
}

function rejectCourseRequest(id) {
  return axiosInstance
    .delete('courserequests', { request: id })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { getCourseRequests, approveCourseRequest, addCourse, rejectCourseRequest };
