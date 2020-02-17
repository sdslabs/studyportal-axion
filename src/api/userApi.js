import { axiosInstance } from './axiosInstance';

function loginUserWithToken(token) {
  return axiosInstance.get('/users',
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

function loginUserWithCookie() {
  return axiosInstance.get('/users',
  { headers: {
    'Authorization' : 'Bearer None',
    'Content-Type': 'application/json',
    'Accept': 'application/json' } })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

function addCourseForUser(token,course) {
  return axiosInstance.put('/users', { course },
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}


export {
  loginUserWithToken,
  loginUserWithCookie,
  addCourseForUser
}
