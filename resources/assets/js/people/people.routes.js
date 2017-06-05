import person from './route-person.vue';
import edit from './route-person-edit.vue';
import people from './route-people.vue';

export default [
    {
        name:      'people',
        path:      '/people',
        component: people,
    },
    {
        name:      'person_new',
        path:      '/people/new',
        component: edit,
    },
    {
        name:      'person',
        path:      '/people/:id',
        component: person,
    },
    {
        name:      'person_edit',
        path:      '/people/:id/edit',
        component: edit,
    },
]