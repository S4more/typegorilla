import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
var routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/games',
        name: 'GamesPage',
        component: function () { return import('../views/GamesPage.vue'); }
    },
    {
        path: '/about',
        name: 'About',
        component: function () { return import('../views/About.vue'); }
    },
    {
        path: '/ingame',
        name: 'InGame',
        component: function () { return import('../views/InGame.vue'); }
    }
];
var router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});
export default router;
//# sourceMappingURL=index.js.map