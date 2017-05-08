import axios from 'axios';

export default {

    login(creds) {
        return axios.post('/auth/login', creds);
    },

    send_token(email) {
        return axios.post('/auth/send-token', { email });
    },

    token_login(token) {
        return axios.post('/auth/token-login', { token });
    },

    reset_password(password) {
        return axios.post('/auth/reset-password', { password });
    },

    signup(email) {
        return axios.post('/auth/signup', { email });
    },

    verify(token) {
        return axios.post('/auth/verify', { token });
    },

}