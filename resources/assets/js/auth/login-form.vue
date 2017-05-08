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

    export default {

        props: {},

        components: {},

        data() {
            return {
                is_logging_in:   false,
                error_code:      false,
                creds:           {
                    email:    localStorage.getItem('user_email'),
                    password: '',
                },
            }
        },

        computed: {},

        created() {


        },

        methods: {}

    }
</script>