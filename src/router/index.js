import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/recommend/index.vue')
  },
  {
    path: '/singer',
    name: 'SingerList',
    component: () => import(/* webpackChunkName: "singer" */ '../views/singer/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "singerDetail" */ '../views/singerDetail/index.vue')
      }
    ]
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
