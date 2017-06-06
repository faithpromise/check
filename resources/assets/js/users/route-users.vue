<template>

  <div class="Content Content--flush">

    <page-header>
      <template slot="title">People</template>
      <template slot="actions">
        <button class="Button" type="button" v-on:click="active_only = !active_only">{{ active_only ? 'Show Everyone' : 'Show Only Actives' }}</button>
        <router-link class="Button Button--primary" v-bind:to="{ name: 'user_new' }">Add Person</router-link>
      </template>
    </page-header>

      <table class="Table">

        <tbody>
          <tr v-for="user in filtered_users" :key="user.id">
            <td>
              <router-link v-bind:to="{ name: 'user', params: { id: user.id } }">{{ user.name }}</router-link>
            </td>
            <td>
              <span v-if="user.department">{{ user.department.data.name }}</span>
            </td>
            <td>
              <span v-if="user.projects_count">{{ user.projects_count }} active projects</span>
            </td>
          </tr>
        </tbody>

      </table>

  </div>

</template>
<script>

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