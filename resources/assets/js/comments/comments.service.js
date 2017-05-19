import axios from 'axios';

export default {

    save(comment) {

        if (comment.id)
            return this.update(comment);

        return axios.post('/api/comments', comment);
    },

    update(comment) {
        return axios.put('/api/comments/' + comment.id, comment);
    },

}