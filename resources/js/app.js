
/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

require('./bootstrap');


//libs imports
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';

//components import
import App from './components/App.vue';
import Dashboard from './components/pages/Dashboard.vue';
import Home from './components/pages/Home.vue';
import Register from './components/auth/Register.vue';
import Login from './components/auth/Login.vue';
import Logout from './components/auth/Logout.vue';
import store from './store';


//style import
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//use libs
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

// axios.defaults.baseURL = window.location.hostname + '/api/';

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },{
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                auth: false
            }
        },{
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                auth: false
            }
        },{
            path: '/logout',
            name: 'logout',
            component: Logout,
            meta: {
                auth: true
            }
        },{
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                auth: true
            }
        }]
    });

router.beforeEach((to, from, next) => {

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.auth) && !store.state.isLoggedIn) {
        // redirect to login page
        next({ name: 'login' });
        return
    }

    // if logged in redirect to dashboard
    if(to.path === '/login' && store.state.isLoggedIn) {
        next({ name: 'dashboard' });
        return
    }

    // if logged in redirect to dashboard
    if(to.path === '/register' && store.state.isLoggedIn) {
        next({ name: 'dashboard' });
        return
    }

    next()
});

Vue.router = router;

App.router = Vue.router;

new Vue(App).$mount('#app');

Vue.config.devtools = true;

