import { axiosInstance } from './axiosInstance';

function uploadFiles(files) {
  return axiosInstance.post('/api/v1/uploads', { files })
  .then((response) => {
    return response;
  })
}

export {
  uploadFiles
}
