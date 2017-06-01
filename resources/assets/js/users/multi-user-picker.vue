<template>
  <div class="MultiUserPicker" v-bind:id="root_id">
    <div class="MultiUserPicker-recipients" v-bind:class="{ 'is-deleting-last-recipient': is_deleting_last_recipient }">
      <div class="MultiUserPicker-recipient" v-for="(user, index) in recipients" :key="user.id" v-on:click="remove_recipient(index)">{{ user.abbreviation }}</div>
    </div>
    <div class="MultiUserPicker-adder">
      <input
              class="MultiUserPicker-input"
              type="text" placeholder="add recipients..."
              autocomplete="off"
              v-model="query"
              v-bind:id="input_id"
              v-bind:tab-index="tabIndex"
              v-on:blur="on_blur"
              v-on:keydown.tab="select_focused"
              v-on:keydown.enter.prevent="on_enter_key"
              v-on:keydown.delete="on_delete_key"
              v-on:keydown.up="on_up_arrow"
              v-on:keydown.down="on_down_arrow">
      <ul class="MultiUserPicker-menu" v-show="show_suggestions">
        <li
                class="MultiUserPicker-item"
                v-bind:class="{ 'is-focused': index === focused_recipient }"
                v-on:click="add_recipient(user)"
                v-on:mouseenter="on_mouse_enter(index)"
                v-for="(user, index) in matches" :key="user.id">
          <img class="MultiUserPicker-avatar" v-bind:src="user.avatar_url">
          <div class="MultiUserPicker-name">{{ user.name }}</div>
        </li>
      </ul>
      <div class="MultiUserPicker-new" v-show="show_quick_add">
        <div class="MultiUserPicker-newTitle">Add a New User</div>
        <div class="Fields">
          <div class="Field Field--half">
            <input class="Control MultiUserPicker-newInput" type="text" placeholder="first name" v-model="new_user.first_name" autocomplete="off">
          </div>
          <div class="Field Field--half">
            <input class="Control MultiUserPicker-newInput" type="text" placeholder="last name" v-model="new_user.last_name" autocomplete="off">
          </div>
        </div>
        <div class="Field">
          <input class="Control MultiUserPicker-newInput" type="email" placeholder="email" v-model="new_user.email" autocomplete="off">
        </div>
        <div class="Field">
          <button
                  class="Button Button--primary"
                  type="button"
                  v-bind:disabled="is_creating_user"
                  v-on:click="create_user">
            {{ is_creating_user ? 'Adding User...' : 'Add User' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

    import userService from '../people/users.service';

    export default {

        props: {
            recipients: { default: () => { return []; } },
            tabIndex:   { default: 1 },
        },

        data() {
            return {
                query:             '',
                root_id:           'id_' + Math.random().toString(36).substr(2, 10),
                input_id:          'id_' + Math.random().toString(36).substr(2, 10),
                delete_key_count:  0,
                focused_recipient: 0,

                new_user:         {
                    first_name: '',
                    last_name:  '',
                    email:      '',
                },
                is_creating_user: false,
            }
        },

        created() {
            document.body.addEventListener('click', this.on_body_click);
        },

        beforeDestroy() {
            document.body.removeEventListener('click', this.on_body_click);
        },

        watch: {
            query() {
                // Reset when query value changed
                this.reset_delete_count();

                // Update new user
                this.magically_fill_new_user();
            }
        },

        computed: {

            existing_ids() {
                let existing = {};
                this.recipients.forEach((user) => { existing[user.id] = true; });
                return existing;
            },

            matches() {
                let query = this.query.trim().toLowerCase();

                if (!query.length) return [];

                return this.$store.state.users.filter((user) => {
                    let name = user.name.toLowerCase().replace(/[.|\-]/g, '');
                    return name.indexOf(query) >= 0 && !this.existing_ids[user.id];
                });
            },

            is_deleting_last_recipient() {
                return this.delete_key_count === 1;
            },

            show_suggestions() {
                return this.matches.length > 0;
            },

            show_quick_add() {
                return this.query.trim().length > 0 && this.matches.length === 0;
            },

        },

        methods: {

            on_body_click(e) {
                let root_elem = document.getElementById(this.root_id);

                if (!root_elem.contains(e.target))
                    this.reset();
            },

            create_user() {

                if (this.is_creating_user) return;

                this.is_creating_user = true;

                userService.save(this.new_user).then((result) => {
                    this.add_recipient(result.data.data);
                });
                // TODO: Catch and display error

            },

            add_recipient(user) {
                this.recipients.push(user);
                this.reset();
                this.focus_input();
            },

            remove_recipient(index) {
                this.recipients.splice(index, 1);
            },

            on_delete_key() {
                this.delete_key_count += 1;

                if (this.delete_key_count < 2) return;

                this.recipients.splice(-1);
                this.delete_key_count = 0;
            },

            on_enter_key(e) {

                if (this.matches.length) {
                    this.select_focused(e);
                }

            },

            select_focused(e) {
                if (this.matches.length) {
                    e.preventDefault();
                    this.add_recipient(this.matches[this.focused_recipient]);
                    this.focus_input();
                    this.clear_input();
                }
            },

            clear_input() {
                this.query             = '';
                this.focused_recipient = 0;
            },

            focus_input() {
                document.getElementById(this.input_id).focus();
            },

            reset_delete_count() {
                this.delete_key_count = 0;
            },

            on_blur() {
                // Give time for click handler
//                setTimeout(this.reset, 400);
            },

            on_mouse_enter(index) {
                this.focused_recipient = index;
            },

            on_up_arrow() {
                this.focused_recipient = this.focused_recipient === 0 ? this.matches.length - 1 : this.focused_recipient - 1;
            },

            on_down_arrow() {
                this.focused_recipient = this.focused_recipient === (this.matches.length - 1) ? 0 : this.focused_recipient + 1;
            },

            reset() {
                this.clear_input();
                this.reset_delete_count();
                this.is_creating_user = false;
            },

            magically_fill_new_user() {

                if (this.matches.length === 0) {

                    // split user input
                    let parts = this.query.trim().split(' ');

                    this.new_user.first_name = parts[0];

                    if (parts.length === 1) {
                        this.new_user.last_name = '';
                        this.new_user.email     = '';
                    }

                    if (parts.length === 2) {
                        let is_email            = parts[1].indexOf('@') >= 0;
                        let fp_email            = parts[0].toLowerCase() + parts[1].substr(0, 1).toLowerCase() + '@' + window.location.hostname;
                        this.new_user.last_name = is_email ? '' : parts[1];
                        this.new_user.email     = is_email ? parts[1] : fp_email;
                    }

                    if (parts.length >= 3) {
                        this.new_user.last_name = parts[1];
                        this.new_user.email     = parts[2];
                    }
                }
            }

        }

    }
</script>