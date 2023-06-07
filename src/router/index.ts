import { createRouter, createWebHistory } from 'vue-router'
import HoursOverview from '@/views/HoursOverview.vue'
import WriteHoursView from '@/views/WriteHoursView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Uren Overzicht',
      component: HoursOverview
    },
    {
      path: '/schrijven',
      name: 'Uren Schrijven',
      component: WriteHoursView
    }
  ]
})

export default router
