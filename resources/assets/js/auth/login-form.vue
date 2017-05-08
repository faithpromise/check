<template>
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
</template>
<script>

    import auth from './auth';
    import router from '../routes';

    let error_messages = {
        email_invalid:       'The email address provided is not a valid email address.',
        user_not_found:      'We couldn\'t find an account with that email address.',
        invalid_credentials: 'The password provided is incorrect.',
        unknown:             'An error occurred. Please try again.',
    };

    export default {

        data() {
            return {
                is_logging_in: false,
                error_code:    false,
                creds:         {
                    email:    localStorage.getItem('user_email'),
                    password: '',
                },
            }
        },

        watch: {
            error(value) {
                this.$emit('error-change', value)
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

                auth.login(this.creds)
                    .then(() => {
                        this.$emit('login-success');
                        this.creds.password = '';
                        router.push({ name: 'home' });
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
            },

        }

    }
</script>