import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './styles/style.css';
import UserService from '@/modules/user/Services/UserService';

const app = createApp(App);

app.use(createPinia());
app.use(router);

UserService.restoreUser();

router.isReady().then(() => app.mount('#app'));
