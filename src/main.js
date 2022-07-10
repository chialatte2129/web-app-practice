import { createApp } from 'vue';
import { Button } from 'vant';
import App from './App.vue'

const app = createApp();
app.use(Button);

createApp(App).mount('#app')