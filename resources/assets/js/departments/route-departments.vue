<template>

  <div class="Content Content--flush">

    <ul class="Tab-list">
      <li class="Tab-item">
        <router-link class="Tab-link" v-bind:to="{ name: 'users' }">People</router-link>
      </li>
      <li class="Tab-item">
        <a class="Tab-link">Departments</a>
      </li>
    </ul>

    <div class="Content-container">

      <!--<ul>-->
      <!--<li v-for="user in filtered_users">-->
      <!--<router-link v-bind:to="{ name: 'user', params: { id: user.id } }">{{ user.name }}</router-link>-->
      <!--</li>-->
      <!--</ul>-->

      <p>
        <button class="Button" type="button" v-on:click="active_only = !active_only">{{ active_only ? 'Show Everyone' : 'Show Only Actives' }}</button>
        <!--<label><input type="checkbox" v-model="active_only"> Limit to active projects</label>-->
      </p>

      <div class="Projects-list">

        <router-link v-bind:to="{ name: 'user', params: { id: user.id } }" class="UserItem" v-for="user in filtered_users" :key="user.id">
          <div class="UserItem-name">{{ user.name }}</div>
          <div class="UserItem-department" v-if="user.department">{{ user.department.data.name }}</div>
        </router-link>

      </div>

    </div>
  </div>

</template>
<script>

    export default {

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