import { createApp } from 'vue'
import App from './App.vue'
import router from './router/main.js'
import { createPinia} from 'pinia'
import storeReset from './store/resetStore' 
import 'ant-design-vue/es/message/style/css';

const app = createApp(App)
const pinia = createPinia()
pinia.use(storeReset)
app.use(router) 

app.use(pinia)

app.mount('#app')

