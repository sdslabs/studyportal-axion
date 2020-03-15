import { axiosInstance } from './axiosInstance';
import { setCookie } from 'utils/handleCookies';

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
    setCookie('token',res.token);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

function addCourseForUser(token,course) {
  return axiosInstance.put('/users', { course, action:'add' },
  { headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
  .then((response) => {
    const res = JSON.parse(response.request.response);
    return res;
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

function deleteCourseForUser(token,course) {
  return axiosInstance.put('/users', { course, action:'delete' },
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
  addCourseForUser,
  deleteCourseForUser
}
