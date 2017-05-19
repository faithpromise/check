<template>

  <div v-if="project">

    <page-header>
      <template slot="title">{{ project.name }}</template>
    </page-header>

    <div class="Content Content--flush">

      <div class="Content-container">

        <new-comment
                v-bind:project-id="project.id"
                v-bind:default-recipients="project.recipients.data">
        </new-comment>

        <comments
                v-bind:project-id="project.id"
                v-bind:comments="project.comments.data">
        </comments>

      </div>

    </div>

  </div>

</template>
<script>

    import projectService from './projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import newComment from '../comments/new-comment.vue';
    import comments from '../comments/comments.vue';

    export default {

        beforeRouteEnter(to, from, next) {

            let projects = projectService.find(to.params.id, 'recipients,requester.department,agent,comments.sender,comments.recipients');

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

        listen() {
            if (this.project && !this.is_listening) {
                this.is_listening = true;
                Echo
                    .channel('project.' + this.project.id)
                    .listen('CommentsAdded', (e) => {
                        console.log(e.update);
                    });
            }
        },

        leave() {
            Echo.leave('project.' + this.project.id);
        },

    }
</script>