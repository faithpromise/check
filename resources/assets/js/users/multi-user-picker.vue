<template>
  <div class="MultiUserPicker">
    <div class="MultiUserPicker-recipients" v-bind:class="{ 'is-deleting-last-recipient': is_deleting_last_recipient }">
      <div class="MultiUserPicker-recipient" v-for="(user, index) in recipients" :key="user.id" v-on:click="remove_recipient(index)">{{ user.abbreviation }}</div>
    </div>
    <div class="MultiUserPicker-adder">
      <input
              class="MultiUserPicker-input"
              type="text" placeholder="add recipients..."
              v-model="query"
              v-bind:id="input_id"
              v-bind:tab-index="tabIndex"
              v-on:blur="on_blur"
              v-on:keydown.tab="select_focused"
              v-on:keydown.enter.prevent="select_focused"
              v-on:keydown.delete="remove_last_recipient"
              v-on:keydown.up="on_up_arrow"
              v-on:keydown.down="on_down_arrow">
      <ul class="MultiUserPicker-menu" v-show="show_suggestions">
        <li class="MultiUserPicker-item" v-bind:class="{ 'is-focused': index === focused_recipient }" v-for="(user, index) in matches" :key="user.id">
          <img class="MultiUserPicker-avatar" v-bind:src="user.avatar_url">
          <div class="MultiUserPicker-name">{{ user.name }}</div>
        </li>
        <li class="MultiUserPicker-item" v-show="matches.length === 0">
          No matches
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

    export default {

        props: {
            recipients: { default: () => { return []; } },
            tabIndex:   { default: 1 },
        },

        data() {
            return {
                query:             '',
                input_id:          'id_' + Math.random().toString(36).substr(2, 10),
                delete_key_count:  0,
                focused_recipient: 0,
            }
        },

        watch: {
            query() {
                // Reset when query value changed
                this.reset_delete_count();
            }
        },

        computed: {

            existing_ids() {
                let existing = {};
                this.recipients.forEach((user) => { existing[user.id] = true; });
                return existing;
            },

            matches() {
                if (!this.query.trim().length) return [];

                let regex = new RegExp('^(' + this.query + ')', 'i');
                return this.$store.state.users.filter((user) => {
                    return regex.test(user.name) && !this.existing_ids[user.id];
                });
            },

            is_deleting_last_recipient() {
                return this.delete_key_count === 1;
            },

            show_suggestions() {
                return this.query.trim().length > 0;
            },

        },

        methods: {

            add_recipient(user) {
                this.recipients.push(user);
            },

            remove_recipient(index) {
                this.recipients.splice(index, 1);
            },

            remove_last_recipient() {
                this.delete_key_count += 1;

                if (this.delete_key_count < 2) return;

                this.recipients.splice(-1);
                this.delete_key_count = 0;
            },

            select_focused(e) {
                if (this.matches.length) {
                    e.preventDefault();
                    this.add_recipient(this.matches[this.focused_recipient]);
                    this.focus_input();
                }
                this.clear_input();
            },

            clear_input() {
                this.query = '';
            },

            focus_input() {
                document.getElementById(this.input_id).focus();
            },

            reset_delete_count() {
                this.delete_key_count = 0;
            },

            on_blur() {
                this.clear_input();
                this.reset_delete_count();
            },

            on_up_arrow() {
                this.focused_recipient = this.focused_recipient === 0 ? this.matches.length - 1 : this.focused_recipient - 1;
            },

            on_down_arrow() {
                this.focused_recipient = this.focused_recipient === (this.matches.length - 1) ? 0 : this.focused_recipient + 1;
            },

        }

    }
</script>