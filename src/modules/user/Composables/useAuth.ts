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
          error.value = e.response?.data.message;
        }
      } finally {
        isLoading.value = false;
      }
    };
  };

  const signUp = handleServiceCall(UserService.createUser);

  return { isLoading, error, signUp };
};
