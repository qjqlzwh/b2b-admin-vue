import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-product/product/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-product/product/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-product/product/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-product/product/detail/${id}`,
    method: 'get'
  })
}
