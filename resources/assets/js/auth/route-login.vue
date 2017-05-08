<template>

  <auth-layout v-bind:error="error">

    <!--Default content-->
    <template slot="title">Sign In</template>
    <template slot="text">
      Welcome back! If you have trouble signing in, please try <span><router-link class="nowrap" v-bind:to="{ name: 'forgot_password' }">resetting your password</router-link>.</span>
    </template>

    <login-form v-on:error-change="onErrorChange"></login-form>

  </auth-layout>

</template>
<script>

    import authLayout from '../layouts/auth.vue';
    import loginForm from './login-form.vue';

    export default {

        components: {
            authLayout,
            loginForm,
        },

        data() {
            return {
                error: null,
            }
        },

        methods: {

            onErrorChange(error) {
                this.error = error;
            },

        },

    }

</script>