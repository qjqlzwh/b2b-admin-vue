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

// 失效产品行
export function invalidProduct(params) {
  return request({
    url: '/cow-product/product-price/invalidProduct',
    method: 'post',
    params
  })
}

// 失效客户行
export function invalidCustomer(params) {
  return request({
    url: '/cow-product/product-price/invalidCustomer',
    method: 'post',
    params
  })
}

// 审核
export function audit(params) {
  return request({
    url: '/cow-product/product-price/audit',
    method: 'post',
    data: params
  })
}
