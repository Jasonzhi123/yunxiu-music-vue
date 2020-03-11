import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue')
  },
  {
    path: '/recommend',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue')
      }
    ]
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
