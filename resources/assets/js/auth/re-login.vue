<template>
  <modal v-bind:show="show_login_form" size="small">
    <template slot="title">Your session has ended.</template>
    <template slot="subtitle">Enter your password to log back in.</template>
    <template slot="body">

      <form class="AuthForm" v-on:submit.prevent="submit">
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

      <div class="Message Message--error" v-if="error">
        {{ error }}
      </div>

    </template>
  </modal>
</template>
<script>

    let check_timer,
        interval_sec = 10,
        show_within  = 60 * 24 * 7 * 60;

    let error_messages = {
        email_invalid:       'The email address provided is not a valid email address.',
        user_not_found:      'We couldn\'t find an account with that email address.',
        invalid_credentials: 'The password provided is incorrect.',
        unknown:             'An error occurred. Please try again.',
    };

    import auth from './auth';
    import router from '../routes';
    import modal from '../../sunday-morning/admin/js/components/modal.vue';

    export default {

        components: {
            modal,
        },

        data() {
            return {
                show_login_form: false,
                is_logging_in:   false,
                error_code:      false,
                creds:           {
                    email:    localStorage.getItem('user_email'),
                    password: '',
                },
            }
        },

        computed: {
            error() {
                return error_messages.hasOwnProperty(this.error_code) ? error_messages[this.error_code] : null;
            }
        },

        created() {
            this.check();
        },

        mounted() {

            // Focus on applicable field
            let focused_input = this.creds.email ? 'login_password' : 'login_email';
            document.getElementById(focused_input).focus();

        },

        methods: {

            check() {
                let sec_to_logout = auth.get_seconds_until_logout();
                console.log('sec_to_logout', sec_to_logout);

                if (sec_to_logout <= show_within) {
                    this.show_login_form = true;
                } else {
                    this.show_login_form = false;
                    check_timer          = setTimeout(this.check, interval_sec * 1000);
                }
            },

            submit() {

                this.is_logging_in = true;

                auth.login(this.creds)
                    .then(this.on_success)
                    .catch(this.on_error);
            },

            on_success() {
                this.is_logging_in   = false;
                this.creds.password  = '';
                this.show_login_form = false;
                this.clear_error();
                this.check();
            },

            on_error(error) {
                this.is_logging_in = false;
                this.set_error(error.response && error.response.data.error ? error.response.data.error : 'unknown');
            },

            set_error(code) {
                this.error_code = code || 'unknown';
            },

            clear_error() {
                this.error_code = false;
            },

        }

    }
</script>