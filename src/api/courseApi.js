import { axiosInstance } from 'api/axiosInstance';

function getCourseByDepartment(id) {
  return axiosInstance
    .get(`/courses`, { params: { department: id, course: 'null', format: 'json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.courses;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getCourseInfoByCode(id, code) {
  return axiosInstance
    .get(`/courses`, { params: { department: id, course: code, format: 'json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.courses[0];
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { getCourseByDepartment, getCourseInfoByCode };
