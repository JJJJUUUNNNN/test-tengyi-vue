import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import {setupStore} from './store/index'

const app=createApp(App)

setupStore(app);


app.use(ElementPlus).mount('#app')
