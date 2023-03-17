import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { IUser } from '@/modules/user/Models/user.models';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Partial<IUser> | null>(null);
  const accessToken = ref<string | null>(null);
  const expiresAt = ref<number | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  return { user, isLoggedIn, accessToken, expiresAt };
});
