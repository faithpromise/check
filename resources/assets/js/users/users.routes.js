import user from './route-user.vue';
import edit from './route-user-edit.vue';
import users from './route-users.vue';

export default [
    {
        name:      'users',
        path:      '/people',
        component: users,
    },
    {
        name:      'user_new',
        path:      '/people/new',
        component: edit,
    },
    {
        name:      'user',
        path:      '/people/:id',
        component: user,
    },
    {
        name:      'user_edit',
        path:      '/people/:id/edit',
        component: edit,
    },
]