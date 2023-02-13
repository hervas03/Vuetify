import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueSimpleAlert from "vue3-simple-alert";
const app = createApp({})

app.use(VueSimpleAlert);
loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')



