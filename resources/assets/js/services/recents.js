import clientStorage from '../../sunday-morning/core/js/helpers/client-storage';

export default {

    add_user(id) {

        if (!id) return;

        let max_ids   = 10;
        let ids       = clientStorage.get('recent_users') || [];
        let exists_at = ids.indexOf(id);
        if (exists_at >= 0)
            ids.splice(exists_at, 1);
        ids.unshift(id);
        clientStorage.set('recent_users', ids.splice(max_ids));
    }

}