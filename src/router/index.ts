import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ChatScreen',
      component: () => import('@/views/ChatScreen.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/signIn',
      name: 'signInScreen',
      component: () => import('@/views/SignInScreen.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/signUp',
      name: 'SignUpScreen',
      component: () => import('@/views/SignUpScreen.vue'),
      meta: { requiresGuest: true },
    },
  ],
});

router.beforeEach((to) => {
  const { isLoggedIn } = storeToRefs(useAuthStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { path: '/signIn' };
  }

  if (to.meta.requiresGuest && isLoggedIn.value) {
    return { path: '/' };
  }
});

export default router;
