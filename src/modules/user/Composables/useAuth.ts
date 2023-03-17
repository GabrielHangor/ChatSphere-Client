import { AxiosError } from 'axios';
import { ref } from 'vue';
import UserService from '@/modules/user/Services/UserService';

export const useAuth = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const handleServiceCall = <T>(serviceMethod: (params: T) => Promise<void>) => {
    return async (params: T) => {
      error.value = null;
      try {
        isLoading.value = true;
        await serviceMethod(params);
      } catch (e) {
        if (e instanceof AxiosError) {
          error.value = e.response?.data.message || e.response?.statusText;
        }
      } finally {
        isLoading.value = false;
      }
    };
  };

  const signUp = handleServiceCall(UserService.createUser);

  const signIn = handleServiceCall(UserService.login);

  return { isLoading, error, signUp, signIn };
};

// TODO create an error parser service
