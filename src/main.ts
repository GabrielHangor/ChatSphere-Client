import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './styles/style.css';
import AuthService from '@/modules/user/Services/AuthService';

const app = createApp(App);

app.use(createPinia());

app.use(router);

AuthService.restoreUser();

router.isReady().then(() => app.mount('#app'));
