import Axios from 'axios';

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL
};

const instance = Axios.create(baseConfig);
const publicInstance = Axios.create(baseConfig);

instance.interceptors.request.use(
  (config) => {
    return { ...config };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const httpClient = instance;
export const publicHttpClient = publicInstance;
