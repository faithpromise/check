<template>
  <div class="Comment">
    <div class="Comment-header">
      <div class="Comment-avatar">
        <img v-bind:src="comment.sender.data.avatar_url">
      </div>
      <div class="Comment-meta">
        <div class="Comment-sender">{{ comment.sender.data.name }}</div>
        <div class="Comment-date" v-if="comment.sent_at && !is_pretty_date_visible" v-on:click="toggle_pretty_sent_at">{{ comment.sent_at | moment('from', 'now') }}</div>
        <div class="Comment-date" v-if="comment.sent_at && is_pretty_date_visible" v-on:click="toggle_pretty_sent_at">{{ pretty_sent_at }}</div>
        <div class="Comment-date" v-if="!comment.sent_at">Sending</div>
        <div class="Comment-recipients" v-if="comment.recipients.data.length">
          <span>to</span>
          <span class="Comment-recipient" v-for="recipient in comment.recipients.data" :key="recipient.id">{{ recipient.abbreviation }}</span>
        </div>
      </div>
    </div>
    <div class="Comment-body" v-bind:class="{ 'is-internal': comment.recipients.data.length === 0 }" v-html="comment.body"></div>
    <div class="Comment-attachments">
      <div class="Attachment-list" v-show="comment.attachments.data.length">
        <div class="Attachment-item" v-for="attachment in comment.attachments.data" :key="attachment.id">
          <img class="Attachment-thumb" v-bind:src="attachment.thumb_url">
          <span class="Attachment-name">{{ attachment.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

    export default {

        props: {
            comment: { required: true },
        },

        data() {
            return {
                is_pretty_date_visible: false,
            }
        },

        computed: {
            pretty_sent_at() {
                return moment(this.comment.sent_at).format('ddd, MMM D, h:mm A');
            }
        },

        methods: {

            toggle_pretty_sent_at() {
                this.is_pretty_date_visible = !this.is_pretty_date_visible;
            }

        }

    }
</script>