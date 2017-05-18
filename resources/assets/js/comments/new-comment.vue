<template>
  <form class="NewComment" v-on:submit.prevent="add_comment">
    <div class="NewComment-header">
      <div class="NewComment-avatar">
        <img v-bind:src="sender_avatar_url">
      </div>
      <div class="NewComment-recipients">
        <multi-user-picker v-bind:recipients.sync="comment.recipients"></multi-user-picker>
      </div>
      <div class="NewComment-actions">
        <button class="Button Button--primary" type="submit" tabindex="2">Send</button>
      </div>
    </div>
    <div class="NewComment-body" v-bind:class="{ 'has-focus': body_has_focus }">
      <textarea
              class="NewComment-textarea"
              v-model="comment.body"
              v-on:focus="body_has_focus = true"
              v-on:blur="body_has_focus = false"
              v-on:keydown.enter.meta="add_comment">
      </textarea>
    </div>
  </form>
</template>
<script>

    import multiUserPicker from '../users/multi-user-picker.vue';

    export default {

        props: {
            defaultRecipients: { default: () => { return []; } },
        },

        components: {
            multiUserPicker,
        },

        data() {
            return {
                comment:           {
                    body:       '',
                    recipients: this.defaultRecipients.slice(0),
                },
                body_has_focus:    false,
                sender_avatar_url: localStorage.getItem('user_avatar_url'),
                is_sending:        false,
            }
        },

        computed: {},

        created() {

        },

        methods: {

            add_comment() {

                this.is_sending = true;

                // Reset comment
                this.comment.recipients = this.defaultRecipients.slice(0); // Clone the array. Shallow ok if not changing the values?
                this.comment.body       = '';

                return null;
            }
        }

    }
</script>