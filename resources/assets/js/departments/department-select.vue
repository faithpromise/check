<template>
  <div class="Select">
    <select class="Control" v-model="id" @change="update">
      <option :value="null">Choose a Department</option>
      <optgroup label="- - - - - - - - -">
        <option value="_add_new">Add a Department</option>
      </optgroup>
      <optgroup label="- - - - - - - - -">
        <option v-for="department in departments" :key="department.id" :value="department.id">{{ department.name }}</option>
      </optgroup>
    </select>
  </div>
</template>
<script>

    import departmentService from './departments.service';
    import flash from '../services/flash.service';

    export default {

        props: {
            value: { required: true }
        },

        components: {},

        data() {
            return {
                departments: [],
                id:          null,
            }
        },

        computed: {},

        created() {
            this.load_departments();
        },

        methods: {

            load_departments() {
                departmentService.all().then((result) => {
                    this.departments = result.data.data;
                });
            },

            update() {
                if (this.id === '_add_new')
                    return this.add();

                this.$emit('input', this.id);
            },

            add() {
                this.id = null;

                let name = window.prompt('Project name:');

                if (!name || !name.trim())
                    return;

                departmentService.save({ name })
                    .then((result) => {
                        this.departments.push(result.data.data);
                        this.id = result.data.data.id;
                    })
                    .catch((error) => {
                        flash.error('Unable to add new department');
                    })

            },

        }

    }
</script>