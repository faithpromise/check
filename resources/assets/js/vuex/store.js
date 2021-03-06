import Vuex from 'vuex';

const state = {
    flash_message: null,
    users:         [],
};

const mutations = {

    insert_flash(state, payload) {
        state.flash_message = payload;
    },

    keep_flash(state, payload) {
        state.keep_flash_message = payload;
    },

    all_users(state, payload) {
        state.users = payload;
    }

};

const actions = {

    remove_flash(context) {
        context.commit('insert_flash', null);
    },

};

export default new Vuex.Store({
    state,
    mutations,
    actions
});