import axios from 'axios';

export default {

    all(group_by) {
        return axios.get('/api/projects?group_by=' + group_by);
    },

    find(id, include) {
        return axios.get('/api/projects/' + id, { params: { include: include } });
    },

    by_agent(params) {
        return axios.get('/api/agents?include=projects.requester.department', { params });
    },

    by_requester(id, include) {
        return axios.get('/api/projects', { params: { requester_id: id, include } });
    },

    by_user(id, include) {
        return axios.get('/api/projects', { params: { user_id: id, include } });
    },

}