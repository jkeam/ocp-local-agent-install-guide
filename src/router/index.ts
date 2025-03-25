import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DnsView from '@/views/DnsView.vue'
import AgentConfigsView from '@/views/AgentConfig.vue'
import InstallConfigView from '@/views/InstallConfig.vue'
import InstallGuideView from '@/views/InstallGuide.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dns',
      name: 'dns',
      component: DnsView,
    },
    {
      path: '/agentconfigs',
      name: 'agentconfigs',
      component: AgentConfigsView,
    },
    {
      path: '/installconfig',
      name: 'installconfig',
      component: InstallConfigView,
    },
    {
      path: '/installguide',
      name: 'installguide',
      component: InstallGuideView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
