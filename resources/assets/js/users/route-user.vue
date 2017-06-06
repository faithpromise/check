<template>

  <div class="Content" v-if="loaded">

    <page-header v-bind:divider="true">
      <template slot="title">
        {{ user.name }}
      </template>
      <template slot="actions">
        <button-dropdown
                v-bind:title="'Edit ' + user.first_name"
                v-bind:to="{ name: 'user_edit' }"
                v-bind:options="edit_options"
                v-on:delete="delete_user"
        >
        </button-dropdown>
      </template>
      <div v-if="user.department">
        <router-link v-bind:to="{ name: 'department', params: { id: user.department.data.id } }">{{ user.department.data.name }}</router-link>
      </div>
    </page-header>

    <p v-show="show_empty_message">No projects</p>

    <div class="Header" v-if="active_projects.length">
      Active Projects
    </div>

    <project-list v-bind:projects="active_projects"></project-list>

    <div class="Header" v-if="closed_projects.length">
      Recently Closed Projects
    </div>

    <div class="Projects-list">
      <project-list v-bind:projects="closed_projects"></project-list>
    </div>

  </div>

</template>
<script>

    import userService from './users.service';
    import projectService from '../projects/projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import buttonDropdown from '../../sunday-morning/forms/js/components/button-dropdown.vue';
    import projectList from '../projects/project-list.vue';
    import router from '../routes';
    import recentsService from '../services/recents';

    let load = (to, next, context = null) => {

        let project_includes = 'requester,agent';

        let user            = userService.find(to.params.id, 'department');
        let active_projects = projectService.by_user(to.params.id, { include: project_includes });
        let closed_projects = projectService.by_user(to.params.id, { include: project_includes, closed: true });

        axios.all([user, active_projects, closed_projects])
            .then(axios.spread((user, active_projects, closed_projects) => {

                if (context) {
                    assign_data(context, user, active_projects, closed_projects);
                    next();
                } else {
                    next(vm => {
                        assign_data(vm, user, active_projects, closed_projects);
                    });
                }

            }));

        function assign_data(vm, user, active_projects, closed_projects) {
            vm.user            = user.data.data;
            vm.active_projects = active_projects.data.data;
            vm.closed_projects = closed_projects.data.data;
            vm.loaded          = true;
        }

    };

    export default {

        beforeRouteEnter(to, from, next) {
            load(to, next);
        },

        beforeRouteUpdate(to, from, next) {
            load(to, next, this);
        },

        components: {
            pageHeader,
            projectList,
            buttonDropdown,
        },

        data() {
            return {
                user:            {},
                active_projects: [],
                closed_projects: [],
                loaded:          false,
                edit_options:    [
                    { title: 'Edit', to: { name: 'user_edit' } },
                    { divider: true },
                    { title: 'Delete', event: 'delete' },
                ],
            }
        },

        computed: {
            show_empty_message() {
                return this.loaded && this.active_projects.length === 0 && this.closed_projects.length === 0;
            }
        },

        watch: {
            user(value) {
                if (value.id)
                    recentsService.add_user(value.id);
            }
        },

        methods: {

            delete_user() {
                if (confirm('Are you sure you want to delete this user?')) {
                    userService.delete(this.user).then(() => {
                        this.$store.commit('insert_flash', { message: this.user.name + ' has been removed.' });
                        router.replace({ name: 'users' });
                    });
                }
            },

        },

    }
</script>