import { axiosInstance } from 'api/axiosInstance';

function getSearchResults(query) {
    return axiosInstance.get(`/search/?q=${query}&format=json`)
        .then((response) => {
            const res = JSON.parse(response.request.response);
            return res;
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export {
    getSearchResults
};
