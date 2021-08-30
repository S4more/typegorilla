import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { socket } from "./networking";
createApp(App).use(router).mount('#app');
console.log(socket);
//# sourceMappingURL=main.js.map