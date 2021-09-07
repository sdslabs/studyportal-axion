import { axiosInstance } from 'api/axiosInstance';

function getSearchResults(query) {
  return axiosInstance
    .get(`/search`, { params: { q: query, format: 'json' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getSearchCourseResults(query, dept, user) {
  return axiosInstance
    .get(`/filtercourse`, { params: { q: query, format: 'json', dept: dept, user: user } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { getSearchResults, getSearchCourseResults };
