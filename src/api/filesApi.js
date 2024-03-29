import { axiosInstance } from 'api/axiosInstance';

function getFilesByCourse(id) {
  return axiosInstance
    .get(`/files`, { params: { course: id, filetype: 'null', format: 'json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.files;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getFilesByType(id, type) {
  return axiosInstance
    .get(`/files`, { params: { course: id, filetype: type, format: 'json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.files;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getFileById(id) {
  return axiosInstance
    .get(`/files`, { params: { fileid: id, format: 'json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.files;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function downloadFiles(id) {
  return axiosInstance
    .put(`/files`, { id, downloads: 'true' })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { getFilesByCourse, getFilesByType, getFileById, downloadFiles };
