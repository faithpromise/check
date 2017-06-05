<template>

  <div class="Content" v-if="user">

    <page-header divider="true">
      <template slot="title">
        {{ is_new ? 'Add New Person' : user.name }}
      </template>
    </page-header>

    <form class="Form-container" v-on:submit.prevent="save">
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
        <department-select v-model="user.department_id"></department-select>
      </div>
      <div class="Field">
        <label>
          <input class="" type="checkbox" v-model="user.is_agent"> This user can create projects
        </label>
      </div>
      <div class="Form-actions">
        <button class="Button Button--primary" type="submit">Save</button>
        <router-link class="Button Button--cancel" v-bind:to="{ name: 'users' }" v-if="is_new">cancel</router-link>
        <router-link class="Button Button--cancel" v-bind:to="{ name: 'user', params: { id: user.id } }" v-if="!is_new">cancel</router-link>
      </div>
    </form>

  </div>

</template>
<script>

    import userService from './users.service';
    import flash from '../services/flash.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import departmentSelect from '../departments/department-select.vue';
    import router from '../routes';

    export default {

        beforeRouteEnter(to, from, next) {
            load(to, next);
        },

        beforeRouteUpdate(to, from, next) {
            load(to, next, this);
        },

        components: {
            pageHeader,
            departmentSelect,
        },

        data() {
            return {
                user: {},
            }
        },

        computed: {
            is_new() {
                return this.$route.name === 'user_new';
            }
        },

        methods: {

            save() {
                userService.save(this.user).then(() => {
                    let msg = this.is_new ? 'Person Added' : 'Person Updated';
                    let redirect_to = this.is_new ? { name: 'users' } : { name: 'user', params: { id: this.user.id } };
                    flash.keep().success(msg);
                    router.push(redirect_to);
                });
            },

        },

    }

    let load = (to, next, context = null) => {

        if (to.name === 'user_new')
            return next();

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