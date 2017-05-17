import axios from 'axios';

export default {

    all(include) {
        let url = '/api/users' + (include ? '?include=' + include : '');
        return axios.get(url);
    },

    find(id) {
        return axios.get('/api/users/' + id);
    },

}