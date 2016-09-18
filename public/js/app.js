import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'
import store from './store'
import h5_init from './functions/init'

store.dispatch(store.actions.init(h5_init()))
// install router
Vue.use(VueRouter)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

// configure router
configRouter(router)

// boostrap the app
const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')

// just for debugging
window.router = router
