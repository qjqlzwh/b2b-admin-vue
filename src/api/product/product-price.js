import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-product/product-price/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-product/product-price/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-product/product-price/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-product/product-price/detail/${id}`,
    method: 'get'
  })
}
