import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ReadingView from '../views/ReadingView.vue'
import ResultView from '../views/ResultView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/reading',
      component: ReadingView
    },
    {
      path: '/result',
      component: ResultView
    }
  ]
})

export default router