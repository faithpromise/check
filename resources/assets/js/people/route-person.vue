<template>

  <div>

    <page-header>
      <template slot="title">{{ user.name }}</template>
    </page-header>

    <div class="Content">

      <div class="Content-container">

        <div class="Header">
          Projects
        </div>

        <div class="Projects-list">
          <project-list v-bind:projects="projects"></project-list>
        </div>

      </div>

    </div>

  </div>

</template>
<script>

    import userService from './users.service';
    import projectService from '../projects/projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import projectList from '../projects/project-list.vue';

    export default {

        beforeRouteEnter(to, from, next) {

            let user     = userService.find(to.params.id);
            let projects = projectService.by_requester(to.params.id, 'agent');

            axios.all([user, projects])
                .then(axios.spread((user, projects) => {
                    next(vm => {
                        vm.user     = user.data.data;
                        vm.projects = projects.data.data;
                    });
                }));

        },

        components: {
            pageHeader,
            projectList,
        },

        data() {
            return {
                user:     {},
                projects: [],
            }
        },

    }
</script>