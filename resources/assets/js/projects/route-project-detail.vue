<template>

  <div class="Content" v-if="project">

    <page-header>
      <template slot="title">{{ project.name }}</template>
      <template slot="actions">
        <button class="Button">Settings</button>
      </template>
      <div>requested by {{ project.requester.data.name }} {{ project.created_at | moment('from', 'now') }}</div>
      <div>due {{ project.artwork_due_at | dueFormat }} <span class="ProjectStatus" v-bind:class="'ProjectStatus--' + project.status.slug" v-if="project.status.slug !== 'active'">{{ project.status.name }}</span></div>
    </page-header>

    <div class="Project-comment">
      <new-comment
              v-bind:project-id="project.id"
              v-bind:default-recipients="project.recipients.data">
      </new-comment>
    </div>

    <comments
            v-bind:project-id="project.id"
            v-bind:comments="project.comments.data">
    </comments>

  </div>

</template>
<script>

    import projectService from './projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import newComment from '../comments/new-comment.vue';
    import comments from '../comments/comments.vue';

    import dueFormat from '../filters/due-format';

    export default {

        beforeRouteEnter(to, from, next) {

            let projects = projectService.find(to.params.id, 'recipients,requester.department,agent,comments.sender,comments.recipients,comments.attachments');

            projects.then((result) => {
                next(vm => {
                    vm.project = result.data.data;
                });
            });

        },

        components: {
            pageHeader,
            newComment,
            comments,
        },

        filters: {
            dueFormat
        },

        data() {
            return {
                project:      null,
                is_listening: false,
            }
        },

        watch: {
            project() {
                this.listen();
            }
        },

        beforeDestroy() {
            this.leave();
        },

        methods: {

            listen() {

                if (this.is_listening || !this.project) return;

                this.is_listening = true;

                Echo.channel('project.' + this.project.id)
                    .listen('CommentCreated', this.on_comment_added);

            },

            leave() {
                Echo.leave('.project.' + this.project.id);
            },

            on_comment_added(e) {
                this.project.comments.data.unshift(e.data);
            },

        },

    }
</script>