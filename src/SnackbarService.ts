import { ref } from 'vue';
import { createApp } from 'vue';
import Toaster from './components/Toaster.vue';

const SnackbarService = {
  install(app: any) {
    const snackbarRef = ref(null);

    const notify = ({ position, type, duration, title, message }) => {
      const appInstance = createApp(Toaster, {
        position,
        type,
        duration,
        title,
        message,
      });

      const component = appInstance.mount(document.createElement('div'));

      snackbarRef.value = component;
      document.body.appendChild(component.$el);
      snackbarRef.value.isVisible = true;

      // Adicione um evento personalizado ou utilize a ref para manipular o toast quando necessário
    };

    app.config.globalProperties.$snack = {
      notify,
    };
  },
};

export default SnackbarService;
