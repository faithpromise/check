<template>
  <div class="Content">

    <form @submit.prevent="search">
      <div class="SearchForm">
        <input class="SearchForm-input" type="text" v-model="query">
        <button class="SearchForm-button" type="submit">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
          </svg>
        </button>
      </div>
    </form>

    <div class="SectionHeader">
      <span class="SectionHeader-title">Recently Viewed Projects</span>
    </div>

    <project-list :projects="projects"></project-list>

    <div class="SectionHeader">
      <span class="SectionHeader-title">Recently Viewed People</span>
    </div>

    <user-list :users="users"></user-list>

    <div class="SectionHeader">
      <span class="SectionHeader-title">Recently Viewed Departments</span>
    </div>

    <department-list :departments="departments"></department-list>

  </div>
</template>
<script>

    import axios from 'axios';
    import userService from '../users/users.service';
    import departmentService from '../departments/departments.service';
    import projectService from '../projects/projects.service';
    import recentService from '../services/recents';
    import projectList from '../projects/project-list.vue';
    import userList from '../users/user-list.vue';
    import departmentList from '../departments/department-list.vue';

    let recent_users, recent_departments, recent_projects;

    export default {

        beforeRouteEnter(to, from, next) {

            let users       = recentService.get_users({ include: 'department' });
            let departments = recentService.get_departments();
            let projects    = recentService.get_projects({ include: 'requester' });

            axios.all([users, departments, projects])
                .then(axios.spread((users, departments, projects) => {
                    next(vm => {
                        recent_users = vm.users = users.data.data;
                        recent_departments = vm.departments = departments.data.data;
                        recent_projects = vm.projects = projects.data.data;
                        vm.loaded = true;
                    });
                }));

        },

        components: {
            projectList,
            userList,
            departmentList,
        },

        data() {
            return {
                query:       '',
                users:       [],
                departments: [],
                projects:    [],
                loaded:      false,
            }
        },

        methods: {

            search() {

                if (!this.query.trim())
                    return;

                userService.all({ query: this.query, include: 'department' }).then((result) => {
                    this.users = result.data.data;
                });

                departmentService.all({ query: this.query }).then((result) => {
                    this.departments = result.data.data;
                });

                projectService.all({ query: this.query, include: 'requester' }).then((result) => {
                    this.projects = result.data.data;
                });

            },

        },

    }
</script>