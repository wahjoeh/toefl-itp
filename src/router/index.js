import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ReadingPackageView from '../views/ReadingPackageView.vue'
import ReadingView from '../views/ReadingView.vue'
import ListeningPackageView from '../views/ListeningPackageView.vue'
import ListeningView from '../views/ListeningView.vue'
import StructurePackageView from '../views/StructurePackageView.vue'
import StructureView from '../views/StructureView.vue'
import FullTestPackageView from '../views/FullTestPackageView.vue'
import FullTestView from '../views/FullTestView.vue'
import ResultView from '../views/ResultView.vue'
import FullResultView from '../views/FullResultView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: HomeView
    },

    {
      path: '/listening',
      component: ListeningPackageView
    },

    {
      path: '/reading',
      component: ReadingPackageView
    },

    {
      path: '/reading/:packageId',
      component: ReadingView
    },

    {
      path: '/listening/:packageId',
      component: ListeningView
    },

    {
      path: '/structure',
      component: StructurePackageView
    },

    {
      path: '/structure/:packageId',
      component: StructureView
    },

    {
      path: '/result',
      component: ResultView
    },

    {
      path: '/full-test',
      component: FullTestPackageView
    },

    {
      path: '/full-result',
      component: FullResultView
    },
    
    {
      path: '/full-test/:packageId',
      component: FullTestView
    }

  ]
})

export default router