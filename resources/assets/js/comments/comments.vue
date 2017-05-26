<template>
  <div>
    <comment v-bind:comment="comment" v-for="comment in comments" :key="comment.id"></comment>
  </div>
</template>
<script>

    import comment from '../comments/comment.vue';

    export default {

        props: {
            projectId: { required: true },
            comments:  { required: true }
        },

        components: {
            comment,
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