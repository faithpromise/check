import Vue from 'vue';
import store from './vuex/store';
import router from './routes';
import axios from 'axios';
import VueHead from 'vue-head';

/**
 * Send token with each request
 */
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

/**
 * Bootstrap Vue app
 */
Vue.prototype.$http = axios;

Vue.use(VueHead);

new Vue({
    store,
    router,
    el: '#app',
});