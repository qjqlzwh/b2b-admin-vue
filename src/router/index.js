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
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
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
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
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
