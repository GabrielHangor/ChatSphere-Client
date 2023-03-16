import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const accessToken = ref<string | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  return { user, isLoggedIn, accessToken };
});
