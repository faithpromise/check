<template>
  <div>

    <comments
            v-bind:project-id="project.id"
            v-bind:comments="project.comments.data">
    </comments>
  </div>
</template>
<script>

    import comments from '../comments/comments.vue';

    export default {

        props: {
            project: { required: true },
        },

        components: {
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