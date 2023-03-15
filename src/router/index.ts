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
      path: '/login',
      name: 'LoginScreen',
      component: () => import('@/views/LoginScreen.vue'),
    },
  ],
});

export default router;
