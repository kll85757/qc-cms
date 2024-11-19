import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * 这里定义了所有的静态路由，这些路由不受权限控制，所有用户都可以访问
 */
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
    path: '/news',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/news/index'),
        name: 'NewsManagement',
        meta: { title: '新闻管理', icon: 'el-icon-news' }
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/products/index'),
        name: 'ProductManagement',
        meta: { title: '产品管理', icon: 'el-icon-goods' }
      }
    ]
  },
  {
    path: '/type',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/type/index'),
        name: 'TypeManagement',
        meta: { title: '分类管理', icon: 'el-icon-goods' }
      }
    ]
  },
  {
    path: '/albums',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/albums/index'),
        name: 'AlbumManagement',
        meta: { title: '相册管理', icon: 'el-icon-picture' }
      }
    ]
  },
  {
    path: '/brands',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/brands/index'),
        name: 'BrandManagement',
        meta: { title: '品牌管理', icon: 'el-icon-star-on' }
      }
    ]
  },
  {
    path: '/visitors',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/visitors/index'),
        name: 'VisitorStatistics',
        meta: { title: '访客统计', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/users/index'),
        name: 'UserManagement',
        meta: { title: '用户管理', icon: 'el-icon-user' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // 如果你需要使用 history 模式，请取消注释
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 重置路由方法
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
