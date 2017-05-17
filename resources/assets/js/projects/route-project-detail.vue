<template>

  <div v-if="project">

    <page-header>
      <template slot="title">{{ project.name }}</template>
    </page-header>

    <div class="Content Content--flush">

      <div class="Content-container">

        <new-comment v-bind:recipients="project.recipients.data"></new-comment>

        <div class="Comment" v-for="comment in project.comments.data">
          <div class="Comment-header">
            <div class="Comment-avatar">
              <img v-bind:src="comment.sender.data.avatar_url">
            </div>
            <div class="Comment-meta">
              <div class="Comment-sender">{{ comment.sender.data.name }}</div>
              <div class="Comment-date">{{ comment.sent_at | moment('from', 'now') }}</div>
              <div class="Comment-recipients" v-if="comment.recipients.data.length">
                <span>&middot;</span>
                <span class="Comment-recipient" v-for="recipient in comment.recipients.data" :key="recipient.id">{{ recipient.name }}</span>
              </div>
            </div>
          </div>
          <div class="Comment-body" v-bind:class="{ 'is-internal': comment.recipients.data.length === 0 }" v-html="comment.body"></div>
        </div>
      </div>

    </div>

  </div>

</template>
<script>

    import projectService from './projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import newComment from '../comments/new-comment.vue';

    export default {

        beforeRouteEnter(to, from, next) {

            let projects = projectService.find(to.params.id, 'recipients,requester.department,agent,comments.sender,comments.recipients');

            projects.then((result) => {
                next(vm => {
                    vm.project = result.data.data;
                });
            });

        },

        props: {},

        components: {
            pageHeader,
            newComment,
        },

        data() {
            return {
                project:                 null,
            }
        },

        computed: {},

        created() {

        },

        methods: {

        }

    }
</script>