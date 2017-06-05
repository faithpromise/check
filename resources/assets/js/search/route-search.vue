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

    <div class="SearchResults">

      <div class="SearchResults-section">

        <div class="SearchResults-title">People</div>

        <div class="SearchItem" v-for="user in users" :key="user.id">
          <router-link class="SearchItem-title" :to="{ name: 'user', params: { id: user.id } }">{{ user.name }}</router-link>
          <router-link class="SearchItem-subtitle" :to="{ name: 'department', params: { id: user.department.data.id } }" v-if="user.department">{{ user.department.data.name }}</router-link>
        </div>

      </div>

      <div class="SearchResults-section">

        <div class="SearchResults-title">Departments</div>

        <div class="SearchItem" v-for="department in departments" :key="department.id">
          <router-link class="SearchItem-title" :to="{ name: 'department', params: { id: department.id } }">{{ department.name }}</router-link>
        </div>

      </div>

      <div class="SearchResults-section">

        <div class="SearchResults-title">Projects</div>

        <div class="SearchItem" v-for="project in projects" :key="project.id">
          <router-link class="SearchItem-title" :to="{ name: 'project', params: { id: project.id } }">{{ project.name }}</router-link>
          <span class="SearchItem-subtitle" v-bind:class="'ProjectStatus--' + project.status.slug" v-if="project.status.slug !== 'active'">{{ project.status.name }}</span>
        </div>

      </div>

    </div>

  </div>
</template>
<script>

    import axios from 'axios';
    import userService from '../users/users.service';
    import departmentService from '../departments/departments.service';
    import projectService from '../projects/projects.service';
    import recentService from '../services/recents';

    let recent_users, recent_departments, recent_projects;

    export default {

        beforeRouteEnter(to, from, next) {

            let users       = recentService.get_users({ include: 'department' });
            let departments = recentService.get_departments();
            let projects    = recentService.get_projects();

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