import axios from 'axios';

export default {

    all(include) {
        return axios.get('/api/agents' + (include ? '?include=' + include : ''));
    },

}