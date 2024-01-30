import { ref, watchEffect, App  } from 'vue';
import { createApp } from 'vue';
import Toaster from './components/Toaster.vue';
import mitt from 'mitt';

const SnackbarService = {
    install(app: any, options: any) {
      const snackbarRef = ref();
      const emitter = mitt();
  
      const notify = ({ position, type, duration, title, message, icon }: any) => {
        const appInstance = createApp(Toaster, {
          position,
          type,
          duration,
          title,
          message,
          icon,
          deleteToast: () => {
            // Emitir um evento 'close' ao chamar deleteToast
            emitter.emit('close');
          },
        });
  
        const component = appInstance.mount(document.createElement('div'));
  
        snackbarRef.value = component;
        document.body.appendChild(component.$el);
        snackbarRef.value.isVisible = true;

        // Adicionar um ouvinte para o evento 'close'
        emitter.on('close', () => {
            if (snackbarRef.value) {
                emitter.off('close');
                document.body.removeChild(snackbarRef.value.$el);
                appInstance.unmount();
                snackbarRef.value = null;
            }
        });
  
        // Remova o componente após a animação ou tempo de vida
        // watchEffect(() => {
        //   if (snackbarRef.value) {
        //     setTimeout(() => {
        //       if (snackbarRef.value) {
        //         document.body.removeChild(snackbarRef.value.$el);
        //         snackbarRef.value = null;
        //       }
        //     }, duration);
        //   }
        // });
      };
  
      // Adicione o serviço como uma propriedade global
      app.config.globalProperties.$snack = {
        notify,
      };
    },
};
  
export default SnackbarService;