import axios from 'axios';

export default {

    all(group_by) {
        return axios.get('/api/projects?group_by=' + group_by);
    },

    by_agent() {
        return axios.get('/api/agents?include=projects.requester.department');
    }

}