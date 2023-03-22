import { AxiosError } from 'axios';
import { ref } from 'vue';

type FetchFunction<T, A extends any[]> = (...args: A) => Promise<T>;

export default function useAsync<T, A extends any[] = []>(cb: FetchFunction<T, A>) {
  const data = ref<T>();
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const fetch = async (...args: A) => {
    error.value = null;

    try {
      isLoading.value = true;
      data.value = await cb(...args);
    } catch (e) {
      if (e instanceof AxiosError) {
        error.value = e.response?.data.message || e.response?.statusText;
        console.error(e);
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, fetch };
}

