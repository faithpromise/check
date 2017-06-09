<template>

  <div class="Content" v-if="is_loaded">

    <page-header>
      <template slot="title">{{ project.name }}</template>
      <template slot="actions">
        <button-dropdown
                title="Edit"
                v-bind:to="{ name: 'project_edit' }"
                v-bind:options="edit_options"
                v-on:delete="delete_project"
                v-on:close="close_project"
        >
        </button-dropdown>
      </template>
      <div>requested by
        <router-link v-bind:to="{ name: 'user', params: { id: project.requester.data.id } }">{{ project.requester.data.name }}</router-link>
        <span v-if="project.requester.data.department">
          in <router-link v-bind:to="{ name: 'department', params: { id: project.requester.data.department.data.id } }">{{ project.requester.data.department.data.name }}</router-link>
        </span>
        {{ project.created_at | moment('from', 'now') }}
      </div>
      <div>due {{ project.artwork_due_at | dueFormat }}
        <span class="ProjectStatus" v-bind:class="'ProjectStatus--' + project.status.slug" v-if="project.status.slug !== 'active'">{{ project.status.name }}</span>
      </div>
    </page-header>

    <div class="Project-comment">
      <new-comment
              v-bind:project-id="project.id"
              v-bind:default-recipients="project.recipients.data">
      </new-comment>
    </div>

    <div class="Tabs-list">
      <router-link class="Tabs-item" :to="{ name: 'project', params: { id: project.id } }" exact>Comments</router-link>
      <router-link class="Tabs-item" :to="{ name: 'project_tasks', params: { id: project.id } }" exact>Tasks</router-link>
    </div>

    <router-view :project="project"></router-view>

  </div>

</template>
<script>

    import newComment from '../comments/new-comment.vue';
    import projectService from './projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import buttonDropdown from '../../sunday-morning/forms/js/components/button-dropdown.vue';
    import router from '../routes';
    import flash from '../services/flash.service';
    import recentsService from '../services/recents';

    import dueFormat from '../filters/due-format';

    export default {

        beforeRouteEnter(to, from, next) {

            let project = projectService.find(to.params.id, { include: 'recipients,requester.department,agent,comments.sender,comments.recipients,comments.attachments' });

            project.then((result) => {
                next(vm => {
                    vm.project   = result.data.data;
                    vm.is_loaded = true;
                });
            });

        },

        components: {
            pageHeader,
            newComment,
            buttonDropdown,
        },

        filters: {
            dueFormat
        },

        data() {
            return {
                project:      {},
                is_loaded:    false,
                is_listening: false,
            }
        },

        computed: {
            edit_options() {
                return [
                    { title: 'Edit Project', to: { name: 'project_edit' } },
                    { title: 'Close Project', event: 'close', skip: !!this.project.closed_at },
                    { divider: true },
                    { title: 'Delete', event: 'delete' },
                ]
            }
        },

        watch: {
            project(value) {
                this.listen();
                if (value.id)
                    recentsService.add_project(value.id);
            },
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

            delete_project() {
                if (confirm('Are you sure you want to delete this project?')) {
                    projectService.delete(this.project).then(() => {
                        this.$store.commit('insert_flash', { message: 'Project has been removed.' });
                        router.replace({ name: 'projects' });
                    });
                }
            },

            close_project() {
                this.project.closed_at = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
                projectService.update(this.project).then(() => {
                    flash.keep().info('Project has been closed');
                    router.replace({ name: 'projects' });
                });
            }

        },

    }
</script>