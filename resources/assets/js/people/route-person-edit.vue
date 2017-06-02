<template>

  <div class="Content" v-if="user">

    <page-header divider="true">
      <template slot="title">
        {{ user.name }}
      </template>
    </page-header>

    <form class="Form-container">
      <div class="Fields">
        <div class="Field Field--half">
          <input class="Control" type="text" v-model="user.first_name" placeholder="first name" required>
        </div>
        <div class="Field Field--half">
          <input class="Control" type="text" v-model="user.last_name" placeholder="last name" required>
        </div>
      </div>
      <div class="Field">
        <input class="Control" type="email" v-model="user.email" placeholder="email" required>
      </div>
      <div class="Field">
        <label>
          <input class="" type="checkbox" v-model="user.is_agent"> This user can create projects
        </label>
      </div>
      <div class="Form-actions">
        <button class="Button Button--primary" type="submit">Save</button>
        <router-link class="Button Button--cancel" v-bind:to="{ name: 'person', params: { id: user.id } }">cancel</router-link>
      </div>
    </form>

  </div>

</template>
<script>

    import userService from './users.service';
    import projectService from '../projects/projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import projectList from '../projects/project-list.vue';

    export default {

        beforeRouteEnter(to, from, next) {
            load(to, next);
        },

        beforeRouteUpdate(to, from, next) {
            load(to, next, this);
        },

        components: {
            pageHeader,
        },

        data() {
            return {
                user: {},
            }
        },

    }

    let load = (to, next, context = null) => {

        userService.find(to.params.id).then((result) => {

            if (context) {
                context.user = result.data.data;
                next();
            } else {
                next(vm => {
                    vm.user = result.data.data;
                });
            }

        });

    };

</script>