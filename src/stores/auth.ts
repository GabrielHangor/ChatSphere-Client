import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TUser } from '@/modules/user/models/user.models';


export const useAuthStore = defineStore('auth', () => {
  const user = ref<TUser | null>(null);
  const accessToken = ref<string | null>(null);
  const expiresAt = ref<number | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  return { user, isLoggedIn, accessToken, expiresAt };
});
