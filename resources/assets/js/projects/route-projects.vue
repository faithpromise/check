<template>

  <div class="Content">

    <page-header v-bind:divider="true">
      <template slot="title">Projects</template>
    </page-header>

    <div v-for="agent in agents">

      <div class="SectionHeader">
        <img class="SectionHeader-avatar" v-bind:src="agent.avatar_url">
        <span class="SectionHeader-title">{{ agent.name }}</span>
      </div>

      <div class="Projects-list">
        <project-list v-bind:projects="agent.projects.data"></project-list>
      </div>

    </div>

  </div>

</template>
<script>

    import projectService from './projects.service';
    import pageHeader from '../../sunday-morning/admin/js/components/page-header.vue';
    import projectList from './project-list.vue';

    export default {

        beforeRouteEnter(to, from, next) {

            projectService.by_agent({ order_by: 'me_on_top' }).then((result) => {
                next(vm => {
                    vm.agents = result.data.data;
                });
            });

        },

        components: {
            pageHeader,
            projectList,
        },

        data() {
            return {
                agents: [],
            }
        },

        created() {


        },

        methods: {

//            listen() {
//                Echo.channel('projects')
//                    .listen('ProjectSaved', this.on_comment_added);
//            }

        },

    }
</script>