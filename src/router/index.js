import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/authentication/Login.vue'
import Register from '../components/authentication/Register.vue'
import AllTasks from '../components/tasks/AllTasks.vue'
import CreateTasks from '../components/tasks/CreateTask.vue'
import EditTask from '../components/tasks/EditTask.vue'
import * as auth from '../services/AuthService'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from , next) => {
      if(!auth.isLoggedIn()) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from , next) => {
      if(!auth.isLoggedIn()) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: '/tasks',
    name: 'allTasks',
    component: AllTasks,
    beforeEnter: (to, from , next) => {
      if(auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: '/tasks/new',
    name: 'createTask',
    component: CreateTasks,
    beforeEnter: (to, from , next) => {
      if(auth.isLoggedIn()) {
        next()
      } else {
        next("/login")
      }
    }
  },
  {
    path: '/tasks/edit/:id',
    name: 'editTask',
    component: EditTask,
    beforeEnter: (to, from , next) => {
      if(auth.isLoggedIn()) {
        next()
      } else {
        next("/login")
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
