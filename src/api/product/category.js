import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-product/category/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-product/category/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-product/category/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-product/category/detail/${id}`,
    method: 'get'
  })
}

export function getChild(parentId) {
  return request({
    url: `/cow-product/category/getChild/${parentId}`,
    method: 'get'
  })
}
