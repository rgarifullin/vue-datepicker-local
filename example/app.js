import { createApp } from 'vue'
import App from './App.vue'
import DatePicker from '../src'

const app = createApp(App)
app.use(DatePicker)
app.mount('#app')
