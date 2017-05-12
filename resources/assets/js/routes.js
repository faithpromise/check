import defaultLayout from './layouts/main.vue';
import projects from './projects/route-projects.vue';

import store from './vuex/store';
import auth from './auth/auth';
import auth_routes from './auth/auth.routes';
import projects_routes from './projects/projects.routes';

let placeholder = { template: '<div>Placeholder</div>' };

const routes = [
    {
        path:      '/',
        component: defaultLayout,
        children:  [
                       { name: 'home', path: '', component: projects },
                       { name: 'people', path: '/people', component: placeholder },
                       { name: 'settings', path: '/settings', component: placeholder },
                       { name: 'profile', path: '/profile', component: placeholder },
                   ].concat(projects_routes)
    },

].concat(auth_routes);

const router = new VueRouter({
    routes:         routes,
    mode:           'history',
    scrollBehavior: (to, from, savedPosition) => {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {

    let unrestricted_routes = ['login', 'signup', 'verify', 'forgot_password', 'token_login', 'reset_password'];

    if (unrestricted_routes.indexOf(to.name) < 0 && !auth.is_authenticated()) {
        return next({ name: 'login' })
    }

    NProgress.start();

    store.dispatch('remove_flash');

    // Set body class
    document.body.classList.remove(from.name + '_page');
    document.body.classList.add(to.name + '_page');

    next();

});

router.afterEach(() => {
    NProgress.done();
});

export default router;