import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-user/customer/list',
    method: 'get',
    params
  })
}

// 弹框列表数据
export function getPopList(params) {
  return request({
    url: '/cow-user/customer/popList',
    method: 'get',
    params
  })
}

// 弹框列表数据(客户收货地址)
export function popAddressList(params) {
  return request({
    url: '/cow-user/customer/popAddressList',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-user/customer/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-user/customer/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-user/customer/detail/${id}`,
    method: 'get'
  })
}

// 获取客户默认收货地址
export function getDefaultAddr(id) {
  return request({
    url: `/cow-user/customer/getDefaultAddr/${id}`,
    method: 'get'
  })
}
