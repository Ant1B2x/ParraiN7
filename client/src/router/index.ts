import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/questions',
        name: 'questions',
        component: () => import('../views/Questions.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            const user: User = auth.user;
            if (!user.isGodfather && !user.isAdmin)
                next('/forbidden');
            else
                next();
        },
    },
    {
        path: '/answers',
        name: 'answers',
        component: () => import('../views/Answers.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            const user: User = auth.user;
            if (user.isGodfather && !user.isAdmin)
                next('/forbidden');
            else
                next();
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LogIn.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/SignUp.vue'),
    },
    {
        path: '/rankings',
        name: 'ranking',
        component: () => import('../views/Rankings.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            const user: User = auth.user;
            if (!user.isGodfather && !user.isAdmin)
                next('/forbidden');
            else
                next();
        },
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('../views/Users.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            const user: User = auth.user;
            if (!user.isAdmin)
                next('/forbidden');
            else
                next();
        },
    },
    {
        path: '/token',
        name: 'token',
        component: () => import('../views/Token.vue'),
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import('../views/Forbidden.vue'),
    }
];

const router = new VueRouter({routes});

export default router;
