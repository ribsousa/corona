import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontendComponent from '../components/FrontendComponent'
import Home from '../views/Home'
import Brazil from '../views/Brazil'
import Countries from '../views/Countries'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: FrontendComponent,
    children: [
      { path: '', component: Home, name: 'home' },
      { path: 'brazil', component: Brazil, name: 'brazil' },
      { path: 'world', component: Countries, name: 'world' }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
