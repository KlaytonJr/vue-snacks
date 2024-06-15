import { App, ref, createApp } from "vue";
import Toaster from "./components/Toaster.vue";
import mitt from "mitt";

// Injetar CSS dinamicamente
const injectCSS = () => {
  const css = `
    /* Toaster */
    .toast { 
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

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
    `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
};

const SnackbarService = {
  // install(app: any, options: any) {
  install(app: App) {
    injectCSS();
    const snackbarRef = ref<any | null>();
    const emitter = mitt();

    console.log("install");

    const notify = (options: {
      position: string;
      type: string;
      duration: number;
      title: string;
      message: string;
      icon: string;
    }) => {
      console.log("notify");
      const appInstance = createApp(Toaster, {
        ...options,
        deleteToast: () => {
          // Emitir um evento 'close' ao chamar deleteToast
          emitter.emit("close");
        },
      });

      const component = appInstance.mount(document.createElement("div"));

      snackbarRef.value = component;
      document.body.appendChild(component.$el);
      snackbarRef.value && (snackbarRef.value.isVisible = true);

      // Adicionar um ouvinte para o evento 'close'
      emitter.on("close", () => {
        if (snackbarRef.value) {
          emitter.off("close");
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
