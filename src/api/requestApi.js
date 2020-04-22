import { axiosInstance } from './axiosInstance';
import $ from "jquery";

function getFileRequestsByUser(token) {
  return axiosInstance.get(`/filerequests`,
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function requestFiles(token, filetype, title, course) {
  const status = 1;
  return $.ajax({
    method: "POST",
    url: "http://localhost:8005/api/v1/filerequests",
    data: { filetype, status, title, course },
    dataType: "json",
    beforeSend (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
  }).done((res) => {
    return res;
  });
}

function requestCourse(token, department, course, code) {
  const status = 1;
  return $.ajax({
    method: "POST",
    url: "http://localhost:8005/api/v1/courserequests",
    data: { status, department, course, code },
    dataType: "json",
    beforeSend (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
  }).done((res) => {
    return res;
  });
}

function updateFileRequestStatus(request,status) {
  return axiosInstance.put('/filerequests', { request,status })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  });
}

function updateCourseRequestStatus(request,status) {
  return axiosInstance.put('/courserequests', { request,status })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  });
}

export {
  getFileRequestsByUser,
  requestFiles,
  requestCourse,
  updateFileRequestStatus,
  updateCourseRequestStatus
};
