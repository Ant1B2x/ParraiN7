import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/questions',
        name: 'questions',
        component: () => import(/* webpackChunkName: "about" */ '../views/Questions.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            if (!(auth.user as User).isGodfather)
                next('/forbidden');
        },
    },
    {
        path: '/answers',
        name: 'answers',
        component: () => import(/* webpackChunkName: "about" */ '../views/Answers.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            if ((auth.user as User).isGodfather)
                next('/forbidden');
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
    },
    {
        path: '/rankings',
        name: 'ranking',
        component: () => import(/* webpackChunkName: "about" */ '../views/Rankings.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            if (!(auth.user as User).isGodfather)
                next('/forbidden');
        },
    },
    {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
        async beforeEnter(to, from, next) {
            const auth = await app.reAuthenticate();
            if (!(auth.user as User).isAdmin)
                next('/forbidden');
        },
    },
    {
        path: '/token',
        name: 'token',
        component: () => import(/* webpackChunkName: "about" */ '../views/Token.vue'),
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import(/* webpackChunkName: "about" */ '../views/Forbidden.vue'),
    },
]

const router = new VueRouter({
    routes
})

export default router
