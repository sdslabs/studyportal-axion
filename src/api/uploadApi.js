import { axiosInstance } from './axiosInstance';

function uploadFile(user, course, name, filetype, file) {
  return axiosInstance.post('/uploads', { user, course, name, filetype, file })
  .then((response) => {
    return response;
  })
}

export {
  uploadFile
}
