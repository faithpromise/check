import axios from 'axios';

export default {

    all(include) {
        let url = '/api/departments' + (include ? '?include=' + include : '');
        return axios.get(url);
    },

    find(id, include) {
        let url = '/api/departments/' + id + (include ? '?include=' + include : '');
        return axios.get(url);
    },

    save(department) {

        if (department.id)
            return this.update(department);

        return axios.post('/api/departments', department);
    },

    update(department) {
        return axios.put('/api/departments/' + department.id, department);
    },

    delete(department) {
        return axios.delete('/api/departments/' + department.id);
    },

}