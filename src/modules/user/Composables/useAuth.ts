import { ref } from 'vue';

export const useAuth = () => {
  const data = ref();

  return { data };
};
