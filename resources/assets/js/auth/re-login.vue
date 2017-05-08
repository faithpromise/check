<template>
  <modal v-bind:show="show_login_form" size="small">
    <template slot="title">Your session has ended.</template>
    <template slot="subtitle">Enter your password to log back in.</template>
    <template slot="body">

      <login-form v-on:error-change="onErrorChange" v-on:login-success="check"></login-form>

      <div class="Message Message--error" v-if="error">
        {{ error }}
      </div>

    </template>
  </modal>
</template>
<script>

    let check_timer,
        interval_sec = 10,
        show_within  = 60;

    import auth from './auth';
    import modal from '../../sunday-morning/admin/js/components/modal.vue';
    import loginForm from './login-form.vue';

    export default {

        components: {
            modal,
            loginForm,
        },

        data() {
            return {
                show_login_form: false,
                error:           null,
            }
        },

        created() {
            this.check();
        },

        methods: {

            check() {
                let sec_to_logout = auth.get_seconds_until_logout();
                console.log('sec_to_logout', sec_to_logout);

                if (sec_to_logout <= show_within) {
                    this.show_login_form = true;
                } else {
                    this.error           = null;
                    this.show_login_form = false;
                    this.is_logging_in   = false;
                    check_timer          = setTimeout(this.check, interval_sec * 1000);
                }
            },

            onErrorChange(error) {
                this.error = error;
            },

        }

    }
</script>