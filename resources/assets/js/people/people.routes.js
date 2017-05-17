import person from './route-person.vue';
import people from './route-people.vue';

export default [
    {
        name:      'people',
        path:      '/people',
        component: people,
    },
    {
        name:      'person',
        path:      '/people/:id',
        component: person,
    },
]