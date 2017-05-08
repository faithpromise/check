<template>

  <div>

    <auth-layout v-if="success">
      <template slot="title">Check Your Inbox</template>
      <template slot="text">
        We sent an email to {{ email }}. This email contains a special link to reset your password. If you don't see it, please check your spam, junk, or updates folders.
      </template>
    </auth-layout>

    <auth-layout v-if="!success" v-bind:error="error">

      <!--Default content-->
      <template slot="title" v-if="!error">Password Reset</template>
      <template slot="text" v-if="!error">Enter your email address and we'll email you a special link to reset your password.</template>

      <form class="AuthForm" action="#" method="post" v-on:submit.prevent="submit">
        <div class="Field">
          <input
                  id="login_email"
                  class="Control"
                  type="email"
                  name="email"
                  placeholder="you@youremailaddress.com"
                  v-model="email"
                  v-on:keyup="clear_error"
                  required>
        </div>

        <div class="Field">
          <button class="Button Button--primary" type="submit">Continue</button>
          <router-link class="Button Button--link" v-bind:to="{ name: 'login' }">Back to Login</router-link>
        </div>
      </form>

    </auth-layout>

  </div>

</template>
<script>

    import auth from './auth';
    import authLayout from '../layouts/auth.vue';
    import clientStorage from '../../sunday-morning/core/js/helpers/client-storage';

    let error_messages = {
        email_invalid:  'The email address provided is not a valid email address.',
        user_not_found: 'We couldn\'t find an account with that email address.',
        unknown:        'An error occurred. Please try again.',
    };

    export default {

        components: {
            authLayout,
        },

        data() {
            return {
                email:      localStorage.getItem('user_email'),
                success:    false,
                error_code: null,
            }
        },

        computed: {
            error() {
                return error_messages.hasOwnProperty(this.error_code) ? error_messages[this.error_code] : null;
            }
        },

        mounted() {
            document.getElementById('login_email').focus();
        },

        methods: {

            submit() {
                this.clear_error();

                auth.send_token(this.email)
                    .then(() => {
                        this.success = true;
                    })
                    .catch((error) => {
                        this.set_error(error.response && error.response.data.error ? error.response.data.error : 'unknown');
                    });
            },

            set_error(code) {
                this.error_code = code || 'unknown';
            },

            clear_error() {
                this.error_code = false;
            },



        },

    }

</script>