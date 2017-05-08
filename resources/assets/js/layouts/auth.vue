<template>

  <div class="Auth">
    <div class="Auth-message">
      <transition name="message">
        <svg class="Auth-logo" v-show="!show_error">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo"></use>
        </svg>
      </transition>
      <transition name="message">
        <div class="Auth-error" v-show="show_error">{{ error }}</div>
      </transition>
    </div>
    <div class="Auth-screen">
      <div class="Auth-title">
        <slot name="title"></slot>
      </div>
      <div class="Auth-text">
        <slot name="text"></slot>
      </div>
      <slot></slot>
    </div>
  </div>

</template>
<script>

    export default {
        props:    {
            error: { default: false }
        },
        computed: {
            show_error() {
                return !!this.error;
            }
        }
    }
</script>