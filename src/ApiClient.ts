import axios, { AxiosError } from 'axios';
import AuthService from '@/modules/user/services/AuthService';

const baseURL =
  import.meta.env.MODE === 'production'
    ? 'https://chatsphere-server-production.up.railway.app/'
    : '/api';

const ApiClient = axios.create({ baseURL });

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) AuthService.logout();

    return Promise.reject(error);
  }
);

export default ApiClient;
