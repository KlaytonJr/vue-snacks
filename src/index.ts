import "./style.css"
import Toaster from './components/Toaster.vue'

export default {
    install: (app: any, options: any) => {
        app.component("Toaster", Toaster)
        console.log(options);
    }
}