import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-base/dict/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-base/dict/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-base/dict/update',
    method: 'post',
    data: params
  })
}

export function getDict(id) {
  return request({
    url: `/cow-base/dict/getDict/${id}`,
    method: 'get'
    // headers: { 'content-type': 'application/json' },
  })
}

export function getChild(parentId) {
  return request({
    url: `/cow-base/dict/getChild/${parentId}`,
    method: 'get'
    // headers: { 'content-type': 'application/json' },
  })
}

