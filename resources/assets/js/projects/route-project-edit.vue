<template>

  <div class="Content" v-if="project">

    <page-header>
      <template slot="title">{{ project.name }}</template>
    </page-header>

    <form class="Form-container" @submit.prevent="save">
      <div class="Field">
        <label class="Field-label">Project Name</label>
        <input class="Control" type="text" v-model="project.name" placeholder="project name" required>
      </div>
      <div class="Fields">
        <!--TODO: npm install vue-pikaday-->
        <div class="Field Field--half">
          <label class="Field-label">Due On</label>
          <date-picker v-model="project.due_at"></date-picker>
        </div>
        <div class="Field Field--half">
          <label class="Field-label">Production Time In Days</label>
          <input class="Control" type="text" v-model="project.production_days">
        </div>
      </div>
      <div class="Field">
        <label class="Field-label">Default Recipients</label>
        <multi-user-picker :recipients.sync="project.recipients.data"></multi-user-picker>
      </div>
      <div class="Form-actions">
        <button class="Button Button--primary" type="submit">Save</button>
        <router-link class="Button Button--cancel" v-bind:to="{ name: 'project', params: { id: project.id } }">cancel</router-link>
      </div>
    </form>

  </div>

</template>
<script>

    import router from '../routes';
    import projectService from './projects.service';
    import flash from '../services/flash.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import datePicker from '../../sunday-morning/forms/js/components/date-picker.vue';
    import multiUserPicker from '../users/multi-user-picker.vue';

    export default {

        beforeRouteEnter(to, from, next) {

            projectService.find(to.params.id, { include: 'recipients' }).then((result) => {
                next(vm => {
                    vm.project = result.data.data;
                });
            });

        },

        components: {
            pageHeader,
            multiUserPicker,
            datePicker,
        },

        computed: {
            is_new() {
                return this.$route.name === 'project_new';
            }
        },

        data() {
            return {
                project: null,
            }
        },

        methods: {

            save() {
                projectService.save(this.project).then((result) => {
                    let msg = this.is_new ? 'Project Added' : 'Person Updated';
                    flash.keep().success(msg);
                    router.push({ name: 'project', params: { id: result.data.data.id } });
                });
            },

        },

    }
</script>