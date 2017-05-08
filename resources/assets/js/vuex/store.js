import Vuex from 'vuex';

const state = {
    flash_message:       null,
};

const mutations = {

    insert_flash(state, payload) {
        state.flash_message = payload;
    },

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