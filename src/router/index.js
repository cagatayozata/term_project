import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dersler',
    component: () => import('../components/LessonListComponent'),
  }, 
  {
    path: '/dersler',
    name: 'lessons',
    component: () => import('../components/LessonListComponent'),
  },
  {
    path: '/ders/ekle',
    name: 'createLesson',
    component: () => import('../components/LessonCreateComponent'),
  }, 
   {
    path: '/ders/duzenle/:id',
    name: 'editLesson',
    component: () => import('../components/LessonEditComponent'),
  },
  {
    path: '/cozum/ekle',
    name: 'addSolution',
    component: () => import('../components/SolutionAddComponent'),
  },
  {
    path: '/gecmis/:name',
    name: 'solutionHistory',
    component: () => import('../components/HistoryListComponent'),
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
