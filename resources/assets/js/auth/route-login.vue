<template>

  <auth-layout v-bind:error="error">

    <!--Default content-->
    <template slot="title">Sign In</template>
    <template slot="text">
      Welcome back! If you have trouble signing in, please try <span><router-link class="nowrap" v-bind:to="{ name: 'forgot_password' }">resetting your password</router-link>.</span>
    </template>

    <form class="AuthForm" action="#" method="post" v-on:submit.prevent="submit">
      <div class="Field">
        <input
                id="login_email"
                class="Control"
                type="email"
                name="email"
                placeholder="email"
                v-model="creds.email"
                v-on:keyup="clear_error"
                required>
      </div>
      <div class="Field">
        <input
                id="login_password"
                class="Control"
                type="password"
                name="password"
                placeholder="password"
                v-model="creds.password"
                v-on:keyup="clear_error"
                required>
      </div>
      <div class="Field">
        <button class="Button Button--primary" type="submit" v-bind:disabled="is_logging_in">{{ is_logging_in ? 'Logging in...' : 'Login' }}</button>
      </div>
    </form>

  </auth-layout>

</template>
<script>

    import auth from './auth';
    import authLayout from '../layouts/auth.vue';
    import clientStorage from '../../sunday-morning/core/js/helpers/client-storage';

    let error_messages = {
        email_invalid:       'The email address provided is not a valid email address.',
        user_not_found:      'We couldn\'t find an account with that email address.',
        invalid_credentials: 'The password provided is incorrect.',
        unknown:             'An error occurred. Please try again.',
    };

    export default {

        components: {
            authLayout,
        },

        data() {
            return {
                creds:         {
                    email:    clientStorage.get('login_email'),
                    password: '',
                },
                is_logging_in: false,
                error_code:    null,
            }
        },

        computed: {
            error() {
                return error_messages.hasOwnProperty(this.error_code) ? error_messages[this.error_code] : null;
            }
        },

        mounted() {

            // Focus on applicable field
            let focused_input = this.creds.email ? 'login_password' : 'login_email';
            document.getElementById(focused_input).focus();

        },

        methods: {

            submit() {
                this.clear_error();
                this.is_logging_in = true;

                clientStorage.set('login_email', this.creds.email);

                auth.login(this.creds)
                    .then(() => {
                        alert('logged in');
                    })
                    .catch((error) => {
                        this.is_logging_in = false;
                        this.set_error(error.response && error.response.data.error ? error.response.data.error : 'unknown');
                    });
            },

            set_error(code) {
                this.error_code = code || 'unknown';
            },

            clear_error() {
                this.error_code = false;
            }

        },

    }

</script>