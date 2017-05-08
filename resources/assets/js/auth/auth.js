import jwtDecode from 'jwt-decode';
import authService from './auth.service';

export default {

    signup(email) {
        return authService.signup(email);
    },

    verify(token) {
        return authService.verify(token);
    },

    login(creds) {
        return authService.login(creds).then(set_token);
    },

    reset_password(pw) {
        return authService.reset_password(pw);
    },

    send_token(email) {
        return authService.send_token(email);
    },

    token_login(token) {
        return authService.token_login(token).then(set_token);
    },

    logout: remove_token,

    has_token() {
        let jwtStr = get_local_token();
        return typeof jwtStr === 'string';
    },

    is_authenticated() {
        return this.get_seconds_until_logout() > 0;
    },

    get_seconds_until_logout() {
        let jwtStr = get_local_token();
        try {
            let token             = jwtDecode(jwtStr);
            let time_diff         = localStorage.getItem('server_time_diff');
            let seconds_remaining = (typeof jwtStr === 'string') ? (token.exp - time_diff - Date.now() / 1000) : 0;
            return Math.round(Math.max(0, seconds_remaining));
        } catch (err) {
            return 0;
        }
    }

}

function set_token(result) {
    localStorage.setItem('server_time_diff', result.data.current_time - Date.now() / 1000);
    localStorage.setItem('id_token', result.data.token);
}
function remove_token() { localStorage.removeItem('id_token'); }
function get_local_token() { return localStorage.getItem('id_token'); }