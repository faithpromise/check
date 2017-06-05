import clientStorage from '../../sunday-morning/core/js/helpers/client-storage';

import userService from '../users/users.service';
import departmentService from '../departments/departments.service';
import projectService from '../projects/projects.service';

export default {

    get_users(params = {}) {
        return get('users', params);
    },

    get_departments(params = {}) {
        return get('departments', params);
    },

    get_projects(params = {}) {
        return get('projects', params);
    },

    add_user(id) {
        add('users', id);
    },

    add_department(id) {
        add('departments', id);
    },

    add_project(id) {
        add('projects', id);
    },

}

let get = (item, params = {}) => {
    params.ids = clientStorage.get('recent_' + item) || [0];
    return get_service(item).all(params);
};

let add = (item, id) => {
    if (!id) return;

    let key       = 'recent_' + item;
    let max_ids   = 10;
    let ids       = clientStorage.get(key) || [];
    let exists_at = ids.indexOf(id);
    if (exists_at >= 0)
        ids.splice(exists_at, 1);
    ids.unshift(id);
    ids.splice(max_ids);
    clientStorage.set(key, ids);
};

let get_service = (item) => {
    switch (item) {
        case 'users':
            return userService;
        case 'departments':
            return departmentService;
        case 'projects':
            return projectService;
    }
};