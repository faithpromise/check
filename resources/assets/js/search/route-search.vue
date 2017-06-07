<template>
  <div class="Content">

    <form @submit.prevent="search">
      <div class="Input SearchForm">
        <input class="Control SearchForm-input" type="text" v-model="query" placeholder="Search">
        <button class="Input-addon" type="submit">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
          </svg>
        </button>
      </div>
    </form>

    <div v-if="is_user_searching">

      <div class="SectionHeader">
        <span class="SectionHeader-title">Matching Projects</span>
      </div>

      <p v-if="is_loaded && !projects.length">No projects found</p>

      <project-list :projects="projects"></project-list>

      <div class="SectionHeader">
        <span class="SectionHeader-title">Matching People</span>
      </div>

      <p v-if="is_loaded && !users.length">No people found</p>

      <user-list :users="users"></user-list>

    </div>

    <recently-viewed v-if="is_recently_viewed_visible"></recently-viewed>

  </div>
</template>
<script>

    import axios from 'axios';
    import userService from '../users/users.service';
    import projectService from '../projects/projects.service';
    import projectList from '../projects/project-list.vue';
    import userList from '../users/user-list.vue';
    import recentlyViewed from './recently-viewed.vue';

    export default {

        components: {
            projectList,
            userList,
            recentlyViewed,
        },

        data() {
            return {
                query:             '',
                users:             [],
                projects:          [],
                is_user_searching: false,
                is_loaded:         false,
                total_matches:     0,
            }
        },

        computed: {
            is_recently_viewed_visible() {
                return !this.is_user_searching;
            },
            is_loading_visible() {
                return this.is_user_searching && !this.is_loaded;
            },
        },

        methods: {

            search() {

                if (!this.query.trim())
                    return;

                this.is_user_searching = true;
                this.is_loaded         = false;


                let users = userService.all({ query: this.query, include: 'department' });
                users.then((result) => {
                    this.users = result.data.data;
                });

                let projects = projectService.all({ query: this.query, with_inactive: true, include: 'requester' });
                projects.then((result) => {
                    this.projects = result.data.data;
                });

                axios.all([users, projects]).then(axios.spread((users, projects) => {
                    this.is_loaded     = true;
                    this.total_matches = users.data.data.length + projects.data.data.length;
                }));

            },

        },

    }
</script>