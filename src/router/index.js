import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
    path: '/properties',
    name: 'properties',
    component: () => import('../views/PropertiesView.vue'),
    alias: '/',
  },
  {
    path: '/properties/:id',
    name: 'property-detail',
    component: () => import('../views/PropertyDetail.vue'),
    props: true
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: () => import('../views/RecommendationsView.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
