<template>

  <div class="Content" v-if="loaded">

    <page-header>
      <template slot="title">
        <span v-if="user.department">{{ user.department.data.name }} // </span>
        {{ user.name }}
      </template>
      <template slot="actions">
        <button-dropdown
                v-bind:title="'Edit ' + user.first_name"
                v-bind:to="{ name: 'person_edit' }"
                v-bind:options="edit_options"
                v-on:delete="delete_user"
        >
        </button-dropdown>
      </template>
    </page-header>

    <div class="Header" v-if="active_projects.length">
      Projects
    </div>

    <div class="Projects-list">
      <project-list v-bind:projects="active_projects"></project-list>
    </div>

    <div class="Header" v-if="inactive_projects.length">
      Inactive Projects
    </div>

    <div class="Projects-list">
      <project-list v-bind:projects="inactive_projects"></project-list>
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

    export default {

        beforeRouteEnter(to, from, next) {

            let user     = userService.find(to.params.id, 'department');
            let projects = projectService.by_requester(to.params.id, 'agent,inactive');

            axios.all([user, projects])
                .then(axios.spread((user, projects) => {
                    next(vm => {
                        vm.user     = user.data.data;
                        vm.projects = projects.data.data;
                        vm.loaded   = true;
                    });
                }));

        },

        beforeRouteUpdate(to, from, next) {
            this.beforeRouteEnter(to, from, next);
        },

        components: {
            pageHeader,
            projectList,
            buttonDropdown,
        },

        data() {
            return {
                user:         {},
                projects:     [],
                loaded:       false,
                edit_options: [
                    { title: 'Edit', to: { name: 'person_edit' } },
                    null,
                    { title: 'Delete', event: 'delete' },
                ],
            }
        },

        computed: {

            active_projects() {
                return this.projects.filter((project) => {
                    return project.is_active;
                });
            },

            inactive_projects() {
                return this.projects.filter((project) => {
                    return !project.is_active;
                }).slice().reverse();
            },

        },

        methods: {

            delete_user() {
                if (confirm('Are you sure you want to delete this user?')) {
                    userService.delete(this.user).then(() => {
                        this.$store.commit('insert_flash', { message: this.user.name + ' has been removed.' });
                        router.replace({ name: 'people' });
                    });
                }
            }

        },

    }
</script>