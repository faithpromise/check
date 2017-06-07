<template>
  <div>
    <div class="Project-comment">
      <new-comment
              v-bind:project-id="project.id"
              v-bind:default-recipients="project.recipients.data">
      </new-comment>
    </div>

    <comments
            v-bind:project-id="project.id"
            v-bind:comments="project.comments.data">
    </comments>
  </div>
</template>
<script>

    import newComment from '../comments/new-comment.vue';
    import comments from '../comments/comments.vue';

    export default {

        props: {
            project: { required: true },
        },

        components: {
            newComment,
            comments,
        },

        data() {
            return {}
        },

        computed: {},

        created() {


        },

        methods: {}

    }
</script>