import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-product/product/list',
    method: 'get',
    params
  })
}

// 弹框列表数据
export function getPopList(params) {
  return request({
    url: '/cow-product/product/popList',
    method: 'get',
    params
  })
}

// 弹框列表数据(带价格)
export function getPopPriceList(params) {
  return request({
    url: '/cow-product/product/popPriceList',
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
