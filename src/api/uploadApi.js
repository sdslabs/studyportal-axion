import { axiosInstance } from './axiosInstance';

function uploadFiles(files) {
  return axiosInstance.post('/uploads', { files })
  .then((response) => {
    return response;
  })
}

export {
  uploadFiles
}
