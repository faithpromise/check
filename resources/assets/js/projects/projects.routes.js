import list from './route-projects.vue';
import project_layout from './route-project-detail.vue';
import comments from './route-project-comments.vue';
import tasks from './route-project-tasks.vue';
import edit from './route-project-edit.vue';

export default [
    {
        name:      'projects',
        path:      '/projects',
        component: list,
    },

    {
        path:      '/projects/:id',
        component: project_layout,
        children:  [
            {
                name:      'project',
                path:      '/projects/:id',
                component: comments,
            },
            {
                name:      'project_tasks',
                path:      '/projects/:id/tasks',
                component: tasks,
            },
        ],
    },

    {
        name:      'project_edit',
        path:      '/projects/:id/edit',
        component: edit,
    },
]