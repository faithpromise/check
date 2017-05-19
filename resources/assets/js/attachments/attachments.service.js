import axios from 'axios';

export default {

    upload(form_data) {
        return axios.post('/api/attachments', form_data);
    },

    delete(id) {
        return axios.delete('/api/attachments/' + id);
    }

}