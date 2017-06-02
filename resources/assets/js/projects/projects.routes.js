import list from './route-projects.vue';
import detail from './route-project-detail.vue';
import edit from './route-project-edit.vue';

export default [
    {
        name:      'projects',
        path:      '/projects',
        component: list,
    },

    {
        name:      'project',
        path:      '/projects/:id',
        component: detail,
    },

    {
        name:      'project_edit',
        path:      '/projects/:id/edit',
        component: edit,
    },
]