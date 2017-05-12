<template>
  <div>
    <div class="ProjectItem" v-for="project in projects">

      <div class="ProjectItem-about">
        <div class="ProjectItem-name">{{ project.name }}</div>
        <div class="ProjectItem-from">
          by
          <span class="ProjectItem-department" v-if="project.requester.data.department">{{ project.requester.data.department.data.name }}</span>
          <span class="ProjectItem-requester">{{ project.requester.data.name }}</span>
          <span>{{ project.created_at | moment('from', 'now') }}</span>
        </div>
      </div>

      <div class="ProjectItem-status">
        <span class="ProjectItem-due">{{ due_string(project.artwork_due_at) }}</span>
        <span class="ProjectStatus" v-bind:class="'ProjectStatus--' + project.status.slug" v-if="project.status.slug !== 'active'">{{ project.status.name }}</span>
      </div>

    </div>
  </div>
</template>
<script>

    let now_moment = moment();

    export default {

        props: {
            projects: { required: true }
        },

        methods: {

            age_string(created) {
                let created_moment = moment(created);
                return moment.diff(created_moment)
            },

            due_string(due) {
                let due_moment = moment(due);
                let days       = due_moment.businessDiff(now_moment);
                return 'Due ' + (days >= 0 && days <= 10 ? 'in ' + days + ' weekdays' : due_moment.fromNow());
            },

        }

    }
</script>