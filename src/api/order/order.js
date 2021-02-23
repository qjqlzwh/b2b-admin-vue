import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-order/order/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-order/order/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-order/order/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-order/order/detail/${id}`,
    method: 'get'
  })
}
