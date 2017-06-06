<template>

  <div class="Content Content--flush">

    <page-header>
      <template slot="title">People</template>
      <template slot="actions">
        <button class="Button" type="button" v-on:click="active_only = !active_only">{{ active_only ? 'Show Everyone' : 'Show Only Actives' }}</button>
        <router-link class="Button Button--primary" v-bind:to="{ name: 'user_new' }">Add Person</router-link>
      </template>
    </page-header>

    <user-list :users="filtered_users"></user-list>

  </div>

</template>
<script>

    import userList from './user-list.vue';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';

    export default {

        components: {
            userList,
            pageHeader,
        },

        data() {
            return {
                active_only: true,
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