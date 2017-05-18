import Vue from 'vue';
import store from './vuex/store';
import router from './routes';
import axios from 'axios';
import VueHead from 'vue-head';
import VueMoment from 'vue-moment';

import usersService from './people/users.service';

/**
 * Send token with each request
 */
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

/**
 * Bootstrap Vue app
 */
Vue.prototype.$http = axios;

Vue.use(VueHead);
Vue.use(VueMoment);

new Vue({
    store,
    router,
    el: '#app',
    beforeCreate() {
        usersService.all().then((result) => {
            store.commit('all_users', result.data.data);
        });
    }
});