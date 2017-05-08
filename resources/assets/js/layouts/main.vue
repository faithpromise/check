<template>

  <div>
    <nav-menu
            v-bind:nav="nav"
            v-bind:account-nav="account_nav"
    ></nav-menu>
    <flash-message></flash-message>
    <router-view></router-view>
    <re-login></re-login>
  </div>

</template>
<script>

    import navMenu from '../../sunday-morning/admin/js/components/nav.vue';
    import flashMessage from '../../sunday-morning/admin/js/components/flash-message.vue';
    import reLogin from '../auth/re-login.vue';

    export default {

        components: {
            navMenu,
            flashMessage,
            reLogin,
        },

        data() {
            return {
                nav:         [
                    { route: 'home', title: 'Dashboard' },
                    { route: 'projects', title: 'Projects' },
                    { route: 'people', title: 'People' },
                ],
                account_nav: [
                    { route: 'profile', title: 'Profile' },
                    { route: 'settings', title: 'Settings' },
                    { route: 'logout', title: 'Sign Out' },
                ],
            }
        }

    }
</script>