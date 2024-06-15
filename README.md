# Vue Snacks

## How to use

```js
npm install vue-snacks
```

<br>

On file `main.ts`
```ts
import VSnacks from "vue-snacks/dist";

const app = createApp(App);

app.use(VSnacks as any);

app.mount('#app');
```

to use in a Vue 3 component use like this:
```ts
import { defineComponent, getCurrentInstance } from 'vue';

const ComponentName = defineComponent({
    components: { Icon },
    
    setup() {
        const { proxy } = getCurrentInstance() as any;

        const notification = () => {
            proxy.$snack.notify({
                position: "top-center",
                type: "success",
                duration: 3000,
                title: "Enviado",
                message: "Vistoria enviada com sucesso!",
            });
        };

        return { notification };
    }
});

export ComponentName;
```