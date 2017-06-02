<template>

  <div class="Content" v-if="loaded">

    <page-header>
      <template slot="title">
        {{ department.name }}
      </template>
      <template slot="actions">
        <button-dropdown
                v-bind:title="'Edit ' + department.name"
                v-bind:to="{ name: 'department_edit' }"
                v-bind:options="edit_options"
                v-on:delete="delete_department"
        >
        </button-dropdown>
      </template>
    </page-header>

    <div class="Header" v-if="requested_projects.length">
      Requested Projects
    </div>

    <div class="Projects-list">
      <project-list v-bind:projects="requested_projects"></project-list>
    </div>

  </div>

</template>
<script>

    import departmentsService from './departments.service';
    import projectService from '../projects/projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import buttonDropdown from '../../sunday-morning/forms/js/components/button-dropdown.vue';
    import projectList from '../projects/project-list.vue';
    import router from '../routes';

    export default {

        beforeRouteEnter(to, from, next) {

            let department         = departmentsService.find(to.params.id);
            let requested_projects = projectService.by_requester_department(to.params.id, 'requester,agent');

            axios.all([department, requested_projects])
                .then(axios.spread((department, requested_projects) => {
                    next(vm => {
                        vm.department         = department.data.data;
                        vm.requested_projects = requested_projects.data.data;
                        vm.loaded             = true;
                    });
                }));

        },

        components: {
            pageHeader,
            projectList,
            buttonDropdown,
        },

        data() {
            return {
                department:         {},
                requested_projects: [],
                loaded:             false,
                edit_options:       [
                    { title: 'Edit', to: { name: 'department_edit' } },
                    { divider: true },
                    { title: 'Delete', event: 'delete' },
                ],
            }
        },

        computed: {



        },

        methods: {

            delete_department() {
                if (confirm('Are you sure you want to delete this department?')) {
                    departmentsService.delete(this.department).then(() => {
                        router.replace({ name: 'departments' });
                    });
                }
            }

        },

    }
</script>