<template>
  <div
    v-if="isVisible"
    class="toast"
    :class="`${positionClass} ${typeClass}`"
    @mouseover="pauseTimer"
    @mouseout="resumeTimer"
    @click="closeToast"
  >
    <div class="toast-header" :class="typeClass">
        {{ props.title }}
      <!-- <button class="close" @click="closeToast">×</button> -->
    </div>
    <div class="toast-body">
        {{ props.message }}
    </div>
    <div class="toast-timer" :style="{ width: progressBarWidth }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(['close'])

const props = defineProps({
    title: String,
    message: String,
    position: String,
    type: String,
    icon: String,
    duration: Number,
    deleteToast: Function
})

const isVisible = ref<boolean>(true);
const positionClass = ref<string>("");
const typeClass = ref<string>("");
const progressBarWidth = ref<string>("100%");
const timer = ref<any | null>(null);
const remainingMillis = ref<number>(0);

const pauseTimer = () => {
  if (timer.value !== null) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

const resumeTimer = () => {
  if (timer.value === null) {
    startTimer();
  }
};

const startTimer = () => {
  const durationMillis = props.duration || 3000;

  timer.value = setInterval(() => {
    remainingMillis.value -= 100;
    progressBarWidth.value = `${(remainingMillis.value / durationMillis) * 100}%`;

    if (remainingMillis.value <= 0) {
      closeToast();
    }
  }, 100);
};

const closeToast = () => {
  pauseTimer();
//   emit('close');
  props.deleteToast && props.deleteToast();
  isVisible.value = false;
  // Emitir um evento para que o componente pai possa remover o toast
};

onMounted(() => {
    console.log("onMounted");
    positionClass.value = `position-${props.position}`;
    typeClass.value = `type-${props.type}`;
    remainingMillis.value = props.duration || 3000;
    startTimer();
});

onUnmounted(() => {
  pauseTimer();
});
</script>

<style>
.toast { 
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9999;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}

.position-top-left {
  top: 20px;
  left: 20px;
}

.position-top-center {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.position-top-right {
  top: 20px;
  right: 20px;
}

.position-bottom-left {
  bottom: 20px;
  left: 20px;
}

.position-bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.position-bottom-right {
  bottom: 20px;
  right: 20px;
}

.type-success {
  background-color: #4caf50;
  color: #fff;
}

.type-error {
  background-color: #f44336;
  color: #fff;
}

.type-warning {
  background-color: #ff9800;
  color: #fff;
}

.type-info {
  background-color: #2196f3;
  color: #fff;
}

.type-details {
  background-color: #757575;
  color: #fff;
}

.toast-content {
  display: flex;
  flex-direction: column;
}

.toast-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toast-title {
  font-weight: bold;
  font-size: 16px;
}

.toast-close {
  cursor: pointer;
  font-size: 14px;
}

.toast-message {
  margin: 10px 0;
  font-size: 14px;
}

.toast-timer {
  height: 5px;
  background-color: #ececec75;
  border-radius: 3px;
  margin-top: 5px;
  transition: width 0.1s linear;
}
</style>
