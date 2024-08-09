import { createRouter, createWebHistory } from 'vue-router'
import NewStack from '@/views/stacks/NewStack.vue'
import Rank from '@/views/stacks/Rank.vue'
import Results from '@/views/stacks/Results.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: NewStack, name: 'NewStack' },
    { path: '/stacks/:id', component: Rank, name: 'StackRank' },
    { path: '/stacks/:id/results', component: Results, name: 'StackResults' }
  ]
})

export default router
