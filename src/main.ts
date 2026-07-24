import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './material3.css'
import './style.css'
import App from './App.vue'
import router from './router/index.ts'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
