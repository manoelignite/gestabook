import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'
import './material3.css'
import './style.css'
import App from './App.vue'
import router from './router/index.ts'

registerSW({ immediate: true })

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

