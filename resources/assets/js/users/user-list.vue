<template>
  <table class="Table">
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>
          <router-link v-bind:to="{ name: 'user', params: { id: user.id } }">{{ user.name }}</router-link>
        </td>
        <td>
          <span v-if="user.department">{{ user.department.data.name }}</span>
        </td>
        <td>
          <span v-if="user.projects_count">{{ user.projects_count }} active projects</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>

    export default {

        props: {
            users: { required: true },
        },

    }
</script>