import login from './route-login.vue';
import forgot from './route-password-forgot.vue';

export default [
    {
        path:      '/login',
        name:      'login',
        component: login
    },

    {
        path:      '/logout',
        name:      'logout',
        component: forgot
    },

    {
        path:      '/forgot-password',
        name:      'forgot_password',
        component: forgot
    }
]