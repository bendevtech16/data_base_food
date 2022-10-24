import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/search/:search/:params',
        name: 'search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SearchResults.vue')
    },
    {
        path: '/food/:id',
        name: 'details',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/FoodDetails.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        beforeEnter: (to, from, next) => {
            if (!store.state.user.logged_in) {
                return next('/login')
            } else {
                return next('/administration')
            }
        },
    },
    {
        path: '/administration',
        name: 'admin',
        component: () =>
            import ('../views/AdminView.vue'),
    },
    {
        path: '/logout',
        name: 'logout',
        beforeEnter: (to, from, next) => {
            if (store.state.user.logged_in) {
                store.commit('logout')
                return next('/login')
            }
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/LoginView.vue')
    },
    {
        path: "*",
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/PageNotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router