import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-base/organization/list',
    method: 'get',
    params
  })
}

export function getChild(parentId) {
  return request({
    url: `/cow-base/organization/getChild/${parentId}`,
    method: 'get'
  })
}

export function save(params) {
  return request({
    url: '/cow-base/organization/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-base/organization/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-base/organization/detail/${id}`,
    method: 'get'
  })
}
