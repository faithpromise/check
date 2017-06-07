<template>
  <div>
    <div class="SectionHeader" v-if="projects.length">
      <span class="SectionHeader-title">Recently Viewed Projects</span>
    </div>

    <project-list :projects="projects"></project-list>

    <div class="SectionHeader" v-if="users.length">
      <span class="SectionHeader-title">Recently Viewed People</span>
    </div>

    <user-list :users="users"></user-list>
  </div>
</template>
<script>

    import axios from 'axios';
    import recentService from '../services/recents';
    import projectList from '../projects/project-list.vue';
    import userList from '../users/user-list.vue';

    export default {

        components: {
            projectList,
            userList,
        },

        data() {
            return {
                users:               [],
                projects:            [],
                is_loading_projects: false,
                is_loading_users:    false,
            }
        },

        created() {

            this.load_projects();
            this.load_users();

        },

        methods: {

            load_projects() {
                this.is_loading_projects = true;
                recentService.get_projects({ include: 'requester', with_inactive: true }).then((result) => {
                    this.projects            = result.data.data;
                    this.is_loading_projects = false;
                });
            },

            load_users() {
                this.is_loading_users = true;
                recentService.get_users({ include: 'department' }).then((result) => {
                    this.users            = result.data.data;
                    this.is_loading_users = false;
                });
            },

        }

    }
</script>