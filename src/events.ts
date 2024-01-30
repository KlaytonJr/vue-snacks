import { ref } from 'vue';

type EventListeners = {
  [eventName: string]: Function[];
};

const events = ref({
  listeners: {} as EventListeners,
  $on(event: string, callback: Function) {
    console.log("Recebeu")
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },
  $emit(event: string, ...args: any[]) {
    console.log("Emitiu")
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback: Function) => {
        callback(...args);
      });
    }
  },
});

export const useEvents = () => {
  return events.value;
};