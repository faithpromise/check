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

    by_user(id, params = {}) {
        params.user_id = id;
        return axios.get('/api/projects', { params });
    },

    by_requester_department(id, include) {
        return axios.get('/api/projects', { params: { requester_department_id: id, include } });
    },

    by_agent_department(id, include) {
        return axios.get('/api/projects', { params: { agent_department_id: id, include } });
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