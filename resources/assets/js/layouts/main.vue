<template>

  <div>
    <nav-menu
            v-bind:nav="nav"
            v-bind:account-nav="account_nav"
            v-bind:user-avatar-url="user_avatar_url">
    </nav-menu>
    <flash-message></flash-message>
    <router-view></router-view>
    <re-login></re-login>
  </div>

</template>
<script>

    import navMenu from '../../sunday-morning/admin/js/components/nav.vue';
    import flashMessage from '../components/flash-message.vue';
    import reLogin from '../auth/re-login.vue';
    import jwtDecode from 'jwt-decode';

    export default {

        components: {
            navMenu,
            flashMessage,
            reLogin,
        },

        data() {

            let token = jwtDecode(localStorage.getItem('id_token'));

            return {
                nav:             [
                    { route: 'projects', title: 'Projects' },
                    { route: 'users', title: 'People' },
                    { route: 'search', title: 'Search' },
//                    { route: 'home', title: 'Files' },
                ],
                account_nav:     [
                    { route: 'user', params: { id: token.sub }, title: 'Profile' },
//                    { route: 'settings', title: 'Settings' },
                    { route: 'logout', title: 'Sign Out' },
                ],
                user_avatar_url: localStorage.getItem('user_avatar_url'),
            }
        }

    }
</script>