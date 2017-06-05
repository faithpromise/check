import Vue from 'vue';
import store from './vuex/store';
import router from './routes';
import axios from 'axios';
import VueHead from 'vue-head';
import VueMoment from 'vue-moment';

import usersService from './users/users.service';

/**
 * Set up Echo for real time updates
 */
import Echo from "laravel-echo"
window.Echo = new Echo(window.app.echo);

/**
 * Bootstrap Vue app
 */
Vue.prototype.$http = axios;

Vue.use(VueHead);
Vue.use(VueMoment);

new Vue({
    store,
    router,
    el:      '#app',
    // beforeCreate() {
    //     usersService.all().then((result) => {
    //         store.commit('all_users', result.data.data);
    //     });
    // },
    created() {
        this.update_users();
        window.Echo.channel('users')
            .listen('UserSaved', this.update_users)
            .listen('UserDeleted', this.update_users);
    },
    methods: {
        update_users() {
            usersService.all('department,projectCount').then((result) => {
                store.commit('all_users', result.data.data);
            });
        },
    }
});