<template>

  <div class="Content Content--flush">
    <div class="Content-container">

      <div v-for="agent in agents">

        <div class="Projects-divider">
          <div class="Item">
            <div class="Item-image">
              <img v-bind:src="agent.avatar_url">
            </div>
            <div class="Item-content">
              <div class="Item-header">{{ agent.name }}</div>
            </div>
          </div>
        </div>

        <div class="Projects-list">
          <project-list v-bind:projects="agent.projects.data"></project-list>
        </div>

      </div>

    </div>
  </div>

</template>
<script>

    import projectList from './project-list.vue';
    import projectService from './projects.service';

    export default {

        beforeRouteEnter(to, from, next) {

            projectService.by_agent({ order_by: 'me_on_top' }).then((result) => {
                next(vm => {
                    vm.agents = result.data.data;
                });
            });

        },

        components: {
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