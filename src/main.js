import { createApp, reactive } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Create a global (reactive) object to share across multiple components
const GStore = reactive({ flashMessage: '' });
// Provide GStore to vue application
app.provide('GStore', GStore);

app.mount('#app');
