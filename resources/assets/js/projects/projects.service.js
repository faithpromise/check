import axios from 'axios';

export default {

    all(params = {}) {

        return axios.get('/api/projects', { params });
    },

    find(id, include) {
        return axios.get('/api/projects/' + id, { params: { include: include } });
    },

    by_agent(params) {
        return axios.get('/api/agents?include=projects.requester', { params });
    },

    by_requester(id, include) {
        return axios.get('/api/projects', { params: { requester_id: id, include } });
    },

    by_user(id, params = {}) {
        params.user_id = id;
        return axios.get('/api/projects', { params });
    },

    by_requester_department(id, params) {
        params.requester_department_id = id;
        return axios.get('/api/projects', { params });
    },

    by_agent_department(id, params) {
        return axios.get('/api/projects', { params });
    },

    save(project) {

        if (project.id)
            return this.update(project);

        return axios.post('/api/projects', project);
    },

    update(project) {
        return axios.put('/api/projects/' + project.id, project);
    },

    delete(project) {
        return axios.delete('/api/projects/' + project.id);
    },

}