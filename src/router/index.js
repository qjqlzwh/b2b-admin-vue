import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: '/usercenter/list',
        name: '用户',
        component: () => import('@/views/user/usercenter/index'),
        meta: { title: '用户' }
      },
      {
        path: '/usercenter/add',
        name: '添加用户',
        component: () => import('@/views/user/usercenter/ad'),
        meta: { title: '添加用户' },
        hidden: true
      },
      {
        path: '/usercenter/detail/:id',
        name: '编辑用户',
        component: () => import('@/views/user/usercenter/ad'),
        meta: { title: '编辑用户' },
        hidden: true
      },
      {
        path: '/customer/list',
        name: '客户',
        component: () => import('@/views/user/customer/index'),
        meta: { title: '客户' }
      },
      {
        path: '/customer/add',
        name: '添加客户',
        component: () => import('@/views/user/customer/ad'),
        meta: { title: '添加客户' },
        hidden: true
      },
      {
        path: '/customer/detail/:id',
        name: '编辑客户',
        component: () => import('@/views/user/customer/ad'),
        meta: { title: '编辑客户' },
        hidden: true
      },
      {
        path: '/role/list',
        name: '用户角色',
        component: () => import('@/views/user/role/index'),
        meta: { title: '用户角色' }
      },
      {
        path: '/role/add',
        name: '添加角色',
        component: () => import('@/views/user/role/ad'),
        meta: { title: '添加角色' },
        hidden: true
      },
      {
        path: '/role/detail/:id',
        name: '编辑角色',
        component: () => import('@/views/user/role/ad'),
        meta: { title: '编辑角色' },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'el-icon-s-order' },
    children: [
      {
        path: '/order/list',
        name: '订单',
        component: () => import('@/views/order/order/index'),
        meta: { title: '订单' }
      },
      {
        path: '/order/add',
        name: '添加订单',
        component: () => import('@/views/order/order/ad'),
        meta: { title: '添加订单' },
        hidden: true
      },
      {
        path: '/order/detail/:id',
        name: '编辑订单',
        component: () => import('@/views/order/order/ad'),
        meta: { title: '编辑订单' },
        hidden: true
      },
      {
        path: '/order/list',
        name: '订单报表',
        component: () => import('@/views/order/order/index'),
        meta: { title: '订单报表' }
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product',
    name: '产品管理',
    meta: { title: '产品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: '/product/list',
        name: '产品',
        component: () => import('@/views/product/product/index'),
        meta: { title: '产品' }
      },
      {
        path: '/product/add',
        name: '添加产品',
        component: () => import('@/views/product/product/ad'),
        meta: { title: '添加产品' },
        hidden: true
      },
      {
        path: '/product/detail/:id',
        name: '编辑产品',
        component: () => import('@/views/product/product/ad'),
        meta: { title: '编辑产品' },
        hidden: true
      },
      {
        path: '/category/list',
        name: '产品分类',
        component: () => import('@/views/product/category/index'),
        meta: { title: '产品分类' }
      },
      {
        path: '/category/add',
        name: '添加产品分类',
        component: () => import('@/views/product/category/ad'),
        meta: { title: '添加产品分类' },
        hidden: true
      },
      {
        path: '/category/detail/:id',
        name: '编辑产品分类',
        component: () => import('@/views/product/category/ad'),
        meta: { title: '编辑产品分类' },
        hidden: true
      },
      {
        path: '/product-price/list',
        name: '产品价格维护',
        component: () => import('@/views/product/product-price/index'),
        meta: { title: '产品价格维护' }
      },
      {
        path: '/product-price/add',
        name: '添加产品价格',
        component: () => import('@/views/product/product-price/ad'),
        meta: { title: '添加产品价格' },
        hidden: true
      },
      {
        path: '/product-price/detail/:id',
        name: '编辑产品价格',
        component: () => import('@/views/product/product-price/ad'),
        meta: { title: '编辑产品价格' },
        hidden: true
      }
    ]
  },

  {
    path: '/base',
    component: Layout,
    redirect: '/base',
    name: '基础数据',
    meta: { title: '基础数据', icon: 'el-icon-setting' },
    children: [
      {
        path: '/dict/list',
        name: '字典',
        component: () => import('@/views/base/dict/index'),
        meta: { title: '字典' }
      },
      {
        path: '/dict/add',
        name: '添加字典',
        component: () => import('@/views/base/dict/ad'),
        meta: { title: '添加字典' },
        hidden: true
      },
      {
        path: '/dict/detail/:id',
        name: '编辑字典',
        component: () => import('@/views/base/dict/ad'),
        meta: { title: '编辑字典' },
        hidden: true
      },
      {
        path: '/parameter/list',
        name: '系统参数',
        component: () => import('@/views/base/parameter/index'),
        meta: { title: '系统参数' }
      },
      {
        path: '/parameter/add',
        name: '添加参数',
        component: () => import('@/views/base/parameter/ad'),
        meta: { title: '添加参数' },
        hidden: true
      },
      {
        path: '/parameter/detail/:id',
        name: '编辑参数',
        component: () => import('@/views/base/parameter/ad'),
        meta: { title: '编辑参数' },
        hidden: true
      },
      {
        path: '/area/list',
        name: '地区',
        component: () => import('@/views/base/area/index'),
        meta: { title: '地区' }
      },
      {
        path: '/organization/list',
        name: '机构',
        component: () => import('@/views/base/organization/index'),
        meta: { title: '机构' }
      },
      {
        path: '/organization/add',
        name: '添加机构',
        component: () => import('@/views/base/organization/ad'),
        meta: { title: '添加机构' },
        hidden: true
      },
      {
        path: '/organization/detail/:id',
        name: '编辑机构',
        component: () => import('@/views/base/organization/ad'),
        meta: { title: '编辑机构' },
        hidden: true
      },
      {
        path: '/notice/list',
        name: '通知',
        component: () => import('@/views/base/notice/index'),
        meta: { title: '通知' }
      }
    ]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    name: '报表管理',
    meta: { title: '报表管理', icon: 'el-icon-document' },
    children: [
      {
        path: '/product-price-report/list',
        name: '产品价格报表',
        component: () => import('@/views/report/product-price-report/index'),
        meta: { title: '产品价格报表' }
      },
      {
        path: '/order-report/list',
        name: '订单报表',
        component: () => import('@/views/report/order-report/index'),
        meta: { title: '订单报表' }
      }
    ]
  },

  {
    path: '/interface',
    component: Layout,
    redirect: '/interface',
    name: '接口服务',
    meta: { title: '接口服务', icon: 'el-icon-connection' },
    children: [
      {
        path: '/task-config/list',
        name: '任务配置',
        component: () => import('@/views/interface/task-config/index'),
        meta: { title: '任务配置' }
      },
      {
        path: '/task-info-log/list',
        name: '任务日志',
        component: () => import('@/views/interface/task-info-log/index'),
        meta: { title: '任务日志' }
      }
    ]
  },

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
