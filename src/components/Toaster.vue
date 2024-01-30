<template>
    <!-- :enter-active-class="transition.enter"
    :leave-active-class="transition.leave" -->
  <transition
  >
    <div
      ref="root"
      role="alert"
      class="v-toast__item"
    >
      <!-- v-show="isActive"
      :class="[`v-toast__item--${type}`, `v-toast__item--${position}`]"
      @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)"
      @click="handleClick" -->
      <div class="v-toast__icon"></div>
      <p class="v-toast__text" v-html="message"></p>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const Toaster = defineComponent({
    props: {
        message: {
            type: String,
        }
    },
    setup() {

        function handleClick() {

        }

        return { 
            handleClick,
        };
    }
});

export default Toaster;
</script>

<style>

</style>