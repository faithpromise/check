<template>
  <div class="Comment">
    <div class="Comment-header">
      <div class="Comment-avatar">
        <img v-bind:src="comment.sender.data.avatar_url">
      </div>
      <div class="Comment-meta">
        <div class="Comment-sender">{{ comment.sender.data.name }}</div>
        <div class="Comment-date" v-if="comment.sent_at">{{ comment.sent_at | moment('from', 'now') }}</div>
        <div class="Comment-date" v-if="!comment.sent_at">Sending</div>
        <div class="Comment-recipients" v-if="comment.recipients.data.length">
          <span>&middot;</span>
          <span class="Comment-recipient" v-for="recipient in comment.recipients.data" :key="recipient.id">{{ recipient.name }}</span>
        </div>
      </div>
    </div>
    <div class="Comment-body" v-bind:class="{ 'is-internal': comment.recipients.data.length === 0 }" v-html="comment.body"></div>
  </div>
</template>
<script>

    export default {

        props: {
            comment: { required: true },
        },

        components: {},

        data() {
            return {}
        },

        computed: {},

        created() {


        },

        methods: {}

    }
</script>