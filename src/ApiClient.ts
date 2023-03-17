import axios, { AxiosError } from 'axios';
import UserService from '@/modules/user/Services/UserService';

const ApiClient = axios.create({ baseURL: '/api' });

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      UserService.logout();
    }

    return Promise.reject(error);
  }
);

export default ApiClient;
