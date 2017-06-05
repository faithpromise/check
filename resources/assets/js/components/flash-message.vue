<template>
  <transition name="flash">
    <div class="Flash" v-bind:class="flash_class" v-if="flash">
      <div class="Flash-container">
        <div class="Flash-message">
          {{ flash.message }}
        </div>
        <!--TODO: Replace with SVG-->
        <span class="Flash-close" v-on:click="close"></span>
      </div>
    </div>
  </transition>
</template>
<script>

    let timeout = null;

    export default {

        watch: {
            flash(new_value) {
                if (new_value === null) return;
                // keep flash means we're navigating to another route so scroll to top
                if (this.$store.state.keep_flash_message)
                    window.scrollTo(0, 0);
                timeout = setTimeout(this.close, 3000);
            }
        },

        computed: {
            flash() {
                return this.$store.state.flash_message;
            },

            flash_class() {
                return this.flash ? 'Flash--' + this.flash.type : '';
            },
        },

        methods: {
            close() {
                this.$store.dispatch('remove_flash');
                clearTimeout(timeout);
            }
        },

    }
</script>