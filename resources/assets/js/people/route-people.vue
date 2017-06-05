<template>

  <div class="Content Content--flush">

    <page-header v-bind:margin="false">
      <template slot="title">People</template>
      <template slot="actions">
        <router-link class="Button Button--primary" v-bind:to="{ name: 'person_new' }">Add Person</router-link>
      </template>
    </page-header>

    <div class="Tabs-list">
      <router-link class="Tabs-item" v-bind:to="{ name: 'people' }">People</router-link>
      <a class="Tabs-item">Departments</a>
    </div>

    <div class="Content-container">

      <!--<ul>-->
      <!--<li v-for="user in filtered_users">-->
      <!--<router-link v-bind:to="{ name: 'person', params: { id: user.id } }">{{ user.name }}</router-link>-->
      <!--</li>-->
      <!--</ul>-->

      <p>
        <button class="Button" type="button" v-on:click="active_only = !active_only">{{ active_only ? 'Show Everyone' : 'Show Only Actives' }}</button>
        <!--<label><input type="checkbox" v-model="active_only"> Limit to active projects</label>-->
      </p>

      <div class="Projects-list">

        <router-link v-bind:to="{ name: 'person', params: { id: user.id } }" class="UserItem" v-for="user in filtered_users" :key="user.id">
          <div class="UserItem-name">{{ user.name }}</div>
          <div class="UserItem-department" v-if="user.department">{{ user.department.data.name }}</div>
        </router-link>

      </div>

    </div>
  </div>

</template>
<script>

    import userService from './users.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';

    export default {

        components: {
            pageHeader,
        },

        data() {
            return {
                active_only: false,
                users:       [],
            }
        },

        computed: {
            filtered_users() {
                if (!this.active_only) return this.$store.state.users;
                return this.$store.state.users.filter((user) => {
                    return user.projects_count > 0;
                });
            }
        },

    }
</script>