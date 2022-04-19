import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/index/test'),
        name: 'test',
        hidden: false,

        meta: { title: '测试首页', icon: 'people', affix: true }
      }
    ]
  },
  {
    path: '/test_v_model_1',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/test_v_model_1/index'),
        name: 'test',
        hidden: false,

        meta: { title: '测试绑定v-model_1', icon: 'people', affix: true }
      }
    ]
  },
  {
    path: '/ceshi',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/ceshi/ceshi'),
        name: 'test',
        hidden: false,

        meta: { title: '测试', icon: 'people', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/test_permission',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/test_permission/index'),
        name: 'test_permission',
        meta: {
          title: '权限测试表',
          icon: 'peoples',
          affix: false, // 将此行设置为false
          roles: [3]
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
