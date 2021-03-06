import defaultLayout from './layouts/main.vue';

import store from './vuex/store';
import auth from './auth/auth';
import auth_routes from './auth/auth.routes';
import users_routes from './users/users.routes';
import departments_routes from './departments/departments.routes';
import projects_routes from './projects/projects.routes';
import search from './search/route-search.vue';

let placeholder = { template: '<div>Placeholder</div>' };

const routes = [
    {
        path:      '/',
        component: defaultLayout,
        children:  [
                       { name: 'home', path: '', redirect: { name: 'projects' } },
                       { name: 'search', path: '/search', component: search },
                       { name: 'settings', path: '/settings', component: placeholder },
                   ].concat(projects_routes, users_routes, departments_routes)
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

    if (store.state.keep_flash_message) {
        store.commit('keep_flash', false);
    } else {
        store.dispatch('remove_flash');
    }

    NProgress.start();

    // Set body class
    document.body.classList.remove(from.name + '_page');
    document.body.classList.add(to.name + '_page');

    next();

});

router.afterEach(() => {
    NProgress.done();
});

export default router;