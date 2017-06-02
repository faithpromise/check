import store from './vuex/store';

export default {

    insert(type, message, action, url) {
        store.commit('insert_flash', { type, message, action, url });
    },

    success(message, action, url) {
        this.insert('success', message, action, url);
    },

    warning(message, action, url) {
        this.insert('warning', message, action, url);
    },

    error(message, action, url) {
        this.insert('error', message, action, url);
    },

    info(message, action, url) {
        this.insert('info', message, action, url);
    },

    keep() {
        store.commit('keep_flash', true);
        return this;
    }

}