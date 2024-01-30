import { ref  } from 'vue';
import { createApp } from 'vue';
import Toaster from './components/Toaster.vue';
import mitt from 'mitt';

const SnackbarService = {
    // install(app: any, options: any) {
    install(app: any) {
      const snackbarRef = ref<any | null>();
      const emitter = mitt();
  
      const notify = (options: {
        position: string;
        type: string;
        duration: number;
        title: string;
        message: string;
        icon: string;
      }) => {
        const appInstance = createApp(Toaster, {
          ...options,
          deleteToast: () => {
            // Emitir um evento 'close' ao chamar deleteToast
            emitter.emit('close');
          },
        });
  
        const component = appInstance.mount(document.createElement('div'));
  
        snackbarRef.value = component;
        document.body.appendChild(component.$el);
        snackbarRef.value && (snackbarRef.value.isVisible = true);

        // Adicionar um ouvinte para o evento 'close'
        emitter.on('close', () => {
            if (snackbarRef.value) {
                emitter.off('close');
                document.body.removeChild(snackbarRef.value.$el);
                appInstance.unmount();
                snackbarRef.value = null;
            }
        });
      };
  
      // Adicione o serviço como uma propriedade global
      app.config.globalProperties.$snack = {
        notify,
      };
    },
};
  
export default SnackbarService;