<template>
  <div class="MultiUserPicker">
    <div class="MultiUserPicker-user" v-for="(user, index) in recipients" :key="user.id" v-on:click="remove_user(index)">{{ user.abbreviation }}</div>
    <div class="MultiUserPicker-adder">
      <input class="MultiUserPicker-input" type="text" placeholder="add recipients..." v-model="query">
      <ul class="MultiUserPicker-menu" v-show="matches.length">
        <li class="MultiUserPicker-item" v-for="user in matches" :key="user.id">
          <img class="MultiUserPicker-avatar" v-bind:src="user.avatar_url">
          <div class="MultiUserPicker-name">{{ user.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

    export default {

        props: {
            recipients: { default: () => { return []; } },
        },

        components: {},

        data() {
            return {
                query: '',
            }
        },

        computed: {
            matches() {
                return [];
            }
        },

        created() {


        },

        methods: {

            add_user(user) {
                this.recipients.push(user);
            },

            remove_user(index) {
                this.recipients.splice(index, 1);
            },

        }

    }
</script>