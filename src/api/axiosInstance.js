import { CONFIG } from 'config/config'

const axios = require('axios')
export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    baseURL: CONFIG.nexusRoot,
  });

