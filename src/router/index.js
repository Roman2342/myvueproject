import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from '../views/Posts.vue'
import User from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'user',
    component: User
  },
  {
    path: '/user/:userId/posts/',
    name: 'post',
    component: Post
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
