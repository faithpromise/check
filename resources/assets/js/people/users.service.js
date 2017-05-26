import axios from 'axios';

export default {

    all(include) {
        let url = '/api/users' + (include ? '?include=' + include : '');
        return axios.get(url);
    },

    find(id) {
        return axios.get('/api/users/' + id);
    },

    save(user) {

        if (user.id)
            return this.update(user);

        return axios.post('/api/users', user);
    },

    update(user) {
        return axios.put('/api/users/' + user.id, user);
    },

}