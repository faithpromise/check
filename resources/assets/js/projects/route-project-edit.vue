<template>

  <div class="Content" v-if="project">

    <page-header>
      <template slot="title">{{ project.name }}</template>
    </page-header>

    <form class="Form-container">
      <div class="Field">
        <input class="Control" type="text" v-model="project.name" placeholder="project name" required>
      </div>
      <div class="Fields">
        <div class="Field Field--half">
          <label class="Field-label">Production Time</label>
          <input class="Control" type="text" v-model="project.production_days">
        </div>
      </div>
      <div class="Form-actions">
        <button class="Button Button--primary" type="submit">Save</button>
        <router-link class="Button Button--cancel" v-bind:to="{ name: 'project', params: { id: project.id } }">cancel</router-link>
      </div>
    </form>

  </div>

</template>
<script>

    import projectService from './projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';

    export default {

        beforeRouteEnter(to, from, next) {

            projectService.find(to.params.id).then((result) => {
                next(vm => {
                    vm.project = result.data.data;
                });
            });

        },

        components: {
            pageHeader,
        },

        filters: {},

        data() {
            return {
                project: null,
            }
        },

        watch: {},

        methods: {},

    }
</script>