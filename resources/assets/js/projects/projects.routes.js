import projects from './route-projects.vue';
import projectDetail from './route-project-detail.vue';

export default [
    {
        name:      'projects',
        path:      '/projects',
        component: projects,
    },
    {
        name:      'project_detail',
        path:      '/projects/:id',
        component: projectDetail,
    },
]