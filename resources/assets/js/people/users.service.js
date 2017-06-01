import axios from 'axios';

export default {

    all(include) {
        let url = '/api/users' + (include ? '?include=' + include : '');
        return axios.get(url);
    },

    find(id, include) {
        let url = '/api/users/' + id + (include ? '?include=' + include : '');
        return axios.get(url);
    },

    save(user) {

        if (user.id)
            return this.update(user);

        return axios.post('/api/users', user);
    },

    update(user) {
        return axios.put('/api/users/' + user.id, user);
    },

    delete(user) {
        return axios.delete('/api/users/' + user.id);
    },

}