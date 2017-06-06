<template>

  <table class="Table" v-if="projects.length">
    <thead>
      <tr>
        <th>Project</th>
        <th>Requester</th>
        <!--<th>Assigned To</th>-->
        <th>Due</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in projects" :key="project.id">
        <td class="title">
          <router-link class="link-complex" :to="{ name: 'project', params: { id: project.id } }">
            <div class="text-truncate">
              <div class="ProjectList-title link-complex-target">{{ project.name }}</div>
              <div class="Table-meta" v-if="project.requester">
                <span>Submitted {{ project.created_at | moment('from', 'now') }}</span>
              </div>
            </div>
          </router-link>
        </td>
        <td class="requester">{{ project.requester.data.name }}</td>
        <!--<td class="agent"><span v-if="project.agent">{{ project.agent.data.name }}</span></td>-->
        <td class="date" v-if="!project.closed_at">{{ project.artwork_due_at | dueFormat }}</td>
        <td class="date" v-if="project.closed_at">{{ project.closed_at | dueFormat }}</td>
        <td class="status">
          <span class="ProjectStatus" v-bind:class="'ProjectStatus--' + project.status.slug" v-if="project.status.slug !== 'active'">{{ project.status.name }}</span>
        </td>
      </tr>
    </tbody>
  </table>

</template>
<script>

    import dueFormat from '../filters/due-format';

    export default {

        props: {
            projects: { required: true }
        },

        filters: {
            dueFormat
        },

        data() {
            return {
                selected: []
            }
        },

        methods: {

            age_string(created) {
                let created_moment = moment(created);
                return moment.diff(created_moment)
            },

        }

    }
</script>