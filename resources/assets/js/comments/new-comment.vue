<template>
  <form class="NewComment" v-on:submit.prevent="save">
    <div class="NewComment-container">
      <div class="NewComment-header">
        <div class="NewComment-avatar">
          <img v-bind:src="sender_avatar_url">
        </div>
        <div class="NewComment-recipients">
          <multi-user-picker v-bind:recipients.sync="comment.recipients"></multi-user-picker>
        </div>
        <label class="NewComment-attach">
          <input id="file_field" type="file" v-on:change="upload_attachments" v-bind:disabled="is_uploading" multiple>
          <svg>
            <use xlink:href="#icon-attachment"></use>
          </svg>
        </label>
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
              v-on:keydown.enter.meta="save"
              v-autosize
              required>
      </textarea>
      </div>
      <div class="Comment-attachments">
        <div class="Attachment-list" v-show="attachments.length">
          <div class="Attachment-item is-new" v-for="(attachment, index) in attachments" :key="attachment.id" v-on:click="delete_attachment(index)">
            <img class="Attachment-thumb" v-bind:src="attachment.thumb_url">
            <span class="Attachment-name">{{ attachment.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>

    import multiUserPicker from '../users/multi-user-picker.vue';
    import attachmentsService from '../attachments/attachments.service';
    import commentsService from '../comments/comments.service';
    import autosize from '../../sunday-morning/core/js/directives/textarea-autosize';

    export default {

        props: {
            projectId:         { required: true },
            defaultRecipients: { default: () => { return []; } },
        },

        components: {
            multiUserPicker,
        },

        directives: {
            autosize
        },

        data() {
            return {
                comment:           {
                    project_id: this.projectId,
                    body:       '',
                    recipients: this.defaultRecipients.slice(0),
                    type:       'draft',
                },
                body_has_focus:    false,
                sender_avatar_url: localStorage.getItem('user_avatar_url'),
                is_sending:        false,
                is_uploading:      false,
                attachments:       [],
            }
        },

        computed: {

            prevent_submit() {
                return this.is_sending || this.is_uploading;
            },

        },

        methods: {

            save_draft() {
                return commentsService.save(this.comment).then((result) => {
                    this.comment.id = result.data.data.id;
                    return result;
                });
            },

            save() {

                if (this.prevent_submit) return;

                this.is_sending   = true;
                this.comment.type = 'comment';

                NProgress.start();

                commentsService.save(this.comment)
                    .then(() => {
                        this.is_sending = false;
                        this.reset();
                        NProgress.done();
                    })
                    .catch(() => {
                            this.is_sending = false;
                            NProgress.done();
                            alert('Error occurred. Unable to send.');
                        }
                    );

            },

            reset() {
                this.comment.recipients = this.defaultRecipients.slice(0); // Clone the array. Shallow ok if not changing the values?
                this.comment.body       = '';
                this.attachments        = [];
            },

            upload_attachments(event) {

                if (this.is_uploading) return;
                this.is_uploading = true;

                NProgress.start();

                this.save_draft().then(() => {

                    let formData = new FormData();
                    formData.append('comment_id', this.comment.id);

                    console.log(formData);

                    for (let i = 0; i < event.target.files.length; i++) {
                        let file = event.target.files[i];
                        formData.append('file[]', file, file.name);
                    }

                    attachmentsService.upload(formData)
                        .then((result) => {

                            let new_attachments = result.data.data;

                            for (let i = 0; i < new_attachments.length; i++) {
                                this.attachments.push(new_attachments[i]);
                            }

                            this.is_uploading = false;
                            NProgress.done();
                        })
                        .catch(() => {
                            alert('Error uploading image');
                            this.is_uploading = false;
                            NProgress.done();
                        });

                });

            },

            delete_attachment(index) {
                attachmentsService.delete(this.attachments[index].id);
                this.attachments.splice(index, 1);
            },

        }

    }
</script>