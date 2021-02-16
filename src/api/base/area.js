import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-base/area/list',
    method: 'get',
    params
  })
}

export function getChild(parentId) {
  return request({
    url: `/cow-base/area/getChild/${parentId}`,
    method: 'get'
  })
}

export function allArea() {
  return request({
    url: '/cow-base/area/allArea',
    method: 'get'
  })
}

