import { axiosInstance } from './axiosInstance';

function loginUser(token) {
  return axiosInstance.get('/users', { headers: { 'Authorization' : `Bearer ${token}` } })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    console.log(res)
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

export {
  loginUser
}
