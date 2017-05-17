<template>
  <form class="NewComment" v-on:submit.prevent="add_comment">
    <div class="NewComment-header">
      <div class="NewComment-avatar">
        <img v-bind:src="sender_avatar_url">
      </div>
      <div class="NewComment-recipients">
        <multi-user-picker v-bind:recipients.sync="recipients"></multi-user-picker>
      </div>
      <div class="NewComment-actions">

        <button class="Button Button--primary" type="submit">Send</button>
      </div>
    </div>
    <div class="NewComment-body" v-bind:class="{ 'has-focus': has_focus }">
      <textarea class="NewComment-textarea" v-on:focus="has_focus = true" v-on:blur="has_focus = false"></textarea>
    </div>
  </form>
</template>
<script>

    import multiUserPicker from '../users/multi-user-picker.vue';

    export default {

        props: {
            recipients: { default: () => { return []; } },
        },

        components: {
            multiUserPicker,
        },

        data() {
            return {
                has_focus:         false,
                sender_avatar_url: localStorage.getItem('user_avatar_url'),
            }
        },

        computed: {},

        created() {


        },

        methods: {

            add_comment() {
                alert('comment added');
                return null;
            }
        }

    }
</script>