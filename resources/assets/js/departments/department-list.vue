<template>
  <table class="Table">
    <tbody>
      <tr v-for="department in departments" :key="department.id">
        <td>
          <router-link v-bind:to="{ name: 'department', params: { id: department.id } }">{{ department.name }}</router-link>
        </td>
        <td>
          <span v-if="department.projects_count">{{ department.projects_count }} active projects</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>

    export default {

        props: {
            departments: { required: true },
        },

    }
</script>