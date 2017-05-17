import axios from 'axios';

export default {

    create() {
        return axios.post('/api/comments');
    },

}