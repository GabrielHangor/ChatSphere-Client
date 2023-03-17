import { useAuthStore } from '@/stores/auth';
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
    },
    {
      path: '/signUp',
      name: 'SignUpScreen',
      component: () => import('@/views/SignUpScreen.vue'),
    },
  ],
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthStore();

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { path: '/signIn' };
  }
});

export default router;
