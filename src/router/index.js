import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PlantsView from '../views/PlantsView.vue'
import CareLogsView from '../views/CareLogsView.vue'
import GoalsView from '../views/GoalsView.vue'
import TipsView from '../views/TipsView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/plants', component: PlantsView },
  { path: '/daily-care', component: CareLogsView },
  { path: '/goals', component: GoalsView },
  { path: '/tips', component: TipsView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router