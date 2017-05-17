import axios from 'axios';

export default {

    all(group_by) {
        return axios.get('/api/projects?group_by=' + group_by);
    },

    find(id, include) {
        return axios.get('/api/projects/' + id, { params: { include: include } });
    },

    by_agent() {
        return axios.get('/api/agents?include=projects.requester.department');
    },

    by_requester(id, include) {
        return axios.get('/api/projects', { params: { requester_id: id, include } });
    },

}