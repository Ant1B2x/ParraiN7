import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/questions',
        name: 'questions',
        component: () => import(/* webpackChunkName: "about" */ '../views/Questions.vue')
    },
    {
        path: '/answers',
        name: 'answers',
        component: () => import(/* webpackChunkName: "about" */ '../views/Answers.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
    },
    {
        path: '/rankings',
        name: 'ranking',
        component: () => import(/* webpackChunkName: "about" */ '../views/Rankings.vue')
    },
    {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router
