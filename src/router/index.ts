import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Uren Overzicht',
      component: () => import('../views/HoursOverview.vue')
    },
    {
      path: '/schrijven',
      name: 'Uren Schrijven',
      component: () => import('../views/WriteHoursView.vue')
    }
  ]
})

export default router
