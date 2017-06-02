import department from './route-department.vue';
// import edit from './route-department-edit.vue';
import departments from './route-departments.vue';

export default [
    {
        name:      'departments',
        path:      '/departments',
        component: departments,
    },
    {
        name:      'department',
        path:      '/departments/:id',
        component: department,
    },
    {
        name:      'department_edit',
        path:      '/departments/:id/edit',
        component: department,
    },
]