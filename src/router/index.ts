import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const NewStack = () => import(/* webpackChunkName: 'stacks' */ '@/views/stacks/New.vue')
const StackRank = () => import(/* webpackChunkName: 'stacks' */ '@/views/stacks/Rank.vue')
const StacksResults = () => import(/* webpackChunkName: 'stacks' */ '@/views/stacks/Results.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')

const routes: RouteConfig[] = [
  { path: '/', component: NewStack, name: 'NewStack' },
  { path: '/stacks/:id', component: StackRank, name: 'StackRank' },
  { path: '/stacks/:id/results', component: StacksResults, name: 'StackResults' },
  { path: '*', component: PageNotFound }
]

const router = new VueRouter({
  routes
})

export default router
