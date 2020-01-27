import { axiosInstance } from './axiosInstance';

function uploadFile(user, course, name, file) {
  return axiosInstance.post('/uploads', { user, course, name, file })
  .then((response) => {
    return response;
  })
}

export {
  uploadFile
}
