import './assets/main.css'

import { createApp, type Component } from 'vue'
import ChatView from './app/views/ChatView.vue'
import {createBootstrap, Components, Directives} from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import router from './app/router'

const app = createApp(ChatView)
app.use(createBootstrap())
app.use(router)

for (const name in Components) {
  app.component(name, Components[name as keyof typeof Components] as Component)
}
for (const name in Directives) {
  app.directive(name.replace(/^v/, ''), Directives[name as keyof typeof Directives])
}

app.mount('#app')
